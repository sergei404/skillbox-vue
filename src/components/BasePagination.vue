<template>
  <ul class="catalog__pagination pagination">
    <li class="pagination__item">
      <a
        href="#"
        class="pagination__link pagination__link--arrow"
        :class="{ 'pagination__link--disabled': page === 1 }"
        aria-label="Предыдущая страница"
        @click.prevent="paginate(--page)"
      >
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-left"></use>
        </svg>
      </a>
    </li>
    <li class="pagination__item" v-for="pageNum in pages" :key="pageNum">
      <a
        href="#"
        class="pagination__link"
        :class="{ 'pagination__link--current': pageNum === page }"
        @click.prevent="paginate(pageNum, pageNum)"
      >
        {{ pageNum }}
      </a>
    </li>
    <li class="pagination__item">
      <a
        href="#"
        class="pagination__link pagination__link--arrow"
        :class="{ 'pagination__link--disabled': page === pages }"
        aria-label="Следующая страница"
        @click.prevent="paginate(++page)"
      >
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-right"></use>
        </svg>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  model: {
    prop: "page",
    event: "paginate",
  },
  props: ["page", "count", "perPage"],
  computed: {
    pages() {
      return Math.ceil(this.count / this.perPage);
    },
  },
  methods: {
    paginate(page) {
      this.$emit("paginate", page);
    },
  },
};
</script>

<style>
.pagination__link--disabled {
  position: relative;
  z-index: -1;
}

.pagination__link--current {
  background-color: rgb(226, 222, 218);
  border-radius: 10%;
}
</style>
