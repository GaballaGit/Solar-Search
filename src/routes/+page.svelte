<script lang="ts">
  import { onMount } from 'svelte';
  import axios from 'axios'; 
  
  onMount(async () => {
    await import('@zumer/orbit/dist/orbit.js');
  });

  function handleHelpClick() {
    alert("Help clicked!");
  }

  // Planet Variables
  let density = "";
  let escape_vilocity = "";
  let gravity = "";
  let mass = "";
  let moons = "";
  let name = "";
  let orbital_period = "";
  let radius = "";
  let rotational_period = "";
  let semi_major_axis = "";

  async function sendPlanetGetInfo(planet: string)  {
    try {
      const response = await axios.get(`http://localhost:8000/planet?name=${planet}`);
      console.log(response.data);
      console.log(response.data.gravity);
      let res = response.data;

      density = res.density;
      escape_vilocity = res.escape_vilocity;
      gravity = res.gravity;
      mass = res.mass;
      moons = res.moons;
      name = res.name;
      orbital_period = res.orbital_period;
      radius = res.radius;
      rotational_period = res.rotational_period;
      semi_major_axis = res.semi_major_axis;

    } catch (error) {
      console.error('Error fetching planets:', error);
    }
  }  
</script>

<style>
   @import '@zumer/orbit/dist/orbit.css';

  html, body {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
  }
  .stars {
    background: black url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/1231630/stars.png") repeat;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: block;
    z-index: 0;
}

  .twinkle {
      position: absolute;
      height: 10000px;
      width: 100%;

      background: transparent url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/1231630/twinkling.png") repeat;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 2;


     animation: moveTwinkle 1000s linear infinite;
  }

   @keyframes moveTwinkle {
   from {background-position: 0 0;}
    to {background-position: 10000px 0;}
   }

  .center-div{ 
     width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 10;
   }


  .bigbang {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .gravity-spot {
     width: 800px;
     height: 800px;
     position: relative;
   }

  .perspective{ 
     transform-style: preserve-3d;
     perspective: 300px;
     transform: rotateX(65deg) rotateY(350deg);
   }

  .orbit-0 {
    border-color: var(--o-red);
    z-index: 30;
  }

  .orbit,
  [class*=orbit-] {
    border: 0.1px solid rgba(255, 255, 255, 0.422);
  }


  .rotate-orbit {
    animation-name: rotation;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    transform-origin: center center;
  }

   .rotate-time-15 {
     animation-duration: 25s;
   }

  .rotate-time-20 {
     animation-duration: 40s;
   }
  .rotate-time-30 {
      animation-duration: 60s;
  }

   .mercury {
     background-color: var(--o-cyan);
   }

   .venus {
     background-color: var(--o-green);
   }

   .earth {
     background-color: var(--o-blue);
   }
   .mars {
     background-color: var(--o-red);
   }
   .jupiter {
     background-color: var(--o-green);
   }
   .saturn {
     background-color: var(--o-green);
   }
   .uranus  {
     background-color: var(--o-blue);
   }
   .neptune {
     background-color: var(--o-indigo);
   }

   .o-arc:hover {
     cursor: pointer;
   }

   .o-arc.indigo {
     background-color: var(--o-indigo);
   }
   .capsule {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }


  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }

</style>


<div class="center-div">
  <div class="bigbang">
    <div class="gravity-spot perspective" style="--o-o-force:800px">
      <div class="orbit-0"></div>
      <div class="orbit rotate-orbit rotate-time-15" style="--o-ellipse-x: 0.3; --o-ellipse-y: 0.3">
        <div class="satellite mercury">
            <div class="capsule">
              <o-arc class="indigo" on:click={() => sendPlanetGetInfo("mercury")}  ></o-arc>
            </div>
        </div>
      </div>
      <div class="orbit rotate-orbit rotate-time-15" style="--o-ellipse-x: 0.3; --o-ellipse-y: 0.3">
        <div class="satellite venus"></div>
          <div class="capsule">
            <o-arc class="indigo" on:click={() => sendPlanetGetInfo("venus")}  ></o-arc>
          </div>
      </div>
      <div class="orbit rotate-orbit rotate-time-20" style="--o-ellipse-x: 0.3; --o-ellipse-y: 0.3">
        <div class="satellite earth"></div>
          <div class="capsule">
            <o-arc class="indigo" on:click={() => sendPlanetGetInfo("earth")}  ></o-arc>
          </div>
      </div>
      <div class="orbit rotate-orbit rotate-time-20" style="--o-ellipse-x: 0.3; --o-ellipse-y: 0.3">
        <div class="satellite mars"></div>
          <div class="capsule">
            <o-arc class="indigo" on:click={() => sendPlanetGetInfo("mars")}  ></o-arc>
          </div>
      </div>
      <div class="orbit rotate-orbit rotate-time-30" style="--o-ellipse-x: 0.3; --o-ellipse-y: 0.3">
        <div class="satellite jupiter grow-2x"></div>
          <div class="capsule">
            <!--<o-arc class="indigo" on:click={() => sendPlanetGetInfo("jupiter")}  ></o-arc>-->
          </div>
      </div>
      <div class="orbit rotate-orbit rotate-time-30" style="--o-ellipse-x: 0.3; --o-ellipse-y: 0.3">
        <div class="satellite saturn angle-30 grow-1.8x"></div>
          <div class="capsule">
            <o-arc class="indigo" on:click={() => sendPlanetGetInfo("saturn")}  ></o-arc>
          </div>
      </div>
      <div class="orbit rotate-orbit rotate-time-30" style="--o-ellipse-x: 0.3; --o-ellipse-y: 0.3">
        <div class="satellite uranus angle-180 grow-1.2x"></div>
          <div class="capsule">
            <o-arc class="indigo" on:click={() => sendPlanetGetInfo("uranus")}  ></o-arc>
          </div>
      </div>
      <div class="orbit rotate-orbit rotate-time-30" style="--o-ellipse-x: 0.3; --o-ellipse-y: 0.3">
        <div class="satellite neptune angle-260 grow-1.2x">
          <div class="capsule">
            <o-arc class="indigo" on:click={() => sendPlanetGetInfo("neptune")}  ></o-arc>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="stars"></div>
<div class="twinkle"></div>