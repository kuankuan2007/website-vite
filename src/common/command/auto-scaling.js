export default {
  /**
   * Mounts the element with the given binding.
   *
   * @param {HTMLTextAreaElement} el - the element to be mounted
   * @param {Object} binding
   * @param {number} binding.value.padding
   */
  mounted(el, binding) {
    function resize(e) {
      el.style.height = 'auto';
      el.style.height = `${el.scrollHeight - binding.value.padding}px`;
    }
    el.addEventListener('input', resize);
    el.addEventListener('change', resize);
    setTimeout(() => {
      resize();
    }, 0);
  },
};
