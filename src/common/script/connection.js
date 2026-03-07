import { showMessage, showError } from './infomations';
import {
  getQueryVariable,
  jumpBackToFrom,
  dateFormater,
  jumpToWithFrom,
  jumpToWithFromNow,
  deepCopy,
  jump,
} from './normal';
import cbor from 'cbor-js';
export async function checkUser() {
  var userButton = document.querySelector('#user a');
  var userName = await getUserName();
  if (userName === '') {
    return null;
  }
  try {
    userButton.classList.remove('login');
    userButton.classList.add('user');
  } catch {}
  userButton.setAttribute('href', '/user/');
  userButton.innerText = userName;
  return userName;
}
export async function getUserName() {
  if (localStorage.getItem('check') === null) {
    return '';
  }
  try {
    var retsult = await fetch('https://api.kuankuan.site/user/check', {
      method: 'GET',
      headers: {
        check: localStorage.getItem('check'),
      },
    });
  } catch {
    return '';
  }
  if (retsult.status !== 200) {
    localStorage.removeItem('check');
    return '';
  }
  return await retsult.text();
}
/**
 *
 * @param {String} flags
 * @param {String} password
 * @returns
 */
export async function login(flags, password) {
  var retsult = await fetch('https://api.kuankuan.site/user/login', {
    method: 'POST',
    headers: {
      check: localStorage.getItem('check'),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      flags: flags,
      password: password,
    }),
  });
  if (retsult.status == 200) {
    localStorage.setItem('check', await retsult.text());
    return true;
  } else {
    return false;
  }
}
/**
 *
 * @param {String} username
 * @param {String} email
 * @returns {Promise}
 */
export async function checkSignUp(username, email) {
  var retsult = await fetch('https://api.kuankuan.site/user/signup/check', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      name: username,
    }),
  });
  if (retsult.status == 403) {
    return await retsult.json();
  }
  localStorage.setItem('check', await retsult.text());
  return null;
}
export async function getImageCode() {
  var retsult = await fetch('https://api.kuankuan.site/user/safety/image/make', {
    method: 'GET',
    headers: {
      check: localStorage.getItem('check'),
    },
  });
  if (retsult.status == 200) {
    return await retsult.text();
  } else if (retsult.status == 503) {
    showMessage('操作过于频繁请稍后再试');
    throw void 0;
  } else if (retsult.status == 403) {
    location.href = '/login?from=' + encodeURI(location.href);
    throw void 0;
  }
}
/**
 *
 * @param {String} code
 * @returns {Boolean}
 */
export async function checkImageCode(code) {
  var retsult = await fetch('https://api.kuankuan.site/user/safety/image/check', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      check: localStorage.getItem('check'),
    },
    body: JSON.stringify({
      code: code,
    }),
  });
  if (retsult.status == 200) {
    localStorage.setItem('action', await retsult.text());
    return true;
  } else if (retsult.status == 403) {
    location.href = '/login?from=' + encodeURI(location.href);
  } else if (retsult.status == 401) {
    showMessage('验证码错误');
  }
  return false;
}
export function countBackwardsInText(ele, time, finish) {
  ele.innerText = `${time}s`;
  if (time == 0) {
    finish(ele);
    return;
  }
  setTimeout(countBackwardsInText, 1000, ele, time - 1, finish);
}
/**
 *
 * @returns {boolean}
 */
export async function getEmailCode() {
  var retsult = await fetch(
    `https://api.kuankuan.site/user/safety/email/make?action=${localStorage.getItem('action')}`,
    {
      method: 'GET',
      headers: {
        check: localStorage.getItem('check'),
      },
    }
  );
  if (retsult.status == 200) {
    return true;
  } else if (retsult.status == 503) {
    showMessage('操作过于频繁请稍后再试');
  } else if (retsult.status == 403) {
    location.href = '/login?from=' + encodeURI(location.href);
  } else if (retsult.status == 401) {
    location.href = '/check/image?from=' + encodeURI(location.href);
  }
  throw void 0;
}
/**
 *
 * @param {String} code
 * @returns {Boolean}
 */
export async function checkEmailCode(code) {
  var retsult = await fetch('https://api.kuankuan.site/user/safety/email/check', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      check: localStorage.getItem('check'),
    },
    body: JSON.stringify({
      code: code,
    }),
  });
  if (retsult.status == 200) {
    localStorage.setItem('action', await retsult.text());
    return true;
  } else if (retsult.status == 403) {
    location.href = '/login?from=' + encodeURI(location.href);
  } else if (retsult.status == 401) {
    showMessage('验证码错误');
  }
  return false;
}
/**
 *
 * @param {String} name
 * @param {String} email
 * @param {Date} birthDate
 * @param {String} sex
 * @param {String} password
 * @returns
 */
