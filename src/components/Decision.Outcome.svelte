<script>
  import { createEventDispatcher, tick, onMount } from "svelte";
  import Text from "./Outcome.Text.svelte";
  import css from "../actions/css.js";
  import Icon from "./helpers/Icon.svelte";

  export let data = [];
  export let active;
  export let marginBottom = 0;
  export let dur = "500ms";

  const dispatch = createEventDispatcher();
  let locked = 1;

  const margins = [];

  $: current = data[active];
  $: r = current.rotate * -1;
  $: active, (marginBottom = margins[active]);

  const margin = (node, { type }) => {
    margins.push(node.offsetHeight);
  };

  const onTransitionEnd = async (e) => {
    locked = active;
    await tick();
    dispatch("change");
  };

  onMount(() => {
    marginBottom = margins[locked];
    dispatch("change");
  });
</script>

<div
  class="decision-outcome"
  style="transform: rotate({r}deg);"
  on:transitionend|self="{onTransitionEnd}"
  use:css="{{ dur }}"
>
  {#each data as { text, type, rotate, stop }, i}
    <div
      class="outcome {type} stop-{stop}"
      class:active="{active === i}"
      class:inactive="{Math.abs(active - i) === 2}"
      style="transform: rotate({rotate}deg) translateY(4.5em);"
      use:margin="{{ type }}"
    >
      {#if text}
        <Text
          text="{text}"
          type="{type}"
          stop="{stop}"
          locked="{locked}"
          i="{i}"
          active="{active}"
        />
      {/if}
      {#if stop === "yes"}
        <div class="stop">
          <Icon name="x-octagon" />
        </div>
      {/if}
    </div>
  {/each}
</div>

<style>
  .decision-outcome {
    --dur: 500ms;
    position: relative;
    transition: transform var(--dur) ease-out;
    transform-origin: 50% calc(var(--wheel-width) / -2);
    width: var(--col-width);
    margin: 0 auto;
    z-index: -1;
  }

  .outcome {
    position: absolute;
    transform-origin: 50% calc(var(--wheel-width) / -2);
    top: 0;
    left: 0;
    width: calc(var(--col-width));
    transition: opacity 500ms ease-out;
    opacity: 0.2;
  }

  .outcome.active {
    opacity: 1;
  }

  .outcome.inactive {
    opacity: 0;
  }

  .stop {
    width: 3rem;
    height: 3rem;
    margin: 0 auto;
    opacity: 0;
  }
</style>
