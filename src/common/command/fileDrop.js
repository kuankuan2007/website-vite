export default {
  /**
   * Mounts the element with the given binding.
   *
   * @param {HTMLElement} el - the element to be mounted
   */
  mounted(el, binding) {
    el.addEventListener('dragenter', (e) => {
      e.preventDefault();
    });
    el.addEventListener('dragover', (e) => {
      e.preventDefault();
    });
    el.addEventListener('drop', (e) => {
      e.preventDefault();
      console.log(binding);
      binding.value(e.dataTransfer.files);
    });
  },
};
