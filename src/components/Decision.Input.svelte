<script>
  import css from "../actions/css.js";
  import prefersReducedMotion from "../stores/prefersReducedMotion.js";
  import { animations } from "../stores/global.js";
  import viewport from "../stores/viewport.js";
  export let data;
  export let active;
  export let dur;
  $: current = data[active];
  $: r = current.rotate;

  $: prm = prefersReducedMotion || !$animations;
  $: mobile = $viewport.width < 480;

  const translate = (r) => {
    let x = 0;
    if (r > 0) x = "-50%";
    else if (r < 0) x = "50%";
    return `translateX(${x})`;
  };
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
          <label
            for="{slug}"
            style="transform: rotate({-rotate + r}deg) {mobile
              ? translate(-rotate + r)
              : ''}">{title}</label
          >
        </div>
      </div>
    {/each}
  </fieldset>
</div>

<style>
  fieldset {
    padding: 0;
    margin: 0;
  }

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

  label:hover {
    box-shadow: 0 0 0 3px var(--light-blue);
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
      width: var(--wheel-width-mobile);
      height: var(--wheel-width-mobile);
    }

    .choice {
      width: var(--wheel-width-mobile);
      transform: translate(0, var(--wheel-width-mobile));
    }

    .rotate {
      transform-origin: 50% calc(var(--wheel-width-mobile) / -2);
    }

    label {
      max-width: 11em;
      font-size: 0.75em;
      line-height: 1.2;
    }
  }
</style>
