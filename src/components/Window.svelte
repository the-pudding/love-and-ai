<script>
  import throttle from "lodash.throttle";
  import debounce from "lodash.debounce";
  import { onMount } from "svelte";
  import { innerWidth, innerHeight, scrollY } from "../stores/global.js";

  let h = 0;
  let w = 0;
  let y = 0;

  const onResize = () => {
    $innerWidth = w;
    $innerHeight = h;
  };

  const onScroll = () => {
    $scrollY = y;
  };

  onMount(() => {
    onResize();
  });
</script>

<svelte:window
  on:resize="{debounce(onResize, 500)}"
  on:scroll="{throttle(onScroll, 20)}"
  bind:innerHeight="{h}"
  bind:innerWidth="{w}"
  bind:scrollY="{y}"
/>
