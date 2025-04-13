<!-- I AM GOING TO SCREAM -->
<script>

let placeHolder = "placeHolder";
let placeHolderNum = "122.5215215125";


// Variables 
export let name = 'Null';
export let moons = '0';
export let mass = '0';
export let radius = '0';
export let semi_major_axis = '0';
export let gravity = '0';
export let density = '0';
export let escape_velocity = '0';
export let orbital_period = '0';
export let rotation_period = '0';
</script>
<style>
  @import url('https://fonts.cdnfonts.com/css/venite-adoremus');


  .back{
   background-color: rgba(0,0,80,0.4); 
    width: 100%;
    height: 25%;
    margin-top: 5%;
    color: white;
  }
  
  .main{
    width: 100%;
    height: 100%;

    background-image: linear-gradient(
    rgba(17, 20, 53, 0.05),
    rgba(118, 255, 241, 0.05)
    );
    background-repeat: repeat;
    background-size: 10vw 10vh;
    animation: bgscroll 4s linear infinite;
  }


  .title{
    background-color: rgba(0,0,0,0.2);
    border: solid cyan;
    border-right: none;
    border-left: none;
    border-top: none;
    display: flex;
    justify-content: center;
    gap: 30px;
  }

  .title button{
    transition: transform 0.3s ease;
    background-color: rgba(0,0,0,0);
    border-color: rgba(0,0,0,0);
    cursor: pointer;
    font-family: 'Venite Adoremus', sans-serif;
    text-shadow: 2px 2px 5px gold;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
  }
  
  .title button:hover{
    transform: scale(1.2);
  }


  .title h2 {
    font-family: 'Venite Adoremus', sans-serif;
    text-shadow: 2px 2px 5px red;
    font-size: 30px;
    display: flex;
    justify-content: center;
    align-items: center;

  }

  .dataContainer{
    margin-top: 5px;
    height: 90%;
    gap: 5px;
    display: flex;
    flex-direction: column;

  }

  .main h3{
    font-family: 'Venite Adoremus', sans-serif;
    text-decoration: overline underline;
    text-shadow: 2px 2px 5px red;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
}

  .dataContainer h2{
    font-family: 'Venite Adoremus', sans-serif;
    text-shadow: 2px 2px 5px red;
    font-size: 20px;
   
}
  .elem{
    display: flex;
    justify-content: center;
    gap: 5px;
    height: 7%;
    width: 100%;
  }

  .labels{
    display: flex;
    flex: 2;
    margin-left: 5px;
    height: 100%;
    width: 100%;
  }

  .nums{
    display:flex;
    flex: 1;
    height: 100%;
    width: 100%;
  }

  @keyframes bgscroll {
    100%  {
    background-position: 0% 100%;
    }

  @keyframes sizeUp {
    100% {
      font-size: 20px 30px;
    }
    }
  }

</style>
<div class="back">


  <div class="main">
    <div class="title">
      <!--
      <h1></h1>
      <button> -- Prev</button>-->
      <h2>{name}</h2>
      <!--
      <button>Next --</button>-->
      <button class="exit" on:click>Exit</button>
    </div>
    <div class="dataContainer">
      <div class="elem"></div>
      <div class="elem">
        <div class="labels"><h3>moons</h3></div>
        <div class="nums"><h2>{moons}</h2></div>
      </div>
      <div class="elem">
        <div class="labels"><h3>mass</h3></div>
        <div class="nums"><h2>{mass}</h2></div>
      </div>
      <div class="elem">
        <div class="labels"><h3>radius</h3></div>
        <div class="nums"><h2>{radius}</h2></div>
      </div>
        <div class="elem">
          <div class="labels"><h3>semi_major_axis</h3></div>
          <div class="nums"><h2>{semi_major_axis}</h2></div>
      </div>
      <div class="elem">
          <div class="labels"><h3>gravity</h3></div>
          <div class="nums"><h2>{gravity}</h2></div>
      </div>
      <div class="elem">
          <div class="labels"><h3>density</h3></div>
          <div class="nums"><h2>{density}</h2></div>
      </div>
      <div class="elem">
          <div class="labels"><h3>escape_velocity</h3></div>
          <div class="nums"><h2>{escape_velocity}</h2></div>
      </div>
      <div class="elem">
          <div class="labels"><h3>orbital_period</h3></div>
          <div class="nums"><h2>{orbital_period}</h2></div>
      </div>
      <div class="elem">
          <div class="labels"><h3>rotation_period</h3></div>
          <div class="nums"><h2>{rotation_period}</h2></div>
      </div>


    </div>
  </div>
</div>
