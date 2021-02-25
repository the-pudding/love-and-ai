<script>
</script>

<div class="animation">
  <div class="bridge">
    <div class="background"></div>
    <div class="middle"></div>
    <div class="foreground"></div>
  </div>
</div>

<style>
  .animation {
    width: 100%;
    height: 450px;
    margin: 0 0 3rem 0;
  }

  .bridge {
    position: absolute;
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
  }

  .background {
    background: url("../assets/images/210219_River_Animation_Final_BG.png") 0 0;
    position: absolute;
    width: 600px;
    height: 450px;
    background-size: cover;
  }

  .foreground {
    background: url("../assets/images/210219_River_Animation_Final_FG.png") 0 0;
    position: absolute;
    width: 600px;
    height: 450px;
    background-size: cover;
  }

  .middle {
    background: url("../assets/images/210219_River_Animation_Final_Walking.png")
      0 0;
    position: absolute;
    top: 120px;
    left: 0;
    transform: translateX(-100%);
    width: 200px;
    height: 225px;
    background-size: cover;
    animation: moveWalking 1.25s steps(8) infinite,
      moveWalkingX 30s linear infinite;
  }

  @keyframes moveWalking {
    100% {
      background-position: 0 -1800px;
    }
  }

  @keyframes moveWalkingX {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(1000%);
    }
  }
</style>
