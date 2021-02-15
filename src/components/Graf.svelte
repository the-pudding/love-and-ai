<script>
  import inView from "../actions/inView.js";
  import { bottomOffset } from "../stores/global.js";
  export let text;
  let visible;

  function switcher(node, params) {
    const spans = node.querySelectorAll("span:not(.active)");
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
        },
        false
      );
    });
    return {
      destroy() {},
    };
  }
</script>

<p
  class="block locked"
  class:visible
  use:switcher
  use:inView="{{ bottom: $bottomOffset }}"
  on:enter="{() => (visible = true)}"
  on:exit="{() => (visible = false)}"
>
  {@html text}
</p>

<style>
  p {
    width: var(--col-width);
    transition: opacity 500ms ease-in-out;
    padding: 1.5em 1em;
    margin: 0 auto;
    line-height: 2;
    opacity: 0;
  }

  p.visible {
    opacity: 1;
  }
</style>
