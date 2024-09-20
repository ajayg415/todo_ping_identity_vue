<template>
  <div class="list-wrapper">
    <list-item-modal
      v-if="showModal"
      :item="activeItem"
      @close="closeModal"
      @save="saveItem"
    />
    <div class="action-buttons">
      <app-button
        btn-label="Add New"
        class="btn add-button"
        :primary-btn="false"
        :label-color="'#ffffff'"
        :border-color="'#151b42'"
        :bg-color="'#3d4689'"
        :font-weight="600"
        right-icon="fa-solid fa-plus"
        right-icon-color="#ffffff"
        @click="addNewItem"
      />

      <app-button
        btn-label="Clear All"
        class="btn clear-all-button"
        :primary-btn="false"
        :label-color="'#ffffff'"
        :border-color="'#151b42'"
        :bg-color="'#3d4689'"
        :font-weight="600"
        right-icon="fa-solid fa-trash-alt"
        right-icon-color="#ffffff"
        @click="deleteAllList"
      />
    </div>

    <section class="todo-container">
      <to-do-grid
        :todoItems="tableList"
        :table-config="tableConfig"
        @edit-rec="editRecord"
        @remove-item="removeItem"
        @sort-update="updateSort"
      />
    </section>
  </div>
</template>

<script>
import { AppButton } from "./app-comps";
import ListItemModal from "./ListItemModal.vue";
import ToDoGrid from "./ToDoGrid.vue";
import { gridConfig } from "./utils";
export default {
  data() {
    return {
      activeItem: {},
      showModal: false,
      todoItems: [],
      config: gridConfig,
    };
  },
  created() {
    const storedItems = sessionStorage.getItem("todoItems");
    if (storedItems) {
      this.todoItems = JSON.parse(storedItems);
    }
  },
  computed: {
    tableConfig() {
      return this.config;
    },
    tableList() {
      const { id, sortOrder } = this.config.find((c) => c.sort);
      return this.todoItems.sort((a, b) =>
        sortOrder === "asc" ? a[id] - b[id] : b[id] - a[id]
      );
    },
  },
  components: {
    "app-button": AppButton,
    "list-item-modal": ListItemModal,
    "to-do-grid": ToDoGrid,
  },
  methods: {
    addNewItem() {
      this.activeItem = {};
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    saveItem(item) {
      const items = structuredClone(this.todoItems);
      const itemIndex = items.findIndex((it) => it.id === item.id);
      if (itemIndex > -1) {
        items[itemIndex] = item;
      } else {
        items.push(item);
      }
      this.todoItems = items;
      sessionStorage.setItem("todoItems", JSON.stringify(items));
    },
    editRecord(item) {
      this.activeItem = item;
      this.showModal = true;
    },
    deleteAllList() {
      this.todoItems = [];
      sessionStorage.setItem("todoItems", JSON.stringify([]));
    },
    removeItem(itemId) {
      const items = structuredClone(this.todoItems);
      const itemIndex = items.findIndex((it) => it.id === itemId);
      items.splice(itemIndex, 1);
      this.todoItems = items;
      sessionStorage.setItem("todoItems", JSON.stringify(items));
    },
    updateSort(key) {
      this.config = this.config.map((c) => ({
        ...c,
        ...(c.id === key && {
          sortOrder: c.sortOrder === "asc" ? "desc" : "asc",
        }),
      }));
    },
  },
};
</script>

<style scoped>
.list-wrapper {
  .action-buttons {
    display: flex;
    .btn {
      margin-right: 0.8rem;
    }
  }
}
</style>
