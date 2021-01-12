<script>
  import inView from "../actions/inView.js";
  import { innerHeight } from "../stores/global.js";
  export let text;
  export let alignment;
  let visible;

  $: bottom = Math.round($innerHeight * 0.25);
</script>

<p
  class="{alignment}"
  class:visible
  use:inView="{{ bottom }}"
  on:enter="{() => (visible = true)}"
  on:exit="{() => (visible = false)}">
  {@html text}
</p>

<style>
  p {
    width: 25em;
    opacity: 0.25;
    transition: opacity 0.25s;
  }

  p.visible {
    opacity: 1;
  }

  .left {
  }

  .right {
    align-self: flex-end;
  }
</style>
