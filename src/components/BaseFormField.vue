<template>
  <label class="form__label">
    <slot></slot>
    <span class="form__value">{{title}}</span>
    <span v-if="error" class="form__error">{{ error }}</span>
  </label>
</template>

<script>
export default {
  props: [
    'title',
    'error'
    ]
};
</script>
