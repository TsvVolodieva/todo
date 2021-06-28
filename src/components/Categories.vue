<template>
  <div class="categories-wrapper">
    <button class="all-btn All" @click="() => selectCategory('All')">
      All
    </button>
    <button
      v-for="(cat, index) in categories"
      :key="index"
      class="all-btn"
      :class="cat"
      @click="() => selectCategory(cat)"
    >
      {{ cat }}
    </button>
  </div>
</template> 
<script>
export default {
  data() {
    return {};
  },
  methods: {
    selectCategory(val) {
      this.$emit("selectCategory", val);
    },
  },
  computed: {
    categories() {
      return this.$store.state.categories;
    },
  },
};
</script>

<style scoped>
.categories-wrapper {
  width: 100%;
}
button {
  padding: 10px 20px;
  margin: 10px;
  font-size: 16px;
  text-transform: uppercase;
  letter-spacing: 1px;
  border-radius: 5px;
  font-weight: 600;
  color: white;
  border-color: white;
}
.all-btn {
  background: #4d96fb;
}
.All {
  background: #cfe6f5;
}
.Home {
  background: #b1ddf9;
}
.Office {
  background: #98ceff;
}
.Shopping {
  background: #70baff;
}
.Todo {
  background: #53aff4;
}
</style>
