<script>
  import { createEventDispatcher, tick, onMount } from "svelte";
  import prefersReducedMotion from "../stores/prefersReducedMotion.js";
  import Text from "./Outcome.Text.svelte";
  import css from "../actions/css.js";
  import Icon from "./helpers/Icon.svelte";

  export let data = [];
  export let active;
  export let marginBottom = 0;
  export let dur = "500ms";

  const dispatch = createEventDispatcher();
  const margins = [];

  let locked = 1;
  let el;

  $: prm = $prefersReducedMotion;
  $: current = data[active];
  $: r = current.rotate * -1;
  $: active, (marginBottom = margins[active]);
  $: hasStop = current.stop === "yes";

  const margin = (node, { type }) => {
    margins.push(node.offsetHeight);
  };

  const toggleBelow = () => {
    const section = el.parentNode.parentNode;
    const id = section.getAttribute("id");
    let passed;

    const toHide = Array.prototype.forEach.call(
      section.parentNode.children,
      (child) => {
        const same = child === section;
        const classes = child.className;
        const hide = !same && passed && !classes.includes("spacer");
        if (child === section) passed = true;

        if (hasStop && hide) child.classList.remove("unstopped");
        else child.classList.add("unstopped");
      }
    );
  };

  const onTransitionEnd = async (e) => {
    locked = active;
    toggleBelow();
    await tick();
    dispatch("change");
  };

  onMount(() => {
    marginBottom = margins[locked];
    dispatch("change");
  });
</script>

<div
  bind:this="{el}"
  class="decision-outcome"
  class:prm
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
          dur="{dur}"
        />
      {/if}
      {#if stop === "yes"}
        <div class="stop">
          <p class="block" class:locked="{locked === i}">
            <Icon name="x-octagon" width="3rem" height="3rem" />
          </p>
          <p>
            <span class="directions"
              >You’ve chosen a path where the story ends. Select another path to
              continue.</span
            >
          </p>
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
    z-index: 0;
    will-change: transform;
  }

  .decision-outcome.prm {
    --dur: 0ms;
  }

  .outcome {
    position: absolute;
    transform-origin: 50% calc(var(--wheel-width) / -2);
    top: 0;
    left: 0;
    width: 100%;
    max-width: var(--col-width);
    transition: opacity 500ms ease-out;
    opacity: 0.2;
    will-change: opacity;
  }

  .prm .outcome {
    transition: none;
  }

  .outcome.active {
    opacity: 1;
  }

  .outcome.inactive {
    opacity: 0;
  }

  .outcome.inactive .stop,
  .outcome .stop {
    margin: 0 auto;
    opacity: 0;
    transition: opacity 500ms ease-out;
    will-change: opacity;
    max-width: 20em;
  }

  .outcome.inactive.prm .stop,
  .outcome.prm .stop {
    transition: none;
  }

  .outcome.active .stop {
    opacity: 1;
  }

  .stop p {
    margin: 0;
    text-align: center;
  }

  @media only screen and (max-width: 480px) {
    .decision-outcome {
      width: 100%;
      transform-origin: 50% calc(var(--wheel-width-mobile) / -2);
    }

    .outcome {
      padding: 0 1em;
      width: 100%;
      transform-origin: 50% calc(var(--wheel-width-mobile) / -2);
    }
  }
</style>
