<script>
  import { scaleDiverging } from "d3-scale";
  import prefersReducedMotion from "../stores/prefersReducedMotion.js";
  import Outcome from "./Decision.Outcome.svelte";
  import Input from "./Decision.Input.svelte";
  export let choices = [];

  const positionText = (arr) => {
    const grafs = arr.map((d) => d.value.split("<br>"));
    const total = [].concat(...grafs).length;

    let i = 0;
    let prevSide = null;

    const output = grafs.map((graf) => {
      const count = graf.length;
      const id = graf[0].replace(/\W/g, "").slice(0, 20);
      const value = [];

      graf.forEach((chunk, index) => {
        const s = Math.sin(((i + 0.0001) / total) * Math.PI * 2) * -1;
        const side = s < 0 ? "left" : "right";
        const jitter = 15 - Math.random() * 30;

        const offset = i === 0 ? 0 : Math.round(s * 50 + jitter);
        value.push({ chunk, offset, id, side, count, index: i, prevSide });
        i += 1;
        prevSide = side;
      });

      return { value };
    });

    return output;
  };

  const middle = Math.floor(choices.length / 2);

  const scale = scaleDiverging()
    .domain([0, middle, choices.length - 1])
    .range([60, 0, -60]);

  const data = choices.map((d, i) => ({
    ...d,
    slug: d.title.toLowerCase().replace(/\W/g, "").substring(0, 20),
    rotate: scale(i),
    text: d.type === "reality" ? d.text : positionText(d.text),
  }));

  let active = Math.floor(data.length / 2);
  let prev = active;

  let marginBottom = 0;
  let dur = "500ms";

  $: prm = prefersReducedMotion;

  $: {
    const diff = Math.abs(active - prev);
    dur = `${500 * diff}ms`;
    prev = active;
  }
</script>

{#if choices.length}
  <div class="decision" class:prm style="margin-bottom: {marginBottom}px;">
    <p class="leadin block locked">{choices[0].leadin}</p>
    <Input data="{data}" bind:active dur="{dur}" />
    <Outcome
      data="{data}"
      active="{active}"
      dur="{dur}"
      bind:marginBottom
      on:change
    />
  </div>
{/if}

<style>
  .decision {
    margin-top: 4em;
    padding-bottom: 4em;
    position: relative;
    transition: margin-bottom 500ms ease-in;
    will-change: margin-bottom;
  }

  .decision.prm {
    transition: none;
  }

  .leadin {
    position: absolute;
    text-align: center;
    width: 100%;
    max-width: 10em;
    top: 50%;
    left: 50%;
    margin: -2rem 0 0 0;
    transform: translate(-50%, -50%);
    font-family: var(--sans);
    font-size: 1.5em;
    line-height: 1.2;
    z-index: 2;
  }

  @media only screen and (max-width: 480px) {
    .leadin {
      font-size: 1.25em;
    }
  }
</style>
