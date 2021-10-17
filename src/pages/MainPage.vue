<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">Каталог</h1>
      <span class="content__info">
        {{ countProducts }}
      </span>
    </div>

    <div class="content__catalog">
      <ProductFilter
        :price-from.sync="filterPriceFrom"
        :price-to.sync="filterPriceTo"
        :category-id.sync="filterCategoryID"
        :color.sync="filterColorID"
      />
      <section class="catalog">

        <div v-if="productsLoadingError" class="error">
          <p>Произошла ошибка загрузки товаров...</p> 
          <button @click.prevent="loadProducts">Поробуйте перезагрузить</button>
        </div>

        <Preloader v-if="productsLoading"/>

        <!-- <div v-if="productsLoading" class="wrapper">
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
        
        <ProductList v-else :products="products" />
        <BasePagination
          v-model="page"
          :count="countProducts"
          :per-page="productPerPage"
        />
      </section>
    </div>
  </main>
</template>

<script>
// import products from "@/data/products";
import ProductList from "@/components/ProductList";
import BasePagination from "@/components/BasePagination";
import ProductFilter from "@/components/ProductFilter";
import Preloader from "@/components/Preloader";
import { API_URL } from "@/config";
import axios from 'axios';

export default {
  components: { ProductList, BasePagination, ProductFilter, Preloader },
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryID: 0,
      filterColorID: 0,
      page: 1,
      productPerPage: 6,
      productsData: null,
      productsLoading: true,
      productsLoadingError: false,
    };
  },
  computed: {
    // filteredProducts() {
    //   let filterProducts = this.productsData.items;
    //   if (this.filterPriceFrom > 0) {
    //     filterProducts = filterProducts.filter(
    //       (el) => el.price > this.filterPriceFrom
    //     );
    //   }
    //   if (this.filterPriceTo > 0) {
    //     filterProducts = filterProducts.filter(
    //       (el) => el.price < this.filterPriceTo
    //     );
    //   }
    //   if (this.filterCategoryID) {
    //     filterProducts = filterProducts.filter(
    //       (el) => el.categoryId === this.filterCategoryID
    //     );
    //   }
    //   if (this.filterColor) {
    //     filterProducts = filterProducts.filter((el) =>
    //       el.colors.includes(this.filterColor)
    //     );
    //   }
    //   console.log(filterProducts);
    //   return filterProducts;
    // },
    products() {
      // const offset = (this.page - 1) * this.productPerPage;
      // return this.filteredProducts.slice(offset, offset + this.productPerPage);
      return this.productsData
        ? this.productsData.items.map((product) => {
            return {
              ...product,
              image: product.image.file.url,
            };
          })
        : 0;
    },
    countProducts() {
      //return this.filteredProducts.length;
      return this.productsData ? this.productsData.pagination.total : 0;
    },
  },
  methods: {
    loadProducts() {
      this.productsLoading = true;
      this.productsLoadingError = false;
      clearTimeout(this.loadProductsTimer);
      this.loadProductsTimer = setTimeout(() => {
        return axios.get(`${API_URL}/api/products`,  {
          params: {
            page: this.page,
            limit: this.productPerPage,
            categoryId: this.filterCategoryID,
            minPrice: this.filterPriceFrom,
            maxPrice: this.filterPriceTo,
            colorId: this.filterColorID
          }
        })
        .then((response) => this.productsData = response.data)
        // fetch(
        //   `${API_URL}/api/products?` +
        //     new URLSearchParams({
        //       page: this.page,
        //       limit: this.productPerPage,
        //       categoryId: this.filterCategoryID,
        //       minPrice: this.filterPriceFrom,
        //       maxPrice: this.filterPriceTo,
        //       colorId: this.filterColorID
        //     })
        // )
        //   .then((response) => response.json())
        //   .then((data) => this.productsData = data)
          .catch(() => this.productsLoadingError = true)
          .finally(() => this.productsLoading = false)
      });
    },
  },
  watch: {
    page() {
      this.loadProducts();
    },
    filterPriceFrom() {
      this.loadProducts();
    },
    filterPriceTo() {
      this.loadProducts();
    },
    filterCategoryID() {
      this.loadProducts();
    },
    filterColorID() {
      this.loadProducts();
    },
  },
  created() {
    this.loadProducts();
  },
};
</script>

