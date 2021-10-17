<template>
  <div>
    <Header/>
    <router-view />
    <Footer/>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import {mapActions, mapMutations} from 'vuex'

export default {
  components: {Header, Footer},
  created() {
    const userAccessKey = localStorage.getItem('userAccessKey');
    if (userAccessKey) {
      this.updateUserAccessKey(userAccessKey)
    }

    this.loadCard();
  },
  methods: {
    ...mapActions(['loadCard']),
    ...mapMutations(['updateUserAccessKey'])
  }
};
</script>

<style>
body {
  min-height: auto;
}

.content-not-faund {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f8f0f0;
    /* height: calc(100vh - 400px); */
  }
  .trip-events__msg {
    font-weight: 500;
    font-size: 44px;
    line-height: 60px;
    color: #eee5e5;
    opacity: 0.89; 
    text-align: center;
  }
</style>

