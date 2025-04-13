<!-- I AM GOING TO SCREAM -->
<script>
let name = "Earth";
</script>
<style>
  .main{
    width: 100vw;
    height: 100vh;

    background-image: linear-gradient(
    rgba(17, 20, 53, 0.05),
    rgba(118, 255, 241, 0.05)
    );
    background-repeat: repeat;
    background-size: 10vw 10vh;
    animation: bgscroll 4s linear infinite;
  }


  .title{
    position: relative;

  }


  @keyframes bgscroll {
    100%  {
    background-position: 0% 100%;
    }
  }

</style>

<div class="main">
  <div class="title">
    <h1>{name}</h1>
  </div>
</div>
