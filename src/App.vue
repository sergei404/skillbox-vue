<template>
  <MainPage v-if="currentPage === 'main'"/>
  <ProductPage v-else-if="currentPage === 'product'"/>
  <NotFoundPage v-else/>
</template>

<script>
import MainPage from './pages/MainPage';
import ProductPage from './pages/ProductPage';
import NotFoundPage from './pages/NotFoundPage';

export default {
  data() {
    return {
      currentPage: 'main'
    }
  },
  components: {MainPage, ProductPage, NotFoundPage}
}
</script>

