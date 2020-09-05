<template>
  <li class="catalog__item">
      <a class="catalog__pic" href="#" @click.prevent="goToPage('product', {id: product.id})">
        <img :src="product.image" :alt="product.title">
      </a>

      <h3 class="catalog__title">
        <a href="#">{{product.title}}</a>
      </h3>

      <span class="catalog__price">{{product.price | numberFormat}} &#x20bd;</span>

      <ul class="colors colors--black">
        <li class="colors__item" v-for="color in product.colors" :key="color">
          <label class="colors__label">
            <input class="colors__radio sr-only" type="radio" value="color" >
            <span class="colors__value" v-bind:style="{background: color}"></span>
          </label>
        </li>
      </ul>
    </li>
</template>

<script>
  import goToPage from '@/helpers/goToPage.js'
  import {numberFormat} from '../helpers/utils.js'

export default {
  props: ['product'],
  filters: {
    numberFormat
  },
  methods: {
    goToPage
  }
}
</script>

<style scoped>
  .catalog__item{
    background-color: #f7f7f7;
  }
  .catalog__price,
  .catalog__title,
  .colors {
    padding: 0 10px;
  }
  .colors {
    padding-bottom: 10px;
  }
</style>