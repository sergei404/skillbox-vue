<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="index.html">
            Каталог
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="cart.html">
            Корзина
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        {{products.length}} товара
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST" @submit.prevent="order">
        <div class="cart__field">
          <div class="cart__data">
            <BaseFormText 
              title="ФИО" 
              placeholder="Введите ваше полное имя"
              v-model="formData.name"
              :error="formError.name"
            />

            <BaseFormText 
              title="Адрес доставки" 
              placeholder="Введите ваш адрес"
              v-model="formData.address"
              :error="formError.address"
            />

            <BaseFormText 
              title="Телефон" 
              placeholder="Введите ваш телефон"
              v-model="formData.phone"
              :error="formError.phone"
              type="tel"
            />

            <BaseFormText 
              title="Email" 
              placeholder="Введи ваш Email"
              v-model="formData.email"
              :error="formError.email"
              type="email"
            />

            <BaseFormTextarea
              title="Комментарий к заказу"
              :error="formError.comment"
              v-model="formData.comment"
              placeholder="Ваши пожелания"
            />
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="0" checked="">
                  <span class="options__value">
                    Самовывоз <b>бесплатно</b>
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="500">
                  <span class="options__value">
                    Курьером <b>500 ₽</b>
                  </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="card">
                  <span class="options__value">
                    Картой при получении
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="cash">
                  <span class="options__value">
                    Наличными при получении
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <li class="cart__order" v-for="item in products" :key="item.productId">
              <h3>{{item.product.title}}</h3>
              <b>{{item.product.price}} ₽</b>
              <span>Артикул: {{item.productId}}</span>
            </li>
            <!-- <li class="cart__order">
              <h3>Смартфон Xiaomi Redmi Note 7 Pro 6/128GB</h3>
              <b>18 990 ₽</b>
              <span>Артикул: 150030</span>
            </li>
            <li class="cart__order">
              <h3>Гироскутер Razor Hovertrax 2.0ii</h3>
              <b>4 990 ₽</b>
              <span>Артикул: 150030</span>
            </li>
            <li class="cart__order">
              <h3>Электрический дрифт-карт Razor Lil’ Crazy</h3>
              <b>8 990 ₽</b>
              <span>Артикул: 150030</span>
            </li> -->
          </ul>
          
          <div class="cart__total">
            <p>Доставка: <b>500 ₽</b></p>
            <p>Итого: <b>{{products.length}}</b> товара на сумму <b>{{totalPrice | numberFormat}} ₽</b></p>
          </div>

          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
        </div>
        <div 
        class="cart__error form__error-block"
        v-if="formErrorMessage"
        >
          <h4>Заявка не отправлена!</h4>
          <p>
            Похоже произошла ошибка. Попробуйте отправить снова или перезагрузите страницу.
          </p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import BaseFormText from '../components/BaseFormText.vue'
import BaseFormTextarea from '../components/BaseFormTextarea.vue'
import axios from 'axios'
import { API_URL } from "@/config";
import {mapGetters} from 'vuex'
import {numberFormat} from '../helpers/utils.js'

export default {
  filters: {
    numberFormat
  },
  components: {BaseFormText, BaseFormTextarea},
  data() {
    return {
      formData: {},
      formError: {},
      formErrorMessage: ''
    }
  },
  methods: {
    order() {
      this.formError = {}
      this.formErrorMessage = ''
      axios.post(`${API_URL}/api/orders`, {
        ...this.formData
      },
      {
        params: {
          userAccessKey: this.$store.state.userAccessKey
        },
      })
      .then((res) => {
        this.$store.commit('resetCard')
        this.$store.commit('updateOrderInfo', res.data)
        this.$router.push({name: 'orderInfo', params: {
          id: res.data.id
        }})
      })
      .catch(error => {
        this.formError = error.response.data.error.request || {}
        this.formErrorMessage = error.response.data.error.message
      })
    }
  },
  computed: {
    ...mapGetters({products: 'cardDetailProduct', totalPrice: 'cardTotalPrice'}),
  }
};
</script>
