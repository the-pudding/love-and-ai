<script>
  // import { line, curveCatmullRom } from "d3-shape";
  import { onMount } from "svelte";
  import makeLine from "../utils/makeLine.js";
  import { innerWidth, innerHeight, scrollY } from "../stores/global.js";

  export let name;

  let documentH = 0;
  let mounted;
  let points = [];
  let pathD = "";
  let pathEl;
  let dashArray = 0;
  let end = 0;
  let blocks;
  let observed;
  let scrollMap = [];
  let cx = 0;
  let cy = 0;

  // const makeLine = line()
  //   .x((d) => d.x)
  //   .y((d) => d.y)
  //   .curve(curveCatmullRom.alpha(1));

  const progress = () => {
    const visible = blocks.filter((node) => node.className.includes("visible"));
    const tops = visible.map((node) => {
      const { top } = node.getBoundingClientRect();
      return top;
    });
    const max = Math.round(Math.max(...tops));
    end = $scrollY + max;
  };

  const onMutation = (mutations, observer) => {
    const classChange = !!mutations.find((m) => {
      return m.attributeName === "class";
    });
    if (classChange) progress();
  };

  const update = () => {
    documentH = document.body.scrollHeight;
    blocks = [].concat(...document.querySelectorAll(`.${name}`));
    const couples = blocks.map((node, i) => {
      const { top, left, width, height } = node.getBoundingClientRect();
      const y0 = $scrollY + top;
      const y1 = y0 + height;
      const x = left + width / 2;
      return [
        { x, y: y0, i },
        { x, y: y1, i },
      ];
    });

    points = [].concat(...couples);
    pathD = makeLine(points);
    // TODO only once

    if (!observed) {
      // observed = true;
      blocks.map((node) => {
        const o = new MutationObserver(onMutation);
        o.observe(node, { attributes: true });
      });
    }
  };

  const updatePoints = () => {
    pathD = makeLine(points);
    dashArray = pathEl.getTotalLength();
    dashOffset = dashArray - pathEl.getTotalLength();
  };

  const createScrollPoints = () => {
    dashArray = pathEl.getTotalLength();

    scrollMap = [];
    for (let i = 0; i < dashArray; i++) {
      const { x, y } = pathEl.getPointAtLength(i);
      scrollMap[Math.floor(y)] = { i, x, y };
    }
  };

  onMount(() => {
    mounted = true;
  });

  $: halfH = Math.floor($innerHeight / 2);
  $: clipH = $scrollY + halfH;
  $: mounted && ($innerWidth || $innerHeight), update();
  $: if (pathEl && pathD) setTimeout(createScrollPoints, 17);
  $: current = scrollMap[$scrollY + halfH];
  $: dashOffset = current ? dashArray - current.i : dashArray;
  $: if (current) {
    cx = current.x;
    cy = current.y;
  }
</script>

<div class="container" style="height: {documentH}px;">
  <svg>
    <!-- <defs>
      <clipPath id="clip-{name}">
        <rect x="0" y="0" width="{$innerWidth}" height="{clipH}"></rect>
      </clipPath>
    </defs> -->

    <path class="bg" d="{pathD}"></path>

    <!-- <g id="my-graphic" clip-path="url(#clip-{name})"> -->
    <path
      class="fg"
      bind:this="{pathEl}"
      d="{pathD}"
      stroke-dasharray="{dashArray}"
      stroke-dashoffset="{dashOffset}"
    ></path>
    <!-- </g> -->

    <g>
      {#each points as { x, y }}
        <circle cx="{x}" cy="{y}" r="5"></circle>
      {/each}
    </g>
    <circle cx="{cx}" cy="{cy}" r="10"></circle>
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
    /* will-change: ; */
    /* transition: stroke-dashoffset 200ms linear; */
  }

  rect {
    transition: height 200ms;
  }

  /* circle {
    transition: stroke-dashoffset 200ms linear;
  } */

  .hidden {
    display: none;
  }

  path.bg {
    stroke: var(--gray-light);
    stroke-width: 2px;
  }

  path.fg {
    stroke-width: 8px;
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
