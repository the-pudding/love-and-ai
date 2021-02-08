<script>
  export let data;
  export let active;
  $: current = data[active];
  $: r = current.rotate;
</script>

<div class="decision-input" style="transform: rotate({-r}deg);">
  <fieldset>
    {#each data as { slug, title, rotate }, i}
      <div class="choice">
        <div class="rotate" style="transform: rotate({rotate}deg);">
          <input id="{slug}" type="radio" value="{i}" bind:group="{active}" />
          <label for="{slug}" style="transform: rotate({-rotate + r}deg);"
            >{title}</label
          >
          <!-- <label for="{slug}" style="transform: rotate({0}deg);">{title}</label> -->
        </div>
      </div>
    {/each}
  </fieldset>
  <div class="block locked"></div>
</div>

<style>
  .decision-input {
    width: var(--col-width);
    height: var(--col-width);
    margin: 0 auto;
    transition: transform 500ms ease-in-out;
    transform-origin: 50% 50%;
  }

  fieldset {
    height: 100%;
    position: relative;
    border-radius: 50%;
    border-color: var(--fg);
    background-color: var(--tanDarker);
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
    margin: 0 auto;
    transition: transform 500ms ease-out;
    background-color: var(--fg);
    color: var(--white);
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
    box-shadow: 0 0 0 2px var(--focus);
  }

  input[type="radio"]:focus + label {
    box-shadow: 0 0 0 2px var(--focus);
  }

  .block {
    position: absolute;
    top: 50%;
    width: 100%;
    left: 0;
  }
</style>
