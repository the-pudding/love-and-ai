<script>
  import { onMount } from "svelte";
  import makeLine from "../utils/makeLine.js";
  import scrollY from "../stores/scrollY.js";
  import viewport from "../stores/viewport.js";
  import prefersReducedMotion from "../stores/prefersReducedMotion.js";
  import { animations } from "../stores/global.js";

  export let selector;

  const OFFSET = 27;
  const step = 1;

  let mounted = false;
  let documentH = 0;
  let points = [];
  let yPositions = [];
  let pathD = "";
  let pathEl = null;
  let dashArray = 0;
  let blocks = null;
  let scrollMap = {};
  let animate;

  export const render = () => {
    setTimeout(renderPath, 30);
  };

  const createScrollPoints = () => {
    dashArray = pathEl.getTotalLength();
    scrollMap = {};
    // console.time("create");
    for (let i = 0; i < dashArray; i += step) {
      const { x, y } = pathEl.getPointAtLength(i);
      const floor = Math.floor(y / step);
      scrollMap[floor] = i;
    }
    // console.timeEnd("create");
  };

  const renderPath = () => {
    if (!mounted) return false;
    documentH = document.body.scrollHeight;
    blocks = [].concat(...document.querySelectorAll(`${selector}`));

    const extents = {};
    const withVals = blocks.map((node, i) => {
      const { top, left, right, width } = node.getBoundingClientRect();
      const { id, side, count, index } = node.dataset;
      let y = $scrollY + top;
      const x = left + width / 2;
      if (id) {
        if (!extents[id]) extents[id] = { left: [], right: [] };
        extents[id].left.push(left);
        extents[id].right.push(right);
        y -= OFFSET;
      }
      return { i, id, x, y, left, right, side, count: +count, index: +index };
    });

    Object.keys(extents).map((key) => {
      extents[key].left.sort((a, b) => a - b);
      extents[key].right.sort((a, b) => b - a);
    });

    points = withVals.map((d) => {
      let { id, x, y, i, side, index, count } = d;

      if (id && count > 3) {
        const e = extents[id];
        if (e[side][0] === d[side]) e.maxed = true;
        if (index > 0) {
          x = e.maxed ? e[side][0] : e[side][1];
          x += side === "left" ? -OFFSET / factor : OFFSET / factor;
        }
      }
      // if (index === count - 1) y += OFFSET;
      return { i, x, y, side, index };
    });

    yPositions = points.map((d) => d.y);
    yPositions.reverse();

    pathD = makeLine(points);

    setTimeout(createScrollPoints, 17);
  };

  const getLen = (y) => {
    const match = yPositions.find((d) => y >= d);
    if (!match) return 0;
    const i = Math.floor(match / step);
    const len = scrollMap[i];
    return typeof len === "undefined" ? scrollMap[0] : len;
  };

  onMount(() => {
    mounted = true;
  });

  $: offsetH = Math.floor($viewport.height * 0.67);
  $: pathLen = getLen($scrollY + offsetH);
  $: dashOffset = dashArray - pathLen;
  $: pathLen, (animate = true);
  $: dashArray, (animate = false);
  $: prm = $prefersReducedMotion || !$animations;
  $: mobile = $viewport.width < 480;
  $: factor = mobile ? 4 : 1;
  // $: if (mounted && $viewport.width) renderPath();
</script>

<div class="path-container" style="height: {documentH}px;" class:prm>
  <svg>
    <path class="bg" d="{pathD}"></path>

    <path
      class="fg"
      class:animate
      bind:this="{pathEl}"
      d="{pathD}"
      stroke-dasharray="{dashArray}"
      stroke-dashoffset="{dashOffset}"></path>
    <!-- 
    <g>
      {#each points as { x, y }}
        <circle cx="{x}" cy="{y}" r="5"></circle>
      {/each}
    </g> -->
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
    stroke-linecap: round;
  }

  path.bg {
    stroke: var(--tan-dark);
    stroke-width: 1px;
  }

  path.fg {
    stroke-width: 3px;
    stroke: var(--light-blue);
    will-change: stroke-dashoffset;
  }

  path.fg.animate {
    transition: stroke-dashoffset 500ms ease-out;
  }

  .prm path.fg.animate {
    transition: none;
  }

  .path-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: var(--z-bottom);
  }
</style>
