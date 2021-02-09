<script>
  import { scaleDiverging } from "d3-scale";
  import Outcome from "./Decision.Outcome.svelte";
  import Input from "./Decision.Input.svelte";
  export let choices = [];

  const positionText = (arr) => {
    const grafs = arr.map((d) => d.value.split("<br>"));
    const total = [].concat(...grafs).length;

    let i = 0;
    const output = grafs.map((graf) => {
      const count = graf.length;
      const id = graf[0].replace(/\W/g, "").slice(0, 20);
      const value = [];
      graf.forEach((chunk, index) => {
        const s = Math.sin((i / total) * Math.PI * 2) * -1;
        const side = s < 0 ? "left" : "right";
        const jitter = 15 - Math.random() * 30;
        const offset =
          index === 0 || count < 4 ? 0 : Math.round(s * 50 + jitter);
        value.push({ chunk, offset, id, side, count, index });
        i += 1;
      });
      return { value };
    });

    return output;
  };

  const middle = Math.floor(choices.length / 2);

  const scale = scaleDiverging()
    .domain([0, middle, choices.length - 1])
    .range([90, 0, -90]);

  const data = choices.map((d, i) => ({
    ...d,
    slug: d.title.toLowerCase().replace(/\W/g, "").substring(0, 20),
    rotate: scale(i),
    text: d.type === "reality" ? d.text : positionText(d.text),
  }));

  let active = Math.floor(data.length / 2);

  let marginBottom = 0;
</script>

{#if choices.length}
  <div class="decision" style="margin-bottom: {marginBottom}px;">
    <Input data="{data}" bind:active />
    <Outcome data="{data}" active="{active}" bind:marginBottom on:change />
  </div>
{/if}

<style>
  .decision {
    margin-top: 4em;
    padding-bottom: 4em;
  }
</style>
