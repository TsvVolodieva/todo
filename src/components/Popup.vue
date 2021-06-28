<template>
  <div class="popup-overlay" @click="closePopup">
    <div class="popup-wrapper" @click.stop="">
      <div class="header-wrapper">
        <h2>Create Note</h2>
      </div>
      <div class="content-wrapper">
        <select name="categories" id="categories" v-model="noteCategory">
          <option v-for="(cat, index) in categories" :key="index" :value="cat">
            {{ cat }}
          </option>
          <option value="other">Other</option>
        </select>
        <input
          v-if="noteCategory == 'other'"
          type="text"
          v-model="newCategory"
          placeholder="New Category"
        />
        <input type="text" v-model="noteName" placeholder="Note Heading" />
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          v-model="noteContent"
          placeholder="Note Content"
        ></textarea>
        <button @click="saveNote" class="save-btn">Save</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["selectedNote", "clearInputs", "newNote"],
  data() {
    return {
      noteCategory: "",
      noteName: "",
      noteContent: "",
      noteId: 0,
      noteExist: false,
      newCategory: "",
    };
  },
  methods: {
    //  ф-ция на save бутон
    saveNote() {
      if (!this.clearInputs) {
        // промяна на бележка
        let selectedCat;
        if (this.newCategory) {
          selectedCat = this.newCategory;
        } else {
          selectedCat = this.noteCategory;
        }
        this.$emit("updateNote", {
          category: selectedCat,
          title: this.noteName,
          content: this.noteContent,
          noteId: this.noteId,
          existingNote: false,
        });
      } else {
        //   нова бележка
        let selectedCat;
        if (this.newCategory) {
          selectedCat = this.newCategory;
          this.noteCategory = this.newCategory;
          this.$store.commit("ADD_CATEGORY", selectedCat);
        } else {
          selectedCat = this.noteCategory;
        }
        this.$emit("showNote", {
          category: selectedCat,
          title: this.noteName,
          content: this.noteContent,
        });
      }
    },
    // затваряне на попъпа
    closePopup() {
      this.$emit("closePopup");
    },
  },
  computed: {
    categories() {
      return this.$store.state.categories;
    },
  },
  mounted() {
    if (this.newNote) {
      this.noteCategory = "";
      this.noteName = "";
      this.noteContent = "";
    } else {
      this.noteCategory = this.selectedNote.category;
      this.noteName = this.selectedNote.title;
      this.noteContent = this.selectedNote.content;
      this.noteExist = this.selectedNote.existingNote;
      this.noteId = this.selectedNote.noteId;
    }
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
  padding: 50px;
  padding-top: 30px;
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
input,
textarea,
select {
  border-radius: 10px;
  outline: none;
}
input,
select {
  margin-bottom: 20px;
  height: 35px;
}
textarea {
  margin-bottom: 30px;
  resize: none;
}
.save-btn {
  width: fit-content;
  margin: 0 auto;
  padding: 5px 15px;
  font-size: 20px;
  color: white;
  background: #26abff;
  border-radius: 10px;
}
</style>