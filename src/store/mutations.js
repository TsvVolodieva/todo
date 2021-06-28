const mutations = {
  ADD_NOTE(state, value) {
    state.allNotes = [...state.allNotes, value];
  },
  UPDATE_NOTES(state, val) {
    console.log(val);
    state.allNotes.splice(val.noteId, 1);
    state.allNotes = [val, ...state.allNotes];
  },
  DELETE_NOTE(state, id) {
    state.allNotes.splice(id, 1);
  },
  ADD_CATEGORY(state, val) {
    state.categories = [...state.categories, val];
  },
  UPDATE_CATEGORIES(state, val) {
    const newCategories = state.categories.filter((cat) => {
      if (cat == val.category) {
        return state.categories;
      }
    });
    if (newCategories.length == 0) {
      state.categories = [...state.categories, val.category];
    }
  },
  DELETE_CATEGORY(state, index) {
    state.categories.splice(index, 1);
  },
};
export default mutations;
