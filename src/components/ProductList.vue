<template>
  <ul class="catalog__list">
    <ProductItem :product="product" v-for="product in products" :key="product.id"/>
  </ul>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import products from '@/data/products';
import ProductItem from './ProductItem'

export default {
  components: {ProductItem},
  props: ['products']
}
</script>