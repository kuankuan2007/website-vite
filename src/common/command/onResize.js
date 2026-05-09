const ob = new ResizeObserver((li) => {
  for (let i of li) {
    let handler = callBack.get(i.target);
    if (handler) {
      handler(i);
    }
  }
});
const callBack = new WeakMap();
export default {
  mounted(el, binding) {
    ob.observe(el);
    console.log(el);
    callBack.set(el, binding.value);
  },
  unmounted(el) {
    ob.unobserve(el);
  },
};
