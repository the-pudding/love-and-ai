<script>
  import Meta from "./Meta.svelte";
  import Header from "./pudding/Header.svelte";
  import Footer from "./pudding/Footer.svelte";
  import Path from "./Path.svelte";
  import Prose from "./Prose.svelte";
  import Decision from "./Decision.svelte";
  import copy from "../data/copy.json";
  import { innerWidth, innerHeight, scrollY } from "../stores/global.js";
</script>

<svelte:window
  bind:innerHeight="{$innerHeight}"
  bind:innerWidth="{$innerWidth}"
  bind:scrollY="{$scrollY}"
/>

<Meta />

<!-- <Header /> -->

<Path name="block" />
<!-- <Path name="left" /> -->
<!-- <Path name="right" /> -->

{#each copy.story as section, i}
  <section id="section-{i}">
    <Prose grafs="{section.prose}" />
    <Decision choices="{section.decision}" />
  </section>
{/each}
<!-- <Footer /> -->
