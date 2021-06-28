<template>
  <div class="popup-overlay" @click="closePopup">
    <div class="popup-wrapper" @click.stop="">
      <div class="header-wrapper">
        <h2>All Categories</h2>
      </div>
      <div class="content-wrapper">
        <div class="category" v-for="(cat, index) in categories" :key="index">
          {{ cat }}
          <span @click="() => deleteCategory(index)" class="remove">+</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories: "",
    };
  },
  methods: {
    deleteCategory(index) {
      this.$store.commit("DELETE_CATEGORY", index);
    },
    closePopup(){
        this.$emit('closePopup');
    }
  },
  mounted() {
    this.categories = this.$store.state.categories;
  },
};
</script>

<style scoped>
.popup-overlay {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
}
.popup-wrapper {
  width: 70%;
  max-width: 500px;
  padding: 30px;
  padding-top: 20px;
  background: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 35px;
}
h2 {
  margin: 0;
  margin-bottom: 20px;
}
.content-wrapper {
  display: flex;
  flex-direction: column;
}
.content-wrapper div {
  padding: 10px 0;
  border-bottom: 1px solid #a9a9a9;
  position: relative;
}
.content-wrapper div:last-of-type {
  border-bottom: none;
}
.remove {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%) rotate(45deg);
  font-size: 20px;
  padding: 5px;
}
</style>