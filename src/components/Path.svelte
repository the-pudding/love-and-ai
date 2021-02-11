<script>
  import { onMount } from "svelte";
  import makeLine from "../utils/makeLine.js";
  import scrollY from "../stores/scrollY.js";
  import viewport from "../stores/viewport.js";

  export let selector;

  let mounted = false;
  let documentH = 0;
  let points = [];
  let pathD = "";
  let pathEl = null;
  let dashArray = 0;
  let end = 0;
  let blocks = null;
  let observed;
  let cx = 0;
  let cy = 0;

  export const render = () => renderPath();

  const progress = () => {
    const visible = blocks.map((node) => node.className.includes("visible"));
    end = visible.lastIndexOf(true);
  };

  const onMutation = (mutations, observer) => {
    const classChange = !!mutations.find((m) => m.attributeName === "class");
    if (classChange) progress();
  };

  const renderPath = () => {
    if (!mounted) return false;
    documentH = document.body.scrollHeight;
    blocks = [].concat(...document.querySelectorAll(`${selector}`));

    const extents = {};
    const withVals = blocks.map((node, i) => {
      const { top, left, right, width } = node.getBoundingClientRect();
      const { id, side, count, index } = node.dataset;
      const y = $scrollY + top;
      const x = left + width / 2;
      if (id) {
        if (!extents[id]) extents[id] = { left: [], right: [] };
        extents[id].left.push(left);
        extents[id].right.push(right);
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
          x += d.side === "left" ? -16 : 16;
        }
      }
      return { i, x, y, side, index };
    });

    pathD = makeLine(points);

    if (!observed) {
      // observed = true;
      blocks.map((node) => {
        const o = new MutationObserver(onMutation);
        o.observe(node, { attributes: true });
      });
    }
  };

  onMount(() => {
    mounted = true;
  });

  $: halfH = Math.floor($viewport.height / 2);
  $: clipH = $scrollY + halfH;
  $: mounted && ($viewport.width || $viewport.height), renderPath();
  $: dashOffset = dashArray;
  // $: current = scrollMap[$scrollY + halfH];
  // $: dashOffset = current ? dashArray - current.i : dashArray;
  // $: if (current) {
  //   cx = current.x;
  //   cy = current.y;
  // }
</script>

<div class="path-container" style="height: {documentH}px;">
  <svg>
    <!-- <defs>
      <clipPath id="clip-{name}">
        <rect x="0" y="0" width="{$viewport.width}" height="{clipH}"></rect>
      </clipPath>
    </defs> -->

    <path class="bg" d="{pathD}"></path>

    <!-- <g id="my-graphic" clip-path="url(#clip-{name})"> -->
    <path
      class="fg"
      bind:this="{pathEl}"
      d="{pathD}"
      stroke-dasharray="{dashArray}"
      stroke-dashoffset="{dashOffset}"></path>
    <!-- </g> -->

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
    stroke-linecap: round;
    /* will-change: ; */
    /* transition: stroke-dashoffset 200ms linear; */
  }

  circle {
    fill: gray;
  }

  .hidden {
    display: none;
  }

  path.bg {
    stroke: var(--gray-light);
    stroke-width: 2px;
  }

  path.fg {
    stroke-width: 4px;
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
