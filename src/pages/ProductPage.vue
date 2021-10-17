<template>
  <main v-if="productLoading" class="content container content-loading">
    <Preloader/>
    <!-- <div class="wrapper">
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
    </div> -->
  </main>
  <main v-else-if="!productData" class="content container">
    <div class="content">
      <p class="trip-events__msg">Не удалось загрузить товар</p>
    </div>
  </main>
  <main v-else class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <!-- <a class="breadcrumbs__link" href="#" @click.prevent="goToPage('main')"> Каталог </a> -->
          <router-link class="breadcrumbs__link" :to="{ name: 'main' }">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <!-- <a class="breadcrumbs__link" href="#" @click.prevent="goToPage('main')"> {{category.title}} </a> -->
          <router-link class="breadcrumbs__link" :to="{ name: 'main' }">
            {{ category.title }}
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link"> {{ product.title }} </a>
        </li>
      </ul>
    </div>

    <section class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img
            width="570"
            height="570"
            :src="product.image.file.url"
            alt="product.title"
          />
        </div>
        <!-- <ul class="pics__list">
          <li class="pics__item">
            <a href="" class="pics__link pics__link--current">
              <img
                width="98"
                height="98"
                src="img/phone-square-1.jpg"
                srcset="img/phone-square-1@2x.jpg 2x"
                alt="Название товара"
              />
            </a>
          </li>
          <li class="pics__item">
            <a href="" class="pics__link">
              <img
                width="98"
                height="98"
                src="img/phone-square-2.jpg"
                srcset="img/phone-square-2@2x.jpg 2x"
                alt="Название товара"
              />
            </a>
          </li>
          <li class="pics__item">
            <a href="" class="pics__link">
              <img
                width="98"
                height="98"
                src="img/phone-square-3.jpg"
                srcset="img/phone-square-3@2x.jpg 2x"
                alt="Название товара"
              />
            </a>
          </li>
          <li class="pics__item">
            <a class="pics__link" href="#">
              <img
                width="98"
                height="98"
                src="img/phone-square-4.jpg"
                srcset="img/phone-square-4@2x.jpg 2x"
                alt="Название товара"
              />
            </a>
          </li>
        </ul> -->
      </div>

      <div class="item__info">
        <span class="item__code">Артикул: {{ product.id }}</span>
        <h2 class="item__title">{{ product.title }}</h2>
        <div class="item__form">
          <form
            class="form"
            action="#"
            method="POST"
            @submit.prevent="addToCard"
          >
            <b class="item__price"> {{ product.price | numberFormat }} ₽ </b>

            <fieldset class="form__block">
              <legend class="form__legend">Цвет:</legend>
              <ul class="colors">
                <li
                  class="colors__item"
                  v-for="color in product.colors"
                  :key="color.id"
                >
                  <label class="colors__label">
                    <input
                      class="colors__radio sr-only"
                      type="radio"
                      name="color-item"
                      :value="color.title"
                      checked=""
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
              <legend class="form__legend">Объемб в ГБ:</legend>

              <ul class="sizes sizes--primery">
                <li class="sizes__item">
                  <label class="sizes__label">
                    <input
                      class="sizes__radio sr-only"
                      type="radio"
                      name="sizes-item"
                      value="32"
                    />
                    <span class="sizes__value"> 32gb </span>
                  </label>
                </li>
                <li class="sizes__item">
                  <label class="sizes__label">
                    <input
                      class="sizes__radio sr-only"
                      type="radio"
                      name="sizes-item"
                      value="64"
                    />
                    <span class="sizes__value"> 64gb </span>
                  </label>
                </li>
                <li class="sizes__item">
                  <label class="sizes__label">
                    <input
                      class="sizes__radio sr-only"
                      type="radio"
                      name="sizes-item"
                      value="128"
                      checked=""
                    />
                    <span class="sizes__value"> 128gb </span>
                  </label>
                </li>
              </ul>
            </fieldset>

            <div class="item__row">
              <div class="form__counter">
                <button
                  type="button"
                  @click="decAmount"
                  aria-label="Убрать один товар"
                >
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-minus"></use>
                  </svg>
                </button>

                <input
                  type="text"
                  v-model.number="productAmount"
                  name="count"
                />

                <button
                  type="button"
                  aria-label="Добавить один товар"
                  @click="incAmount"
                >
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-plus"></use>
                  </svg>
                </button>
              </div>

              <button
                class="button button--primery"
                type="submit"
                :disabled="productAddSending"
              >
                В корзину
              </button>
            </div>
            <p class="card-message" v-if="productAdded">товар добавлен в корзину</p>
            <p class="card-message" v-if="productAddSending">добавляем товар в корзину...</p>
          </form>
        </div>
      </div>

      <div class="item__desc">
        <ul class="tabs">
          <li class="tabs__item">
            <a class="tabs__link tabs__link--current"> Описание </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#"> Характеристики </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#"> Гарантия </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#"> Оплата и доставка </a>
          </li>
        </ul>

        <div class="item__content">
          <p>
            Навигация GPS, ГЛОНАСС, BEIDOU Galileo и QZSS<br />
            Синхронизация со смартфоном<br />
            Связь по Bluetooth Smart, ANT+ и Wi-Fi<br />
            Поддержка сторонних приложений<br />
          </p>

          <a href="#"> Все характеристики </a>

          <h3>Что это?</h3>

          <p>
            Wahoo ELEMNT BOLT GPS – это велокомпьютер, который позволяет
            оптимизировать свои велотренировки, сделав их максимально
            эффективными. Wahoo ELEMNT BOLT GPS синхронизируется с датчиками по
            ANT+, объединяя полученную с них информацию. Данные отображаются на
            дисплее, а также сохраняются на смартфоне. При этом на мобильное
            устройство можно установить как фирменное приложение, так и
            различные приложения сторонних разработчиков. Велокомпьютер точно
            отслеживает местоположение, принимая сигнал с целого комплекса
            спутников. Эта информация позволяет смотреть уже преодоленные
            маршруты и планировать новые велопрогулки.
          </p>

          <h3>Дизайн</h3>

          <p>
            Велокомпьютер Wahoo ELEMNT BOLT очень компактный. Размеры устройства
            составляют всего 74,6 x 47,3 x 22,1 мм. что не превышает габариты
            смартфона. Корпус гаджета выполнен из черного пластика. На
            обращенной к пользователю стороне расположен дисплей диагональю 56
            мм. На дисплей выводятся координаты и скорость, а также полученная
            со смартфона и синхронизированных датчиков информация:
            интенсивность, скорость вращения педалей, пульс и т.д. (датчики не
            входят в комплект поставки). Корпус велокомпьютера имеет степень
            защиты от влаги IPX7. Это означает, что устройство не боится пыли, а
            также выдерживает кратковременное (до 30 минут) погружение в воду на
            глубину не более 1 метра.
          </p>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
