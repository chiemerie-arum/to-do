<template>
  <div class="accordion">
    <slot></slot>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  props: {},
  data() {
    return {
      Accordion: {
        count: 0,
        active: null
      }
    };
  },
  provide() {
    return { Accordion: this.Accordion };
  }
};
</script>

<style lang="scss" scoped>
.accordion {
  &__item:last-child {
    border-bottom: none;
  }
}
</style>
