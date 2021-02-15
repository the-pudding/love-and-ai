<script>
  import inView from "../actions/inView.js";
  import { bottomOffset } from "../stores/global.js";
  export let text;
  let visible;
</script>

<p
  class="block locked"
  class:visible
  use:inView="{{ bottom: $bottomOffset }}"
  on:enter="{() => (visible = true)}"
  on:exit="{() => (visible = false)}"
>
  {@html text}
</p>

<style>
  p {
    width: var(--col-width);
    transition: opacity 500ms ease-out;
    padding: 1.5em 1em;
    margin: 0 auto;
    line-height: 2;
    opacity: 1;
  }

  p.visible {
    opacity: 1;
  }
</style>
