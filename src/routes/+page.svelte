<script lang="ts">
  import { onMount } from 'svelte';
  import axios from 'axios'; 
  
  onMount(async () => {
    await import('@zumer/orbit/dist/orbit.js');
    const arcs = document.querySelectorAll('o-arc');
    arcs.forEach(arc => {
      arc.addEventListener('click', handleHelpClick);
    });
  });


  function handleHelpClick() {
    alert("Help clicked!");
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
    transform: translate(-50%, -50%) !important; 
    transform-style: flat !important; 
    perspective: none !important; 
    z-index: 2; 
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

   .o-arc:hover {
     cursor: pointer;
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
  <img src="/images/sun.png" alt="sun" width="200px" class="planet" />
  <div class="gravity-spot perspective" style="--o-o-force:800px">
    <div class="orbit-0">  </div>
    <div class="orbit rotate-orbit rotate-time-15" style="--o-ellipse-x: 0.3; --o-ellipse-y: 0.3">
      <div class="satellite mercury">
          <div class="capsule">
            <o-arc></o-arc>
            <img src="/images/mercury.png" alt="mercury" width=75px class="planet"/>
          </div>
      </div>
    </div>
    <div class="orbit rotate-orbit rotate-time-15" style="--o-ellipse-x: 0.3; --o-ellipse-y: 0.3">
      <div class="satellite venus">
        <div class="capsule">
          <o-arc></o-arc>
          <img src="/images/venus.png" alt="venus" width=75px class="planet"/>
        </div>
      </div>
    </div>
    <div class="orbit rotate-orbit rotate-time-20" style="--o-ellipse-x: 0.3; --o-ellipse-y: 0.3">
      <div class="satellite earth">
        <div class="capsule">
          <o-arc></o-arc>
          <img src="/images/earth.png" alt="earth" width=75px class="planet"/>
        </div>
      </div>
    </div>
    <div class="orbit rotate-orbit rotate-time-20" style="--o-ellipse-x: 0.3; --o-ellipse-y: 0.3">
      <div class="satellite mars">
        <div class="capsule">
          <o-arc></o-arc>
          <img src="/images/mars.png" alt="mars" width=75px class="planet"/>
        </div>
      </div>
    </div>
    <div class="orbit rotate-orbit rotate-time-30" style="--o-ellipse-x: 0.3; --o-ellipse-y: 0.3">
      <div class="satellite jupiter">
        <div class="capsule">
          <o-arc></o-arc>
          <img src="/images/jupiter.png" alt="jupiter" width=75px class="planet"/>
        </div>
      </div>
    </div>
    <div class="orbit rotate-orbit rotate-time-30" style="--o-ellipse-x: 0.3; --o-ellipse-y: 0.3">
      <div class="satellite saturn angle-30 grow-1.8x">
        <div class="capsule">
          <o-arc></o-arc>
          <img src="/images/saturn.png" alt="saturn" width=75px class="planet"/>
        </div>
      </div>
    </div>
    <div class="orbit rotate-orbit rotate-time-30" style="--o-ellipse-x: 0.3; --o-ellipse-y: 0.3">
      <div class="satellite uranus angle-180 grow-1.2x">
        <div class="capsule">
          <o-arc></o-arc>
          <img src="/images/uranus.png" alt="uranus" width=75px class="planet"/>
        </div>
      </div>
    </div>
    <div class="orbit rotate-orbit rotate-time-30" style="--o-ellipse-x: 0.3; --o-ellipse-y: 0.3">
      <div class="satellite neptune angle-260 grow-1.2x">
        <div class="capsule">
          <o-arc></o-arc>
          <img src="/images/neptune.png" alt="neptune" width=75px class="planet"/>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="stars"></div>
<div class="twinkle"></div>