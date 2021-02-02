<script>
  export let data;
  export let active;
  $: current = data[active];
  $: r = current.rotate * -1;
</script>

<div class="decision-input block" style="transform: rotate({r}deg);">
  <fieldset>
    {#each data as { slug, title, rotate }, i}
      <div class="choice">
        <div class="rotate" style="transform: rotate({rotate}deg);">
          <input id="{slug}" type="radio" value="{i}" bind:group="{active}" />
          <label for="{slug}">{title}</label>
        </div>
      </div>
    {/each}
  </fieldset>
</div>

<style>
  .decision-input {
    width: var(--col-width);
    height: var(--col-width);
    margin: 0 auto;
    transition: transform 500ms ease-out;
    transform-origin: 50% 50%;
  }

  fieldset {
    height: 100%;
    position: relative;
    border-radius: 50%;
    border-style: dashed;
  }

  .choice {
    position: absolute;
    top: 0;
    left: 0;
    width: var(--col-width);
    text-align: center;
    z-index: var(--z-top);
    transform: translate(0, calc(var(--col-width)));
    pointer-events: none;
  }

  .rotate {
    transform-origin: 50% calc(var(--col-width) / -2);
    pointer-events: auto;
  }

  label {
    user-select: none;
    cursor: pointer;
    width: 15em;
    margin: 0 auto;
  }

  input {
    position: absolute;
    clip: rect(1px, 1px, 1px, 1px);
    padding: 0;
    border: 0;
    height: 1px;
    width: 1px;
    overflow: hidden;
  }

  input[type="radio"]:checked + label {
    background: yellow;
  }

  input[type="radio"]:focus + label {
    box-shadow: 0 0 0 2px var(--focus);
  }
</style>
