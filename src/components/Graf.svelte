<script>
  import { createEventDispatcher } from "svelte";
  import inView from "../actions/inView.js";
  import switcher from "../actions/switcher.js";
  import { bottomOffset } from "../stores/global.js";
  export let text;
  let visible;

  const dispatch = createEventDispatcher();
</script>

<p
  class="block locked"
  class:visible
  use:switcher="{{ cb: () => dispatch('change') }}"
>
  {@html text}
</p>

<!-- use:inView="{{ bottom: $bottomOffset }}"
  on:enter="{() => (visible = true)}"
  on:exit="{() => (visible = false)}" -->
<style>
  p {
    width: var(--col-width);
    transition: opacity 250ms ease-in;
    padding: 1.5em 1em;
    margin: 0 auto;
    line-height: 2;
    opacity: 1;
  }

  p.visible {
    opacity: 1;
  }
</style>
