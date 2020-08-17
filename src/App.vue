<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info">
        {{filteredProducts.length}}
      </span>
    </div>

    <div class="content__catalog">
      <ProductFilter :price-from.sync="filterPriceFrom" :price-to.sync="filterPriceTo" :category-id.sync="filterCategoryID" :color.sync="filterColor"/> 
      <section class="catalog">
      <ProductList :products="products"/>
      <BasePagination v-model="page" :count="countProducts" :per-page="productPerPage"/>
    </section>
    </div>
    
  </main>
</template>

<script>
import products from './data/products';
import ProductList from './components/ProductList';
import BasePagination from './components/BasePagination';
import ProductFilter from './components/ProductFilter'

export default {
  name: "App",
  components: {ProductList, BasePagination, ProductFilter},
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryID: 0,
      filterColor: '',
      page: 1,
      productPerPage: 3,
    }
  },
  computed: {
    filteredProducts() {
      let filterProducts = products;
      if(this.filterPriceFrom > 0) {
        filterProducts = filterProducts.filter((el) => el.price > this.filterPriceFrom);
      }
      if(this.filterPriceTo > 0) {
        filterProducts = filterProducts.filter((el) => el.price < this.filterPriceTo);
      }
      if(this.filterCategoryID) {
        filterProducts = filterProducts.filter((el) => el.categoryId === this.filterCategoryID);
      }
      if(this.filterColor) {
        filterProducts = filterProducts.filter((el) => el.colors.includes(this.filterColor)); 
      }
      return filterProducts;
    },
    products() {
      const offset = (this.page - 1) * this.productPerPage;
      return this.filteredProducts.slice(offset, offset + this.productPerPage);
    },
    countProducts() {
      return this.filteredProducts.length;
    }
  }
};
</script>

