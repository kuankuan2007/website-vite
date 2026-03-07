import {
  getRegistrationOptions,
  verificationRegistration,
  getAuthenticationOptions,
  verificationAuthentication,
} from './connection';
export function checkSupport() {
  return new Promise((resolve, reject) => {
    if (navigator.credentials && navigator.credentials.create && navigator.credentials.get) {
      resolve(true);
    } else {
      resolve(false);
    }
  });
}
export async function createKeys() {
  let options = await getRegistrationOptions();
  navigator.credentials.create({ publicKey: options }).then(
    (result) => {
      console.log(result);
      verificationRegistration(result);
    },
    (reason) => {
      console.warn(reason);
    }
  );
}
export async function checkLogin() {
  let { options, id } = await getAuthenticationOptions();
  navigator.credentials.get({ publicKey: options }).then(
    (result) => {
      console.log(result);
      verificationAuthentication(result, id);
    },
    (reason) => {
      console.warn(reason);
    }
  );
}
