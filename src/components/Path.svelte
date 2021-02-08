<script>
  import { onMount } from "svelte";
  import makeLine from "../utils/makeLine.js";
  import { windowWidth, windowHeight, scrollY } from "../stores/global.js";

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

    points = blocks.map((node, i) => {
      const { top, left, width } = node.getBoundingClientRect();
      const y = $scrollY + top;
      const x = left + width / 2;
      return { x, y, i };
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

  $: halfH = Math.floor($windowHeight / 2);
  $: clipH = $scrollY + halfH;
  $: mounted && ($windowWidth || $windowHeight), renderPath();
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
        <rect x="0" y="0" width="{$windowWidth}" height="{clipH}"></rect>
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
        <circle cx="{x}" cy="{y}" r="10"></circle>
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

  circle {
    fill: blue;
  }

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

  .path-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: var(--z-bottom);
    background: rgba(255, 0, 0, 0.1);
  }
</style>
