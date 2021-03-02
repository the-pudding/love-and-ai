<script>
  import { createEventDispatcher } from "svelte";
  import switcher from "../actions/switcher.js";
  import { bottomOffset } from "../stores/global.js";
  export let text;

  const dispatch = createEventDispatcher();
</script>

<p class="block locked" use:switcher="{{ cb: () => dispatch('change') }}">
  {@html text}
</p>

<style>
  p {
    max-width: var(--col-width);
    transition: opacity 250ms ease-in;
    padding: 1.5em 1em;
    margin: 0 auto;
    line-height: 2;
    opacity: 1;
  }
</style>
