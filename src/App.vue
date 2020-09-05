<template>
  <component :is="currentPageComponent" :page-params="currentPageParams"/>
</template>

<script>
import MainPage from './pages/MainPage';
import ProductPage from './pages/ProductPage';
import NotFoundPage from './pages/NotFoundPage';
import eventBus from '@/eventBus';

const routes = {
  main: 'MainPage',
  product: 'ProductPage'
};

export default {
  data() {
    return {
      currentPage: 'main',
      currentPageParams: {

      }
    }
  },
  methods: {
    goToPage(pageName, pageParam = {}) {
      this.currentPage = pageName;
      this.currentPageParams = pageParam
    }
  },
  computed: {
    currentPageComponent() {
      return routes[this.currentPage] || 'NotFoundPage';
    }
  },
  components: {MainPage, ProductPage, NotFoundPage},
  created() {
    eventBus.$on('goToPage', (pageName, pageParam) => this.goToPage(pageName, pageParam))
  }
}
</script>

