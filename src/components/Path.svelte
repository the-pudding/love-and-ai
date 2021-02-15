<script>
  import { onMount } from "svelte";
  import makeLine from "../utils/makeLine.js";
  import scrollY from "../stores/scrollY.js";
  import viewport from "../stores/viewport.js";

  export let selector;

  const step = 1;

  let mounted = false;
  let documentH = 0;
  let points = [];
  let yPositions = [];
  let pathD = "";
  let pathEl = null;
  let dashArray = 0;
  let end = 0;
  let blocks = null;
  let observed;
  let scrollMap = {};

  export const render = () => setTimeout(renderPath, 30);

  const progress = () => {
    const visible = blocks.map((node) => node.className.includes("visible"));
    end = visible.lastIndexOf(true);
  };

  const onMutation = (mutations, observer) => {
    const classChange = !!mutations.find((m) => m.attributeName === "class");
    if (classChange) progress();
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
        y -= 27;
      }
      return { i, id, x, y, left, right, side, count: +count, index: +index };
    });

    Object.keys(extents).map((key) => {
      extents[key].left.sort((a, b) => a - b);
      extents[key].right.sort((a, b) => b - a);
    });

    points = withVals.map((d) => {
      let x = d.x;
      let y = d.y;
      let i = d.i;
      let side = d.side;
      let index = d.index;
      if (d.id && d.count > 3) {
        const e = extents[d.id];
        if (e[d.side][0] === d[d.side]) e.maxed = true;
        if (d.index > 0) {
          x = e.maxed ? e[d.side][0] : e[d.side][1];
          x += d.side === "left" ? -27 : 27;
        }
      }
      return { i, x, y, side, index };
    });

    yPositions = points.map((d) => d.y);
    yPositions.reverse();

    pathD = makeLine(points);

    if (!observed) {
      observed = true;
      blocks.map((node) => {
        const o = new MutationObserver(onMutation);
        o.observe(node, { attributes: true });
      });
    }

    setTimeout(createScrollPoints, 17);
  };

  const getLen = (y) => {
    const match = yPositions.find((d) => y >= d);
    if (!match) return 0;
    const i = Math.floor(match / step);
    const len = scrollMap[i];
    // console.log({ y, match, i, len });
    return len || 0;
  };

  onMount(() => {
    mounted = true;
  });

  $: halfH = Math.floor($viewport.height / 2);
  // $: mounted && ($viewport.width || $viewport.height), renderPath();
  $: pathLen = getLen($scrollY + halfH);
  $: dashOffset = dashArray - pathLen;
</script>

<div class="path-container" style="height: {documentH}px;">
  <svg>
    <path class="bg" d="{pathD}"></path>

    <path
      class="fg"
      bind:this="{pathEl}"
      d="{pathD}"
      stroke-dasharray="{dashArray}"
      stroke-dashoffset="{dashOffset}"></path>

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

  circle {
    fill: gray;
  }

  path {
    fill: none;
    stroke: var(--fg);
    stroke-linecap: round;
    /* will-change: ; */
  }

  path.bg {
    stroke: var(--tan-dark);
    stroke-width: 2px;
  }

  path.fg {
    stroke-width: 4px;
    stroke: var(--path-green);
    transition: stroke-dashoffset 500ms ease-out;
  }

  .path-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: var(--z-bottom);
    /* background: rgba(255, 0, 0, 0.1); */
  }
</style>