// import products from '@/data/products.js';
// import {categories} from '../data/categories.js';
import Preloader from "@/components/Preloader";
import goToPage from "@/helpers/goToPage.js";
import { numberFormat } from "../helpers/utils.js";
import { API_URL } from "@/config";
import {mapActions} from 'vuex';
import axios from 'axios';

export default {
  components: { Preloader },
  data() {
    return {
      productAmount: 1,
      productAdded: false,
      productAddSending: false,
      productData: null,
      productLoading: false,
      productLoadingError: false,
    };
  },
  computed: {
    product() {
      //return products.find((product) => product.id === +this.$route.params.id)
      return this.productData;
    },
    category() {
      //return categories.find((category) => category.id === this.product.categoryId)
      return this.productData.category;
    },
  },
  methods: {
    ...mapActions(['addProductToCard']),
    goToPage,
    addToCard() {
      this.productAdded = false;
      this.productAddSending = true;
      this.addProductToCard({
        productId: this.product.id,
        amount: this.productAmount,
      })
      .then(() => {
        setTimeout(() => {
          this.productAdded = true;
          this.productAddSending = false;
          setTimeout(() => this.productAdded = false, 2000)
        }, 2000)
      })
      //this.$store.dispatch("addProductToCard", {
        //productId: this.product.id,
        //amount: this.productAmount,
      //});
      this.productAmount = 1;
    },
    incAmount() {
      this.productAmount++;
    },
    decAmount() {
      if (this.productAmount > 1) {
        this.productAmount--;
      }
    },
    // toCardMessage() {
    //   setTimeout(() => (this.productAdded = false), 3000);
    // },
    loadProduct() {
      this.productLoading = true;
      this.productLoadingError = false;
      axios.get(`${API_URL}/api/products/${this.$route.params.id}`)
        .then((response) => (this.productData = response.data))
        .catch(() => (this.productLoadingError = true))
        .finally(() => (this.productLoading = false));
      // fetch(`${API_URL}/api/products/${this.$route.params.id}`)
      //   .then((response) => response.json())
      //   .then((data) => (this.productData = data))
      //   .catch(() => (this.productLoadingError = true))
      //   .finally(() => (this.productLoading = false));
    },
  },
  filters: {
    numberFormat,
  },
  // created() {
  //   this.loadProduct();
  // },
  watch: {
    '$route.params.id': {
      handler() {
        this.loadProduct();
      },
      immediate: true
    }
  }
};
</script>

<style scoped>
.content {
  min-height: 43vh;
  padding-bottom: 0;
}
.colors {
  background-color: transparent;
}
.card-message {
  width: 83%;
  background-color: #9eff00;
  color: #222;
  font-family: "PressStart";
  font-size: 13px;
  white-space: nowrap;
  padding: 15px 20px;
}
</style>
>
