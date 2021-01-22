<script>
  import { line, curveCatmullRom } from "d3-shape";
  import { onMount } from "svelte";
  import { innerWidth, innerHeight, scrollY } from "../stores/global.js";

  export let name;

  let documentH = 0;
  let mounted;
  let points = [];
  let pathD = "";
  let dashArray = 0;
  let dashOffset = 0;
  let pathEl;

  // const makeLine = line()
  //   .x((d) => d.x)
  //   .y((d) => d.y)
  //   .curve(curveCatmullRom.alpha(1));

  const makeLine = (arr) => {
    return arr.reduce((previous, { x, y }, i) => {
      const next = i < arr.length - 1 ? arr[i + 1] : null;
      let path = "";
      if (next && next.x === x) {
        // straight
        path = `M${x},${y} L${next.x},${next.y}`;
      } else if (next) {
        // curve
        const diff = next.y - y;
        const cx1 = x;
        const cy1 = y + diff / 2;
        const cx2 = next.x;
        const cy2 = next.y - diff / 2;
        path = `M${x},${y} C${cx1},${cy1} ${cx2},${cy2} ${next.x},${next.y}`;
      }

      return `${previous} ${path}`;
    }, "");
  };

  const update = () => {
    documentH = document.body.scrollHeight;

    const blocks = [].concat(...document.querySelectorAll(`.${name}`));
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
  });

  $: mounted && ($innerWidth || $innerHeight), update();
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
    background: rgba(255, 0, 0, 0.1);
  }
</style>
