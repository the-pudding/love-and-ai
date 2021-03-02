<script>
  import css from "../actions/css.js";
  import prefersReducedMotion from "../stores/prefersReducedMotion.js";
  export let data;
  export let active;
  export let dur;
  $: current = data[active];
  $: r = current.rotate;

  $: prm = prefersReducedMotion;
</script>

<div
  class="decision-input"
  class:prm
  style="transform: rotate({-r}deg);"
  use:css="{{ dur }}"
>
  <fieldset>
    {#each data as { slug, title, rotate }, i}
      <div class="choice">
        <div class="rotate" style="transform: rotate({rotate}deg);">
          <input id="{slug}" type="radio" value="{i}" bind:group="{active}" />
          <label for="{slug}" style="transform: rotate({-rotate + r}deg);"
            >{title}</label
          >
        </div>
      </div>
    {/each}
  </fieldset>
</div>

<style>
  .decision-input {
    --dur: 500ms;
    width: var(--wheel-width);
    height: var(--wheel-width);
    margin: 0 auto;
    transition: transform var(--dur) ease-in-out;
    transform-origin: 50% 50%;
    position: relative;
    will-change: transform;
    z-index: 1;
  }

  .decision-input.prm {
    --dur: 0ms;
  }

  fieldset {
    height: 100%;
    position: relative;
    border-radius: 50%;
    border-color: transparent;
    background: url("../assets/images/circle.png");
    background-size: 95%;
    background-position: center;
    background-repeat: no-repeat;
  }

  .choice {
    position: absolute;
    top: 0;
    left: 0;
    width: var(--wheel-width);
    text-align: center;
    z-index: var(--z-top);
    transform: translate(0, calc(var(--wheel-width)));
    pointer-events: none;
  }

  .rotate {
    transform-origin: 50% calc(var(--wheel-width) / -2);
    pointer-events: auto;
  }

  label {
    user-select: none;
    cursor: pointer;
    margin: 0 auto;
    transition: transform var(--dur) ease-out;
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
    box-shadow: 0 0 0 3px var(--light-blue);
  }

  input[type="radio"]:focus + label {
    box-shadow: 0 0 0 3px var(--light-blue);
  }

  @media only screen and (max-width: 480px) {
    .decision-input {
      width: 20em;
      height: 20em;
    }

    .choice {
      width: 20em;
      transform: translate(0, 20em);
    }

    .rotate {
      transform-origin: 50% calc(20em / -2);
    }
  }
</style>
