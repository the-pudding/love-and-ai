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
    background: url("../assets/images/walking.gif")
      0 0;
    position: absolute;
    top: 120px;
    left: 0;
    transform: translateX(-100%);
    width: 200px;
    height: 225px;
    background-size: contain;
    animation: moveWalkingX 30s linear infinite;
  }

  @keyframes moveWalkingX {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(1000%);
    }
  }

  @media only screen and (max-width: 640px) {
    .animation {
      height: 317px;
      margin: 0 0 1rem 0;
    }

    .background, .foreground {
      width: 480px;
      height: 317px;
    }

    .middle {
      width: 160px;
      height: 180px;
      top: 100px;
      animation: moveWalkingX 20s linear infinite;
    }
  }

  @media only screen and (max-width: 480px) {
    .animation {
      height: 240px;
      margin: 0 0 1rem 0;
    }

    .background, .foreground {
      width: 360px;
      height: 240px;
    }

    .middle {
      width: 120px;
      height: 135px;
      top: 82px;
      animation: moveWalkingX 20s linear infinite;
    }
  }
</style>
