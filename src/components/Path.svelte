<script>
  import { line, curveCatmullRom } from "d3-shape";
  import { onMount } from "svelte";
  import { innerWidth, innerHeight, scrollY } from "../stores/global.js";

  let documentH = 0;
  let mounted;
  let points = [];
  let pathD = "";
  let dashArray = 0;
  let dashOffset = 0;
  let pathEl;

  const makeLine = line()
    .x((d) => d.x)
    .y((d) => d.y)
    .curve(curveCatmullRom.alpha(1));

  const update = () => {
    documentH = document.body.scrollHeight;
    const blocks = [].concat(...document.querySelectorAll(".block"));
    const couples = blocks.map((node) => {
      const { top, left, width, height } = node.getBoundingClientRect();
      const y0 = $scrollY + top;
      const y1 = y0 + height;
      const x = left + width / 2;
      return [
        { x, y: y0 },
        { x, y: y1 },
      ];
    });

    points = [].concat(...couples);
    pathD = makeLine(points);
  };

  onMount(() => {
    mounted = true;
    // setTimeout(() => {
    //   console.log(pathEl.getTotalLength());
    // }, 1000);
  });

  $: mounted && ($innerWidth || $innerHeight || $scrollY), update();
  $: if (pathEl && pathD) dashArray = pathEl.getTotalLength();
</script>

<div class="container" style="height: {documentH}px;">
  <svg>
    <path
      bind:this="{pathEl}"
      d="{pathD}"
      stroke-dasharray="{dashArray}"
      stroke-dashoffset="{dashOffset}"
    ></path>
    <g>
      {#each points as { x, y }}
        <circle cx="{x}" cy="{y}" r="5"></circle>
      {/each}
    </g>
  </svg>
</div>

<style>
  svg {
    display: block;
    width: 100%;
    height: 100%;
  }

  path {
    fill: none;
    stroke: var(--fg);
  }

  .container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: var(--z-bottom);
  }
</style>
