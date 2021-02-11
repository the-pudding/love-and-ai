<script>
  import { createEventDispatcher, tick } from "svelte";

  export let data = [];
  export let active;
  export let marginBottom = 0;

  const dispatch = createEventDispatcher();
  let locked = 1;

  $: current = data[active];
  $: r = current.rotate * -1;

  const margin = (node, { type }) => {
    if (type === "reality") {
      const { height } = node.getBoundingClientRect();
      marginBottom = Math.ceil(height);
    }
  };

  const onTransitionEnd = async (e) => {
    locked = active;
    await tick();
    dispatch("change");
  };
</script>

<div
  class="decision-outcome"
  style="transform: rotate({r}deg);"
  on:transitionend|self="{onTransitionEnd}"
>
  {#each data as { text, type, rotate }, i}
    <div
      class="outcome {type}"
      class:active="{active === i}"
      style="transform: rotate({rotate}deg) translateY(3em);"
      use:margin="{{ type }}"
    >
      {#if text}
        {#each text as { value }}
          <p>
            {#if typeof value === "string"}
              <span class="block" class:locked="{locked === i}"
                >{@html value}</span
              >
            {:else}
              {#each value as { chunk, offset, id, side, count, index }}
                <span
                  class="block chunk"
                  class:locked="{locked === i}"
                  data-id="{id}"
                  data-side="{side}"
                  data-count="{count}"
                  data-index="{index}"
                  style="transform: translateX({offset}px);">{chunk}</span
                >
              {/each}
            {/if}
          </p>
        {/each}
      {/if}
    </div>
  {/each}
</div>

<style>
  .decision-outcome {
    position: relative;
    transition: transform 500ms ease-out;
    transform-origin: 50% calc(var(--wheel-width) / -2);
    width: var(--col-width);
    margin: 0 auto;
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

  p {
    padding: 1em;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .generation span {
    display: inline-block;
    /* flex-shrink: 1; */
    background: var(--tan);
    border: 1px solid var(--off-black);
    box-shadow: 2px 2px 10px rgba(40, 40, 40, 0.1);
    border-radius: 5px;
    padding: 0.25rem 0.5rem;
    font-family: var(--mono);
  }
</style>
