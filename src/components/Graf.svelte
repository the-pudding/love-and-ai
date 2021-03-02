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
    width: var(--col-width);
    max-width: var(--col-width);
    width: 100%;
    transition: opacity 250ms ease-in;
    padding: 1.5em 1em;
    margin: 0 auto;
    line-height: 2;
    opacity: 1;
  }

  @media only screen and (max-width: 480px) {
    p {
      width: 100%;
      font-size: 0.9em;
    }
  }
</style>
