<script lang="ts">
  import { onMount } from 'svelte';
    onMount(async () => {
    await import('@zumer/orbit/dist/orbit.js');
  });
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
     transform: rotateX(65deg) rotateY(25deg);

   }

  .orbit-0 {
    border-color: var(--o-red);
    z-index: 30;
  }

  .orbit {
    border-color: var(--o-cyan);
    z-index: 30;
  }
</style>


<div class="center-div">
  <div class="bigbang">
    <div class="gravity-spot perspective" style="--o-o-force:300px">
      <div class="orbit-0"></div>
      <div class="orbit"></div>
      <div class="orbit"></div>
      <div class="orbit"></div>
      <div class="orbit"></div>
      <div class="orbit"></div>
      <div class="orbit"></div>
      <div class="orbit"></div>
      <div class="orbit"></div>
    </div>
  </div>
</div>

<div class="stars"></div>
<div class="twinkle"></div>
