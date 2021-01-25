<script>
  import inView from "../actions/inView.js";
  import { innerHeight, bottomOffset } from "../stores/global.js";
  export let text;
  export let align;
  export let id;
  export let connect;
  let visible;

  // $: $progress[index] = visible;
</script>

<p
  class="block {align}"
  class:visible
  use:inView="{{ bottom: $bottomOffset }}"
  on:enter="{() => (visible = true)}"
  on:exit="{() => (visible = false)}"
>
  {@html text}
</p>

<style>
  p {
    width: 25em;
    opacity: 0.25;
    transition: opacity 0.25s;
    padding: 1em;
    margin: 5em 0;
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
