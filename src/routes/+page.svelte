<script lang="ts">
  import { onMount } from 'svelte';
  import axios from 'axios'; 
  
  onMount(async () => {
    await import('@zumer/orbit/dist/orbit.js');
    const buttons = document.querySelectorAll<HTMLElement>('button');
    document.body.style.overflow = 'hidden';

    buttons.forEach(button => {
      button.addEventListener('click', (event) => {
        const classSelector = [...e.classList]
          .map(cls => `.${cls}`)
          .join('');
        
        const planet = document.querySelector<HTMLElement>(`.planet${classSelector}`);
          
        if(planet) {zoomIn(planet);}
      });
    });
  });

  function zoomIn(planet : HTMLElement) {
    const rect = planet.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const viewCenterX = window.innerWidth / 2;
    const viewCenterY = window.innerHeight / 2;

    const offsetX = centerX - viewCenterX;
    const offsetY = centerY - viewCenterY;

    const zoomBox = document.querySelector<HTMLElement>('.zoom-container');
    if(zoomBox) {
      zoomBox.style.transform = `scale(0.5) translate(${-offsetX / 2}px, ${-offsetY / 2}px)`;
    }
  }

  function zoomOut() {
    const zoomBox = document.querySelector<HTMLElement>('.zoom-container');
    if(zoomBox) {
      zoomBox.style.transform = 'scale(1) translate(0, 0)';
    }
  }

  async function sendPlanetGetInfo(planet: string)  {
    try {
      const response = await axios.get(`http://localhost:8000/planet?name=${planet}`);
      console.log(response.data);
      console.log(response.data.gravity);
      let data = response.data;

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

        const button = document.querySelector<HTMLElement>(`button.${className}`);
        if(!button) {console.log("no button"); return;}
        
        const rect = follower.getBoundingClientRect();
        
        planet.style.left = `${rect.left + rect.width / 2}px`;
        planet.style.top = `${rect.top + rect.height / 2}px`;

        button.style.left = planet.style.left;
        button.style.top = planet.style.top;
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

  .zoom_box {
    transition: transform 0.5s ease;
    transform-origin: center center;
    overflow: hidden;
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
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
    z-index: 2; 
    transition: 0.2s ease-in;
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
  
  :global(button) {
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    position: absolute;
    transform: translate(-50%, -50%);
    cursor: pointer;
    z-index: 1000; 
    opacity: 0;
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
  <img src="/images/sun.png" alt="sun" width="200px" class="planet" />
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
  <button class="mercury">'m'</button>
  <img src="/images/mercury.png" alt="m" class="planet mercury"/>

  <img src="/images/venus.png" alt="v" class="planet venus"/>
  <button class="venus">'v'</button>

  <img src="/images/earth.png" alt="e" class="planet earth"/>
  <button class="earth">'e'</button>

  <img src="/images/mars.png" alt="m" class="planet mars"/>
  <button class="mars">'m'</button>

  <img src="/images/jupiter.png" alt="j" class="planet jupiter"/>
  <button class="jupiter">'j'</button>

  <img src="/images/saturn.png" alt="s" class="planet saturn"/>
  <button class="saturn">'s'</button>

  <img src="/images/uranus.png" alt="u" class="planet uranus"/>
  <button class ="uranus">'u'</button>

  <img src="/images/neptune.png" alt="n" class="planet neptune"/>
  <button class="neptune">'n'</button>
</div>
