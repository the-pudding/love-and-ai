export default function switcher(node, params) {
  let spans = node.querySelectorAll("span:not(.directions):not(.active):not(.option)");
  const last = spans.length - 1;
  spans.forEach((el, i) => {
    el.setAttribute("role", "button");
    el.addEventListener(
      "click",
      () => {
        const next = i === last ? 0 : i + 1;
        const sibling = spans[next];
        sibling.classList.add("switch");
        el.classList.remove("switch");
				if (params.cb) params.cb();
      },
      false
    );
  });
  return {
    destroy() {}
  };
}
