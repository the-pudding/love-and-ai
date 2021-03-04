<script>
  export let id = `switch-${Math.floor(Math.random() * 1000)}`;
  export let label;
  export let value = "on";

  let checked = true;

  function handleClick(event) {
    const target = event.target;

    const state = target.getAttribute("aria-checked");

    checked = state === "true" ? false : true;

    value = checked === true ? "on" : "off";
  }
</script>

<div class="s s--inner">
  <span id="{id}" class="label">{label}</span>
  <button
    role="switch"
    aria-checked="{checked}"
    aria-labelledby="{id}"
    on:click="{handleClick}"
  >
    <span>on</span>
    <span>off</span>
  </button>
</div>

<style>
  .s--inner {
    display: inline-block;
  }

  .label {
    font-size: 0.75em;
    font-family: var(--sans);
    font-weight: bold;
  }

  .s--inner button {
    font-size: 0.75em;
    padding: 0.25em;
    background-color: #fff;
    border: 1px solid var(--gray);
  }
  [role="switch"][aria-checked="false"] :first-child,
  [role="switch"][aria-checked="true"] :last-child {
    display: none;
    color: #fff;
  }

  .s--inner button span {
    user-select: none;
    pointer-events: none;
    padding: 0.25em;
  }

  .s--inner button:focus {
    outline: var(--accent-color) solid 1px;
  }
</style>
