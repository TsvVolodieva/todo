<template>
  <div>
    <div class="toolbar">
      <h1 class="app-heading">To Do</h1>
      <div>
        <button class="add-btn" @click="addBtnFn">Add</button>
        <button class="add-btn cat-btn" @click="editCategories">
          Categories
        </button>
        <button class="add-btn search-btn" @click="openSearch">Search</button>
      </div>
    </div>
    <div class="search-bar" v-if="showSearch">
      <input v-model="searchInput" type="text" />
      <button @click="findEqual" style="margin-left: 5px">Find</button>
      <span class="close-search" @click="showSearch=false">+</span>
    </div>
    <categories @selectCategory="selectCategory"></categories>
    <div v-if="filteredNotes.length == 0" class="notes-wrapper">
      <p v-if="massage">There is no notes from selected category.</p>
      <div class="note-row" v-for="(note, index) in allNotes" :key="index">
        <h2>{{ note.title }}</h2>
        <button @click="() => openSavedNote(note, index)">Edit</button>
        <button @click="() => deleteNote(index)">Delete</button>
      </div>
    </div>
    <div v-if="filteredNotes.length > 0" class="notes-wrapper">
      <div class="note-row" v-for="(note, index) in filteredNotes" :key="index">
        <h2>{{ note.title }}</h2>
        <button @click="() => openSavedNote(note, index)">Edit</button>
        <button @click="() => deleteNote(index)">Delete</button>
      </div>
    </div>
    <pop-up
      v-if="showPopup"
      @showNote="addNote"
      :selectedNote="{ ...selectedNote }"
      :clearInputs="clearInputs"
      :newNote="newNote"
      @updateNote="updateNote"
      @closePopup="closeCatPopup"
    ></pop-up>
    <cat-pop-up v-if="categoryPopup" @closePopup="closeCatPopup"></cat-pop-up>
  </div>
</template>

<script>
import Popup from "./Popup.vue";
import Categories from "./Categories.vue";
import CategoryPopup from "./CategoryPopup.vue";
export default {
  name: "HelloWorld",
  components: {
    popUp: Popup,
    categories: Categories,
    catPopUp: CategoryPopup,
  },
  data() {
    return {
      showPopup: false,
      category: "",
      title: "",
      text: "",
      allNotes1: [],
      filteredNotes: [],
      selectedNote: null,
      noteIndex: -1,
      clearInputs: false,
      newNote: false,
      massage: false,
      categoryPopup: false,
      showSearch: false,
      searchInput: "",
    };
  },
  methods: {
    // отваряне на празен попъп
    addBtnFn() {
      this.showPopup = !this.showPopup;
      this.clearInputs = true;
      this.newNote = true;
    },
    // добавяне на новата бележка към списъка
    addNote(note) {
      this.noteIndex++;
      note = { ...note, noteId: this.noteIndex };
      this.$store.commit("ADD_NOTE", note);
      // this.allNotes.push(note);
      this.showPopup = false;
      this.clearInputs = false;
    },
    // отваряне на бележка от списъка
    openSavedNote(note) {
      this.newNote = false;
      this.showPopup = true;
      this.clearInputs = false;
      this.selectedNote = {
        category: note.category,
        title: note.title,
        content: note.content,
        noteId: note.noteId,
        existingNote: true,
      };
    },
    // запазване на промените
    updateNote(val) {
      console.log(val);
      this.$store.commit("UPDATE_NOTES", val);
      this.$store.commit("UPDATE_CATEGORIES", val);
      this.showPopup = false;
      this.clearInputs = true;
    },
    // изтриване на бележка
    deleteNote(index) {
      this.$store.commit("DELETE_NOTE", index);
    },
    // филтриране на бележките според категорията им
    selectCategory(val) {
      this.filteredNotes = [];
      this.massage = false;
      if (val != "All") {
        this.allNotes.filter((el) => {
          if (el.category == val) {
            this.massage = false;
            this.filteredNotes.push(el);
          } else {
            this.massage = true;
          }
        });
      }
    },
    // промяна на списъка с категории
    editCategories() {
      this.categoryPopup = true;
    },
    // затваряне на попъп с категории
    closeCatPopup() {
      this.categoryPopup = false;
      this.showPopup = false;
    },
    // показване на търсачка
    openSearch() {
      this.showSearch = true;
    },
    findEqual() {
      this.filteredNotes = [];
      this.allNotes.find((el) => {
        if (el.title.includes(this.searchInput)) {
          this.filteredNotes = [...this.filteredNotes, el];
          this.filteredNotes = this.filteredNotes.slice(0, 1);
        }
      });
    },
  },
  computed: {
    allNotes() {
      return this.$store.state.allNotes;
    },
  },
  watch: {
    searchInput(val) {
      this.filteredNotes = [];
      this.allNotes.filter((el) => {
        if (el.title.includes(val)) {
          this.filteredNotes = [...this.filteredNotes, el];
        }
      });
      console.log(this.filteredNotes);
      return this.filteredNotes;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.toolbar {
  width: calc(100% - 60px);
  height: 70px;
  padding: 10px 30px;
  background: #26abff;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.app-heading {
  color: white;
  margin: 0;
}
.add-btn {
  font-size: 20px;
  text-transform: uppercase;
  padding: 5px 15px;
  border-radius: 10px;
  cursor: pointer;
}
.cat-btn,
.search-btn {
  margin-left: 20px;
}
.notes-wrapper {
  padding: 45px 30px;
  width: 75%;
  margin: 0 auto;
}
.note-row {
  width: 100%;
  margin: 15px 0;
  border: 3px solid #d1c6c6;
  border-radius: 10px;
  padding: 5px;
}
.search-bar {
  padding: 20px 30px;
  border-bottom: 1px solid #a9a9a9;
}
.close-search {
  transform: rotate(45deg);
  position: absolute;
  top: 105px;
  right: 30px;
  font-size: 30px;
}
</style>
