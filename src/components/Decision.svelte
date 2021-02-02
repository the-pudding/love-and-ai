<script>
  import { scaleDiverging } from "d3-scale";
  import Outcome from "./Decision.Outcome.svelte";
  import Input from "./Decision.Input.svelte";
  export let choices = [];

  const middle = Math.floor(choices.length / 2);
  const scale = scaleDiverging()
    .domain([0, middle, choices.length - 1])
    .range([90, 0, -90]);

  const data = choices.map((d, i) => ({
    ...d,
    slug: d.title.toLowerCase().replace(/\W/g, "").substring(0, 20),
    rotate: scale(i),
  }));

  let active = Math.floor(data.length / 2);
</script>

{#if choices.length}
  <div class="decision">
    <Input data="{data}" bind:active />
    <Outcome data="{data}" active="{active}" />
  </div>
{/if}

<style>
  .decision {
    margin-top: 4em;
    margin-bottom: 100px;
  }
</style>
