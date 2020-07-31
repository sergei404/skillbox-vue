<template>
  <ul class="catalog__list">
    <ProductItem :product="product" v-for="product in products" :key="product.id"/>
  </ul>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import products from '../data/products';
import ProductItem from './ProductItem'

export default {
  components: {ProductItem},
  props: ['products']
}
</script>

<!-- <li class="catalog__item" v-for="(product, index) in products" :key="index">
      <a class="catalog__pic" href="#">
        <img :src="product.image" :alt="product.title" />
      </a>

      <h3 class="catalog__title">
        <a href="#">{{product.title}}</a>
      </h3>

      <span class="catalog__price">{{product.price}} &#x20bd;</span>

      <ul class="colors colors--black">
        <li class="colors__item">
          <label class="colors__label">
            <input class="colors__radio sr-only" type="radio" value="#73B6EA" v-model="color">
            <span class="colors__value" style="background-color: #73B6EA;"></span>
          </label>
        </li>
        <li class="colors__item">
          <label class="colors__label">
            <input class="colors__radio sr-only" type="radio" value="#8BE000" v-model="color">
            <span class="colors__value" style="background-color: #8BE000;"></span>
          </label>
        </li>
        <li class="colors__item">
          <label class="colors__label">
            <input class="colors__radio sr-only" type="radio" value="#222" v-model="color">
            <span class="colors__value" style="background-color: #222;"></span>
          </label>
        </li>
      </ul>
    </li> -->