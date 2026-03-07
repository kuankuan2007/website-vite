import { createApp } from 'vue';
import infomations from '../components/dialogs/infomtions.vue';
import errors from '../components/dialogs/errors.vue';
import choice from '../components/dialogs/choice.vue';
import imageShower from '../components/dialogs/images.vue';

/**
 * Displays a message in a dialog box and returns a promise that resolves when the dialog is closed.
 *
 * @param {string} message - The message to be displayed in the dialog box.
 * @param {function} [onclose=()=>{}] - An optional callback function to be called when the dialog is closed.
 * @return {Promise} A promise that resolves when the dialog is closed.
 */
export function showMessage(message, onclose = () => {}) {
  return new Promise((resolve, reject) => {
    let dialog = document.createElement('div');
    dialog.classList.add('infomations');
    document.body.appendChild(dialog);
    createApp(infomations, {
      title: '提示',
      message: message,
      buttons: {
        确认: 'ok',
      },
      root: dialog,
      onclose: onclose,
    }).mount(dialog);
    dialog.addEventListener('button', (event) => {
      event.close();
      resolve();
    });
  });
}

/**
 * Shows an error message in a dialog box and returns a promise that resolves when the dialog is closed.
 *
 * @param {string} message - The error message to display.
 * @param {function} onclose - Optional callback function to be called when the dialog is closed.
 * @return {Promise} - A promise that resolves when the dialog is closed.
 */
export function showError(message, onclose = () => {}) {
  return new Promise((resolve, reject) => {
    let dialog = document.createElement('div');
    dialog.classList.add('infomations');
    document.body.appendChild(dialog);
    createApp(errors, {
      title: '错误',
      message: message,
      buttons: {
        确认: 'ok',
      },
      root: dialog,
      onclose: onclose,
    }).mount(dialog);
    dialog.addEventListener('button', (event) => {
      event.close();
      resolve();
    });
  });
}

export function askChoice(
  message,
  title = '询问',
  canclose = false,
  choices = {
    同意: 'agree',
    拒绝: 'reject',
  },
  onclose = () => {}
) {
  return new Promise((resolve, reject) => {
    let dialog = document.createElement('div');
    dialog.classList.add('infomations');
    document.body.appendChild(dialog);
    createApp(choice, {
      title: title,
      message: message,
      buttons: choices,
      canClose: canclose,
      root: dialog,
      onclose: () => {
        reject();
        onclose();
      },
    }).mount(dialog);
    dialog.addEventListener('button', (event) => {
      resolve(event.button);
      event.close();
    });
  });
}
/**
 * Prompts the user with a custom dialog box to agree or reject a message.
 *
 * @param {string} message - The message to display in the dialog box.
 * @param {string} [title="询问"] - The title of the dialog box. Default is "询问".
 * @param {boolean} [canclose=false] - Determines whether the dialog box can be closed. Default is false.
 * @param {function} [onclose=()=>{}] - The function to execute when the dialog box is closed. Default is an empty function.
 * @return {Promise<boolean>} A promise that resolves with true if the user agrees, or false if the user rejects.
 */
export function askAgreeReject(message, title = '询问', canclose = false, onclose = () => {}) {
  return new Promise((resolve, reject) => {
    let dialog = document.createElement('div');
    dialog.classList.add('infomations');
    document.body.appendChild(dialog);
    createApp(choice, {
      title: title,
      message: message,
      buttons: {
        同意: 'agree',
        拒绝: 'reject',
      },
      canClose: canclose,
      root: dialog,
      onclose: onclose,
    }).mount(dialog);
    dialog.addEventListener('button', (event) => {
      event.close();
      resolve(event.button === 'agree');
    });
  });
}
export function showImages(images) {
  return new Promise((resolve, reject) => {
    let dialog = document.createElement('div');
    dialog.classList.add('infomations');
    document.body.appendChild(dialog);
    createApp(imageShower, {
      images,
    }).mount(dialog);
    dialog.addEventListener('close', (event) => {
      resolve();
    });
    console.log(dialog);
  });
}
