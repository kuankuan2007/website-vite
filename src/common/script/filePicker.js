/**
 * A function that opens a file picker dialog and returns a promise that resolves to the selected file(s).
 *
 * @param {string} accept - The file types to accept in the file picker dialog.
 * @param {boolean} multiple - Indicates whether multiple files can be selected.
 * @return {Promise<FileList>} A promise that resolves to the selected file(s).
 */
export function filePicker(accept, multiple) {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = accept;
  input.multiple = multiple;
  return new Promise((resolve, reject) => {
    input.onchange = (e) => {
      const files = e.target.files;
      resolve(files);
    };
    input.oncancel = (e) => {
      reject();
    };
    input.showPicker();
  });
}
console.log('FilePicker');
