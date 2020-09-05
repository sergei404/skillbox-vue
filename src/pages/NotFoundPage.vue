<template>
  <div class="content">
    <p class="trip-events__msg">Страница не найдена</p>
  </div>
</template>

<script>
export default {
  
}
</script>

<style scoped>
  .content {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f8f0f0;
    height: calc(100vh - 400px);
  }
  .trip-events__msg {
    font-weight: 500;
    font-size: 44px;
    line-height: 60px;
    color: #eee5e5;
    opacity: 0.89; 
  }
</style>