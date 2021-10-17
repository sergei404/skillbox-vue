<template>
  <aside class="filter">
    <h2 class="filter__title">Фильтры</h2>

    <form
      class="filter__form form"
      action="#"
      method="get"
      @submit.prevent="submit"
    >
      <fieldset class="form__block">
        <legend class="form__legend">Цена</legend>
        <label class="form__label form__label--price">
          <input
            class="form__input"
            type="text"
            name="min-price"
            value="0"
            v-model.number="currentPriceFrom"
          />
          <span class="form__value">От</span>
        </label>
        <label class="form__label form__label--price">
          <input
            class="form__input"
            type="text"
            name="max-price"
            value="12345"
            v-model.number="currentPriceTo"
          />
          <span class="form__value">До</span>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Категория</legend>
        <label class="form__label form__label--select">
          <select
            class="form__select"
            type="text"
            name="categoryy"
            v-model.number="currentCategoryId"
          >
            <option value="0" selected>Все категории</option>
            <option
              :value="category.id"
              v-for="category in categories"
              :key="category.id"
            >
              {{ category.title }}
            </option>
          </select>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Цвет</legend>
        <ul class="colors">
          <li
            class="colors__item"
            v-for="color in colors"
            :key="color.id"
          >
            <label class="colors__label">
              <input
                v-model="currentColorId"
                class="colors__radio sr-only"
                type="radio"
                name="color"
                :value="color.id"
              />
              <span
                class="colors__value"
                v-bind:style="{ background: color.code }"
              ></span>
            </label>
          </li>
        </ul>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Объемб в ГБ</legend>
        <ul class="check-list">
          <li
            class="check-list__item"
            v-for="(gigabate, index) in gigabates"
            :key="index"
          >
            <label class="check-list__label">
              <input
                class="check-list__check sr-only"
                type="checkbox"
                name="volume"
                :value="gigabate.volume"
              />
              <span class="check-list__desc">
                {{ gigabate.volume }}
                <span>({{ gigabate.amount }})</span>
              </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <button class="filter__submit button button--primery" type="submit">
        Применить
      </button>
      <button
        class="filter__reset button button--second"
        type="button"
        @click.prevent="reset()"
      >
        Сбросить
      </button>
    </form>
  </aside>
</template>

<script>
import { gigabates } from "../data/categories";
import {API_URL} from '@/config.js'
import axios from 'axios';

export default {
  data() {
    return {
      currentPriceFrom: 0,
      currentPriceTo: 0,
      currentCategoryId: 0,
      currentColorId: 0,

      categoriesData: null,
      colorsData: null
    };
  },
  props: ["priceFrom", "priceTo", "categoryId", "color"],
  computed: {
    categories() {
      return this.categoriesData ? this.categoriesData.items : [];
    },
    colors() {
      return this.colorsData ? this.colorsData.items : [];
    },
    gigabates() {
      return gigabates;
    },
  },
  watch: {
    priceFrom(value) {
      this.currentPriceFrom = value;
    },
    priceTo(value) {
      this.currentPriceTo = value;
    },
    categoryId(value) {
      this.currentCategoryId = value;
    },
    color(value) {
      this.currentColorId = value;
    },
  },
  methods: {
    submit() {
      this.$emit("update:priceFrom", this.currentPriceFrom);
      this.$emit("update:priceTo", this.currentPriceTo);
      this.$emit("update:categoryId", this.currentCategoryId);
      this.$emit("update:color", this.currentColorId);
    },
    reset() {
      this.$emit("update:priceFrom", 0);
      this.$emit("update:priceTo", 0);
      this.$emit("update:categoryId", 0);
      this.$emit("update:color", 0);
    },
    loadCategories() {
      return axios.get(`${API_URL}/api/productCategories`)
      .then((response) => this.categoriesData = response.data)
      // fetch(`${API_URL}/api/productCategories`)
      // .then((response) => response.json())
      // .then((data) => this.categoriesData = data);
    },
    loadColors() {
      return axios.get(`${API_URL}/api/colors`)
      .then((response) => this.colorsData = response.data)
      // fetch(`${API_URL}/api/colors`)
      // .then((response) => response.json())
      // .then((data) => this.colorsData = data);
    }
  },
  created() {
    this.loadCategories()
    this.loadColors()
  }
};
</script>

<style scoped>
.colors {
  background-color: transparent;
}
.form__label--select::after {
  z-index: -1;
}
</style>
>
