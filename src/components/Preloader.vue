<template>
  <div class="wrapper">
    <div class="box"></div>
    <div class="box"></div>
    <div class="box"></div>
    <div class="box"></div>
    <div class="box"></div>
    <div class="box"></div>
    <div class="box"></div>
    <div class="box"></div>
    <div class="box"></div>
    <div class="box"></div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 30%;
}

.box {
  width: 30px;
  height: 30px;
  margin: 0 10px;
  border-radius: 0%;
  -webkit-transform: translateY(0) rotate(0deg);
          transform: translateY(0) rotate(0deg);
  -webkit-animation: change 1s infinite alternate;
          animation: change 1s infinite alternate;
}

.box:nth-child(1) {
  background-color: #FF2E63;
  -webkit-animation-delay: 0.1s;
          animation-delay: 0.1s;
}

.box:nth-child(2) {
  background-color: #08D9D6;
  -webkit-animation-delay: 0.2s;
          animation-delay: 0.2s;
}

.box:nth-child(3) {
  background-color: #FF2E63;
  -webkit-animation-delay: 0.3s;
          animation-delay: 0.3s;
}

.box:nth-child(4) {
  background-color: #08D9D6;
  -webkit-animation-delay: 0.4s;
          animation-delay: 0.4s;
}

.box:nth-child(5) {
  background-color: #FF2E63;
  -webkit-animation-delay: 0.5s;
          animation-delay: 0.5s;
}

.box:nth-child(6) {
  background-color: #08D9D6;
  -webkit-animation-delay: 0.6s;
          animation-delay: 0.6s;
}

.box:nth-child(7) {
  background-color: #FF2E63;
  -webkit-animation-delay: 0.7s;
          animation-delay: 0.7s;
}

.box:nth-child(8) {
  background-color: #08D9D6;
  -webkit-animation-delay: 0.8s;
          animation-delay: 0.8s;
}

.box:nth-child(9) {
  background-color: #FF2E63;
  -webkit-animation-delay: 0.9s;
          animation-delay: 0.9s;
}

.box:nth-child(10) {
  background-color: #08D9D6;
  -webkit-animation-delay: 1s;
          animation-delay: 1s;
}

@-webkit-keyframes change {
  0% {
    -webkit-transform: translateY(0px) rotate(0deg);
            transform: translateY(0px) rotate(0deg);
    border-radius: 0%;
  }
  50% {
    -webkit-transform: translateY(150px) rotate(180deg);
            transform: translateY(150px) rotate(180deg);
    border-radius: 50%;
  }
  100% {
    -webkit-transform: translateY(0px) rotate(360deg);
            transform: translateY(0px) rotate(360deg);
    border-radius: 0%;
  }
}

@keyframes change {
  0% {
    -webkit-transform: translateY(0px) rotate(0deg);
            transform: translateY(0px) rotate(0deg);
    border-radius: 0%;
  }
  50% {
    -webkit-transform: translateY(150px) rotate(180deg);
            transform: translateY(150px) rotate(180deg);
    border-radius: 50%;
  }
  100% {
    -webkit-transform: translateY(0px) rotate(360deg);
            transform: translateY(0px) rotate(360deg);
    border-radius: 0%;
  }
}
</style>
