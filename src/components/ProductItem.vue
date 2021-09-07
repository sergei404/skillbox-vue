<template>
  <li class="catalog__item">
    <router-link class="catalog__pic"
      :to="{name: 'product', params: {id: product.id}}">
        <img :src="product.image" :alt="product.title" />
      </router-link>
    <h3 class="catalog__title">
      <a href="#"> {{ product.title }}</a>
    </h3>
    <span class="catalog__price"> {{ product.price }} ₽ </span>

    <ul class="colors colors--black">
      <li class="colors__item" v-for="color in product.colors" :key="color">
        <label class="colors__label">
          <input
            class="colors__radio sr-only"
            type="radio"
            name="color"
            :value="color"
          />
          <span
            class="colors__value"
            v-bind:style="{ background: color }"
          ></span>
        </label>
      </li>
    </ul>
  </li>
</template>

<script>
import goToPage from '@/helpers/goToPage.js'

export default {
  props: ["product"],
  methods: {
    goToPage
  }
};
</script>

<style>
.colors {
  background-color: rgba(235, 232, 228, 0.3);
}
</style>