export async function confirmSignUp(name, email, birthDate, sex, password) {
  var retsult = await fetch(
    `https://api.kuankuan.site/user/signup/confirm?action=${localStorage.getItem('action')}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        check: localStorage.getItem('check'),
      },
      body: JSON.stringify({
        name: name,
        email: email,
        birthDate: dateFormater(birthDate, '%(year)s-%(month)s-%(day)s'),
        sex: sexShower2Save(sex),
        password: password,
      }),
    }
  );
  if (retsult.status == 200) {
    localStorage.setItem('check', await retsult.text());
    location.href = jumpBackToFrom();
    return true;
  } else {
    showMessage('意外错误', () => {
      location.reload();
    });
  }
}
/**
 *
 * @returns {Object}
 */
export async function getInfo() {
  if (localStorage.getItem('check') === null) {
    throw void 0;
  }
  var retsult = await fetch('https://api.kuankuan.site/user/info', {
    method: 'GET',
    headers: {
      check: localStorage.getItem('check'),
    },
  });
  if (retsult.status !== 200) {
    localStorage.removeItem('check');
    throw void 0;
  }
  let info = await retsult.json();
  info.birthdate = new Date(info.birthDate);
  info.sex = sexSave2Shower(info.sex);
  return info;
}
/**
 *
 * @param {Date} birthDate
 * @param {'男'|'女'|'其他'|'保密'} sex
 * @returns
 */
export async function changeInfo(birthDate, sex) {
  var retsult = await fetch('https://api.kuankuan.site/user/change/info', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      check: localStorage.getItem('check'),
    },
    body: JSON.stringify({
      birthDate: dateFormater(birthDate, '%(year)s-%(month)s-%(day)s'),
      sex: sexShower2Save(sex),
    }),
  });
  if (retsult.status !== 200) {
    localStorage.removeItem('check');
    return false;
  }
  return true;
}
/**
 *
 * @param {String} password
 * @returns
 */
export async function changePassword(password) {
  var retsult = await fetch(
    `https://api.kuankuan.site/user/change/password?action=${localStorage.getItem('action')}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        check: localStorage.getItem('check'),
      },
      body: JSON.stringify({
        password: password,
      }),
    }
  );
  if (retsult.status === 401) {
    location.href = '/check/email?from=' + location.href;
  } else if (retsult.status === 403) {
    location.href = '/login?from=' + location.href;
  } else if (retsult.status === 200) {
    return true;
  }
  return false;
}
/**
 *
 * @param {String} email
 * @returns
 */
export async function getChangeEmailCode(email) {
  var retsult = await fetch(
    `https://api.kuankuan.site/user/change/email/send?action=${localStorage.getItem('action')}`,
    {
      method: 'POST',
      headers: {
        check: localStorage.getItem('check'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
      }),
    }
  );
  if (retsult.status == 200) {
    return;
  } else if (retsult.status == 503) {
    showMessage('操作过于频繁请稍后再试');
  } else if (retsult.status == 403) {
    location.href = '/login?from=' + encodeURI(location.href);
  } else if (retsult.status == 402) {
    showMessage('邮箱已经被使用过了');
  } else if (retsult.status == 401) {
    location.reload();
  }
  throw void 0;
}
/**
 *
 * @param {string} code
 * @returns
 */
export async function checkChangeEmailCode(code) {
  var retsult = await fetch('https://api.kuankuan.site/user/change/email/check', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      check: localStorage.getItem('check'),
    },
    body: JSON.stringify({
      code: code,
    }),
  });
  if (retsult.status == 200) {
    return true;
  } else if (retsult.status == 403) {
    location.href = '/login?from=' + encodeURI(location.href);
  } else if (retsult.status == 503) {
    showMessage('请先发送验证码');
  } else if (retsult.status == 401) {
    showMessage('验证码错误');
  }
  return false;
}
export async function getFeadbackList(from, to) {
  var retsult = await fetch(`https://api.kuankuan.site/feedback/list?from=${from}&to=${to}`);
  if (retsult.status == 200) {
    return await retsult.json();
  }
  return null;
}
/**
 *
 * @param {number} id
 * @returns {Object}
 */
export async function getFeadbackData(id) {
  var retsult = await fetch(`https://api.kuankuan.site/feedback/data/${id}`);
  if (retsult.status === 200) {
    return await retsult.json();
  }
  throw new Error('data not found');
}
/**
 * Retrieves the user rights from the server.
 *
 * @returns {Promise<number>} The user rights or null if the check is not found.
 */
