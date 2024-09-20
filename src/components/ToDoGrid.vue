<template>
  <section class="to-do-grid">
    <table v-if="todoItems.length" class="to-do-table">
      <thead>
        <tr>
          <th
            v-for="c in tableConfig"
            :key="c.id"
            @click="() => headerClick(c)"
          >
            {{ c.label }}
            <template v-if="c.sort">
              <i
                class="icon fa-solid"
                :class="[c.sortOrder === 'asc' ? 'fa-sort-up' : 'fa-sort-down']"
              ></i>
            </template>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in todoItems" :key="item.id">
          <td v-for="c in tableConfig" :key="c.id">
            <template v-if="c.id === 'actions'">
              <div class="item-actions">
                <i
                  class="icon edit fa-solid fa-pen-to-square"
                  title="Edit"
                  @click="() => editTodo(item)"
                />
                <i
                  class="icon delete fa-solid fa-trash-can"
                  title="Delete"
                  @click="() => removeTodo(item)"
                />
              </div>
            </template>
            <template v-else-if="c.id === 'created'">
              {{ new Date(item.id).toDateString() }}
            </template>
            <template v-else>
              {{ item[c.id] }}
            </template>
          </td>
        </tr>
      </tbody>
    </table>
    <span v-else
      >No ToDo list to display, please add new items using Create button.</span
    >
  </section>
</template>

<script>
import { itemPriority, gridConfig } from "./utils";
export default {
  props: {
    todoItems: {
      type: Array,
      required: true,
    },
    tableConfig: {
      type: Array,
      required: true,
    },
  },
  methods: {
    getPriorityLabel(prioId) {
      return itemPriority.find((i) => i.id === prioId)?.label ?? "";
    },
    removeTodo(item) {
      this.$emit("remove-item", item.id);
    },
    editTodo(item) {
      this.$emit("edit-rec", item);
    },
    headerClick(c) {
      if (c.sort) {
        this.$emit("sort-update", c.id);
      }
    },
  },
};
</script>

<style scoped>
.to-do-grid {
  margin-top: 1rem;
  .to-do-table {
    border-collapse: collapse;
    td,
    th {
      border: 1px solid grey;
      padding: 0.5rem;
      cursor: pointer;
    }
    tr th:nth-child(2) {
      width: 10rem;
    }
    tr th:nth-child(3) {
      width: 15rem;
    }
    .icon {
      margin: 0 0.5rem;
      cursor: pointer;
    }
  }
}
</style>
