<script>
  import inView from "../actions/inView.js";
  import { bottomOffset } from "../stores/global.js";
  export let text;
  let visible;

  // $: $progress[index] = visible;
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
    opacity: 0.25;
    transition: opacity 0.25s;
    padding: 1em;
    margin: 0 auto;
    line-height: 2;
  }

  p.visible {
    opacity: 1;
  }
</style>