export async function getRights() {
  if (localStorage.getItem('check') == null) {
    throw void 0;
  }
  var retsult = await fetch(`https://api.kuankuan.site/user/rights`, {
    headers: {
      check: localStorage.getItem('check'),
    },
  });
  if (retsult.status === 200) {
    return await retsult.json();
  }
  throw void 0;
}
/**
 * Saves the feedback by making a POST request to the server.
 *
 * @param {string} statue - The status of the feedback.
 * @param {string} reply - The reply to the feedback.
 * @return {Promise} A promise that resolves to the response from the server.
 */
export async function saveFeedback(statue, reply) {
  var retsult = await fetch('https://api.kuankuan.site/feedback/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      check: localStorage.getItem('check'),
    },
    body: JSON.stringify({
      id: parseInt(getQueryVariable('id')),
      statue: statue,
      reply: reply,
    }),
  });
  if (retsult.status === 200) {
    showMessage('保存成功');
  } else {
    showMessage('保存失败:' + retsult.status + ' ' + (await retsult.statusText));
  }
}
/**
 * Asynchronously deletes feedback from the server.
 *
 * @return {Promise<void>} Returns a promise that resolves when the feedback is successfully deleted.
 */
export async function delFeedback() {
  var retsult = await fetch('https://api.kuankuan.site/feedback/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      check: localStorage.getItem('check'),
    },
    body: JSON.stringify({
      id: parseInt(getQueryVariable('id')),
    }),
  });
  if (retsult.status == 200) {
    showMessage('删除成功');
    return;
  } else {
    showMessage('删除失败:' + retsult.status + ' ' + (await retsult.statusText));
    throw void 0;
  }
}
/**
 *
 * @param {String} title
 * @param {String} content
 * @param {String} recirculationStep
 */
export async function newFeedback(title, content, recirculationStep) {
  let retsult = await fetch('https://api.kuankuan.site/feedback/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      check: localStorage.getItem('check'),
    },
    body: JSON.stringify({
      title: title,
      content: content,
      recirculationStep: recirculationStep,
    }),
  });
  if (retsult.status == 403) {
    location.href = '/login?from=/feedback/new';
  }
  let id = await retsult.text();
  showMessage('提交成功', () => {
    location.href = '/feedback/data/?id=' + id;
  });
}
/**
 *
 * @param {'男'|'女'|'其他'|'保密'} sex
 * @returns {0|1|2|3}
 */
export function sexShower2Save(sex) {
  return {
    男: 0,
    女: 1,
    其他: 2,
    保密: 3,
  }[sex];
}
/**
 *
 * @param {0|1|2|3} sex
 * @returns {'男'|'女'|'其他'|'保密'}
 */
export function sexSave2Shower(sex) {
  return {
    0: '男',
    1: '女',
    2: '其他',
    3: '保密',
  }[sex];
}
/**
 *
 * @param {String} flags
 */
export async function checkResetPassword(flags) {
  var retsult = await fetch('https://api.kuankuan.site/user/resetpassword/check', {
    method: 'POST',
    headers: {
      check: localStorage.getItem('check'),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      flags: flags,
    }),
  });
  if (retsult.status == 200) {
    retsult = await retsult.json();
    localStorage.setItem('check', retsult.check);
    console.log(retsult);
    return {
      name: retsult.name,
      email: retsult.email,
    };
  } else {
    throw void 0;
  }
}
/**
 *
 * @param {String} flags
 * @param {String} password
 * @returns
 */
