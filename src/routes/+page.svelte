<script lang="ts">
  import { onMount } from 'svelte';
  import axios from 'axios'; 
  import Display from "./components/display.svelte";
  

  // Vars 
  let showDetails = false;

  let planetData = '';
  onMount(async () => {
    document.body.style.overflow = 'hidden';
    await import('@zumer/orbit/dist/orbit.js');
    const planets = document.querySelectorAll<HTMLImageElement>('.planet');
    if(!planets) {return;}

    planets.forEach(planet => {
      planet.addEventListener('click', (event) => {     
        zoomIn(planet);
      });
    });
  });

  async function zoomIn(planet : HTMLImageElement) {
    const orbits = document.querySelectorAll<HTMLElement>('.rotate-orbit');
    orbits.forEach(orbit => orbit.classList.add('pause-orbit'));
    const planetData = sendPlanetGetInfo(planet.alt);


    showDetails = true;
  }

  function zoomOut() {
    const orbits = document.querySelectorAll<HTMLElement>('.rotate-orbit');
    orbits.forEach(orbit => orbit.classList.remove('pause-orbit'));
    
    
    showDetails = false;
    console.log(showDetails);
  }

  async function sendPlanetGetInfo(planet: string)  {
    try {
      const response = await axios.get(`http://localhost:8000/planet?name=${planet}`);
      console.table(response);
      
    } catch (error) {
      console.error('Error fetching planets:', error);
    }
  }

  function syncPlanets() {
    const followers = document.querySelectorAll<HTMLElement>('.follower');

    function updatePlanets() {
      followers.forEach(follower => {
        const className = [...follower.classList].find(cls => cls != 'follower');
        if(!className) {console.log("no class"); return;}

        const planet = document.querySelector<HTMLElement>(`.planet.${className}`);
        if(!planet) {console.log("no planet"); return;}
        
        const rect = follower.getBoundingClientRect();
        
        planet.style.left = `${rect.left + rect.width / 2}px`;
        planet.style.top = `${rect.top + rect.height / 2}px`;
      });

      requestAnimationFrame(updatePlanets);
    }

    setTimeout(updatePlanets, 50);
  } 

  onMount(() => {
    syncPlanets();
  });
</script>

<style>
   @import '@zumer/orbit/dist/orbit.css';

  html, body {
    height: 500px;
    overflow: hidden; 
  }

  .stars {
    background: black url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/1231630/stars.png") repeat;
    position: absolute;
    top: 0;
    bottom: -100px;
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

   .pDisplay {
     width: 100%;
     height: 100%;
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

  .gravity-spot {
     width: 800px;
     height: 800px;
     position: relative;
   }

  .orbit-0 {
    position: relative;
  }

  .planet {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); 
    z-index: 100; 
    transition: 0.2s ease-in;
    pointer-events: auto;
  }

  .planet:hover{
    cursor: pointer;
  }

  .perspective{ 
    transform-style: preserve-3d;
    perspective: 300px;
    transform: rotateX(65deg) rotateY(350deg);
   }

  .orbit,
  [class*=orbit-] {
    border: 0.1px solid rgba(255, 255, 255, 0.422);
  }

  :global(.pause-orbit) {
    animation-play-state: paused !important;
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

  .satellite {
    opacity: 0;
  }

   .capsule {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .follower {
    color:white;
    position: absolute;
    transform: translate(-50%, -50%);
    padding: 2px 6px;
    border-radius: 4px;
    white-space: nowrap;
    pointer-events: none;
    z-index: 100;
  }
  
 
  .mercury {width: 75px;}
  .venus {width: 75px;}
  .earth {width: 75px;}
  .mars {width: 75px;}
  .jupiter {width: 75px;}
  .saturn {width: 75px;}
  .uranus {width: 75px;}
  .neptune {width: 75px;}

  @keyframes rotation {
    0% {transform: rotate(0deg);}
    100% {transform: rotate(360deg);}
  }
</style>

<div class="center-div">
  {#if (showDetails)}
  <div class="pDisplay">
    <Display on:click={offDetails} name={planetData.name} moons={planetData.moons} mass={planetData.mass} radius={planetData.radius} semi_major_axis={planetData.semi_major_axis} gravity={planetData.gravity} density={planetData.density} escape_velocity={planetData.escape_velocity} orbital_period={planetData.orbital_period} rotation_period={planetData.rotation_period} />
    </div>
  {/if}
  <img src="/images/sun.png" alt="sun" width="200px"/>
  <div class="gravity-spot perspective" style="--o-o-force:800px">

    <div class="orbit-3 rotate-orbit rotate-time-15" style="--o-ellipse-x: 0.4; --o-ellipse-y: 0.4">
      <div class="satellite mercury">
          <div class="capsule">
            <div class="follower mercury"></div>
          </div>
      </div>
    </div>

    <div class="orbit-4 rotate-orbit rotate-time-15" style="--o-ellipse-x: 0.35; --o-ellipse-y: 0.35">
      <div class="satellite venus">
        <div class="capsule">
          <div class="follower venus"></div>
        </div>
      </div>
    </div>

    <div class="orbit-5 rotate-orbit rotate-time-20" style="--o-ellipse-x: 0.35; --o-ellipse-y: 0.35">
      <div class="satellite earth">
        <div class="capsule">
          <div class="follower earth"></div>
        </div>
      </div>
    </div>

    <div class="orbit-6 rotate-orbit rotate-time-20" style="--o-ellipse-x: 0.35; --o-ellipse-y: 0.35">
      <div class="satellite mars">
        <div class="capsule">
          <div class="follower mars"></div>
        </div>
      </div>
    </div>

    <div class="orbit-7 rotate-orbit rotate-time-30" style="--o-ellipse-x: 0.35; --o-ellipse-y: 0.35">
      <div class="satellite jupiter">
        <div class="capsule">
          <div class="follower jupiter"></div>
        </div>
      </div>
    </div>

    <div class="orbit-8 rotate-orbit rotate-time-30" style="--o-ellipse-x: 0.35; --o-ellipse-y: 0.35">
      <div class="satellite saturn angle-30">
        <div class="capsule">
          <div class="follower saturn"></div>
        </div>
      </div>
    </div>

    <div class="orbit-9 rotate-orbit rotate-time-30" style="--o-ellipse-x: 0.35; --o-ellipse-y: 0.35">
      <div class="satellite uranus angle-180">
        <div class="capsule">
          <div class="follower uranus"></div>
        </div>
      </div>
    </div>

    <div class="orbit-10 rotate-orbit rotate-time-30" style="--o-ellipse-x: 0.35; --o-ellipse-y: 0.35">
      <div class="satellite neptune angle-260">
        <div class="capsule">
          <div class="follower neptune"></div>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="stars"></div>
<div class="twinkle"></div>

<div>
  <img src="/images/mercury.png" alt="mercury" class="planet mercury"/>

  <img src="/images/venus.png" alt="venus" class="planet venus"/>

  <img src="/images/earth.png" alt="earth" class="planet earth"/>

  <img src="/images/mars.png" alt="mars" class="planet mars"/>

  <img src="/images/jupiter.png" alt="jupiter" class="planet jupiter"/>

  <img src="/images/saturn.png" alt="saturn" class="planet saturn"/>

  <img src="/images/uranus.png" alt="uranus" class="planet uranus"/>

  <img src="/images/neptune.png" alt="neptune" class="planet neptune"/>
</div>