export async function confirmResetPassword(flags, password) {
  var retsult = await fetch(
    `https://api.kuankuan.site/user/resetpassword/confirm?action=${localStorage.getItem('action')}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        check: localStorage.getItem('check'),
      },
      body: JSON.stringify({
        flags: flags,
        password: password,
      }),
    }
  );
  if (retsult.status == 200) {
    showMessage('密码已重置', () => {
      jumpToWithFrom('/login/');
    });
    return true;
  } else {
    showMessage('意外错误', () => {
      location.reload();
    });
  }
}
export function logout() {
  localStorage.check = void 0;
  location.href = '/';
}

/**
 * Retrieves the registration options from the server.
 *
 * @return {Promise<Object>} The registration options object.
 */
export async function getRegistrationOptions() {
  if (localStorage.getItem('check') == null) {
    throw void 0;
  }
  let result = await fetch('https://api.kuankuan.site/user/safety/webauthn/registration/options', {
    headers: {
      check: localStorage.getItem('check'),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      hostname: new URL(location.href).hostname,
      origin: new URL(location.href).origin,
    }),
    method: 'POST',
  });
  if (result.status === 403) {
    jumpToWithFromNow('/login/');
  }
  if (result.status === 200) {
    result = await result.json();
    result.challenge = Uint8Array.fromString(result.challenge);
    result.user.id = Uint8Array.fromString(btoa(result.user.id));
    console.log(result);
    return result;
  }
}
/**
 * Verify the registration data for a user.
 *
 * @param {Object} data - The registration data to be verified.
 * @return {Promise} - A promise that resolves with the verification result.
 */
export async function verificationRegistration(data) {
  let decodeData = deepCopy(data);
  decodeData.response.clientDataJSON = data.response.clientDataJSON.toBase64();
  decodeData.rawId = data.rawId.toBase64();
  decodeData.response.attestationObject = data.response.attestationObject.toBase64();
  if (localStorage.getItem('check') == null) {
    throw void 0;
  }
  let result = await fetch('https://api.kuankuan.site/user/safety/webauthn/registration/verify', {
    headers: {
      check: localStorage.getItem('check'),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      response: JSON.stringify(decodeData),
    }),
    method: 'POST',
  });
  if (result.status === 403) {
    jumpToWithFromNow('/login/');
  }
  if (result.statue === 401) {
    showError('passkeys创建失败');
  }
  if (result.status === 200) {
    showMessage('创建成功，你可以在下次登录时选择“使用Passkeys登录”来使用它');
  }
}
/**
 * Retrieves the authentication options from the server.
 *
 * @return {Promise<Object>} The authentication options.
 */
export async function getAuthenticationOptions() {
  let result = await fetch(
    'https://api.kuankuan.site/user/safety/webauthn/authentication/options',
    {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        hostname: new URL(location.href).hostname,
        origin: new URL(location.href).origin,
      }),
      method: 'POST',
    }
  );
  if (result.status === 200) {
    result = await result.json();
    result.options.challenge = Uint8Array.fromString(result.options.challenge);
    // result.user.id= Uint8Array.from(btoa(result.user.id), c => c.charCodeAt(0))
    console.log(result);
    return result;
  } else if (result.status === 403) {
    throw void 0;
  }
}

/**
 * Verifies authentication.
 *
 * @param {Object} data - the data to be verified
 * @param {string} id - the id of the data
 * @return {Promise<void>} - a promise that resolves with no value
 */
export async function verificationAuthentication(data, id) {
  let decodeData = deepCopy(data);
  window.data = data;
  decodeData.response.clientDataJSON = data.response.clientDataJSON.toBase64();
  decodeData.rawId = data.rawId.toBase64();
  decodeData.response.authenticatorData = data.response.authenticatorData.toBase64();
  decodeData.response.signature = data.response.signature.toBase64();
  decodeData.response.userHandle = data.response.userHandle.toBase64();
  console.log(JSON.stringify(decodeData));
  let result = await fetch('https://api.kuankuan.site/user/safety/webauthn/authentication/verify', {
    headers: {
      check: localStorage.getItem('check'),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      respone: decodeData,
      id,
    }),
    method: 'POST',
  });
  if (result.status === 200) {
    localStorage.setItem('check', await result.text());
    jumpBackToFrom();
  } else {
    showError('验证失败');
  }
}
/**
 * Sends the finger data to the server for statistical analysis.
 *
 * @param {Object} info - The finger data to be sent.
 * @return {boolean} Returns true if the request was successful, false otherwise.
 */
export async function sendBrowerInfo(info) {
  let result = await fetch('https://api.kuankuan.site/statistics/browerInfo', {
    headers: {
      check: localStorage.getItem('check'),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ info: JSON.stringify(info) }),
    method: 'POST',
  });
  return result.status === 200;
}
/**
 * Retrieves the contents of a novel from the server.
 *
 * @return {Promise} A promise that resolves with the novel contents.
 */
export async function getNovelContents() {
  try {
    let result = await fetch('https://api.kuankuan.site/novel/contents', {
      headers: { check: localStorage.check },
    });
    if (result.status === 403) {
      jumpToWithFromNow('/login/');
      return;
    } else if (result.status === 401) {
      await showMessage('您的账户没有访问该资源的权限');
      jump('/');
      return;
    }
    return await result.json();
  } catch {
    await showMessage('加载错误');
    location.reload();
    return;
  }
}
/**
 * Retrieves a novel file from the server.
 *
 * @param {Array<string>} path - The path of the novel file.
 * @return {Promise<string>} A promise that resolves to the content of the novel file.
 */
export async function getNovelFile(path) {
  try {
    let result = await fetch('https://api.kuankuan.site/novel/file', {
      headers: { 'Content-Type': 'application/json', check: localStorage.check },
      method: 'POST',
      body: JSON.stringify({ path: path }),
    });
    if (result.status === 403) {
      jumpToWithFromNow('/login/');
      return;
    } else if (result.status === 401) {
      await showMessage('您的账户没有访问该资源的权限');
      jump('/');
      return;
    } else if (result.status === 400) {
      await showMessage('您访问的资源不存在');
      jump('/novel/');
      return;
    }
    return await result.text();
  } catch {
    await showMessage('加载错误');
    location.reload();
    return;
  }
}
