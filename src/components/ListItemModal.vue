<template>
  <div id="custom-modal" class="custom-modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <header class="modal-header">
            <div class="title">
              {{ item.id ? "Update List Item" : "Create New Item" }}
            </div>
            <i class="close-icon fa-solid fa-xmark" @click="close"></i>
          </header>

          <section class="modal-body">
            <div class="item-desc-container">
              <span class="title">Item Description:</span>
              <app-text-box
                class="item-desc"
                :text="desc"
                @change="editItemDesc"
              />
            </div>
            <div class="priority-seletion">
              <span class="title">Priority:</span>
              <app-drop-down
                class="opt-down"
                :label="priorityLabel"
                :options="priorityOpts"
                :show-dot="true"
                @opt-selected="prioritySelection"
              />
            </div>
          </section>

          <footer class="modal-footer">
            <app-button
              class="btn close-button"
              :btn-label="'Cancel'"
              :label-color="'#3d4689'"
              :border-color="'#c7cbd6'"
              :primary-btn="false"
              :font-weight="600"
              @click="close"
            />
            <app-button
              :btn-label="item.id ? 'Update' : 'Save'"
              class="btn save-button"
              :primary-btn="false"
              :label-color="'#ffffff'"
              :border-color="'#151b42'"
              :bg-color="'#3d4689'"
              :font-weight="600"
              @click="saveItem"
            />
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { AppButton, AppTextBox, AppDropDown } from "./app-comps";
import { itemPriority } from "./utils";
export default {
  components: {
    "app-button": AppButton,
    "app-text-box": AppTextBox,
    "app-drop-down": AppDropDown,
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      id: this.item.id ?? new Date().getTime(),
      desc: this.item.desc ?? "",
      priority: this.item.priority ?? "1",
    };
  },
  computed: {
    priorityOpts() {
      return itemPriority.map((it) => ({
        ...it,
        selected: this.priority === it.id,
      }));
    },
    priorityLabel() {
      return this.priorityOpts.find((op) => op.selected)?.label ?? "";
    },
  },
  methods: {
    saveItem() {
      this.$emit("save", {
        id: this.id,
        desc: this.desc,
        priority: this.priority,
      });
      this.close();
    },
    close() {
      this.$emit("close");
    },
    editItemDesc(desc) {
      this.desc = desc;
    },
    prioritySelection(_sel, id) {
      this.priority = id;
    },
  },
};
</script>

<style scoped>
.custom-modal {
  .btn-primary {
    color: #fffff;
    background-color: #337ab7;
    border-color: #2e6da4;
    margin-right: 0.25rem;
  }
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
  }
  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }
  .modal-container {
    margin: 0 auto;
    background-color: #ffffff;
    border-radius: 0.125rem;
    box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    font-family: "Poppins", sans-serif;
    width: 30%;
  }

  .modal-header {
    margin-top: 0;
    color: #42b983;
    display: flex;
    justify-content: space-between;
    background: #f0f2f7;
    color: #404255;
    padding: 1rem;
    .close-icon {
      cursor: pointer;
    }
  }

  .modal-body {
    overflow: auto;
    padding: 0;
    height: 18rem;
    padding: 1rem;

    .item-desc-container {
      display: flex;
      align-items: center;
      .item-desc {
        margin-left: 1rem;
      }
    }
    .priority-seletion {
      display: flex;
      align-items: center;
      margin-top: 1rem;
      .opt-down {
        margin-left: 1rem;
        width: 7rem;
      }
    }
  }

  .modal-footer {
    display: flex;
    justify-content: flex-end;
    padding: 0;
    background: #f0f2f7;
    padding: 1rem;
    .btn {
      margin-left: 8px;
    }
    .button {
      margin-right: 0.5rem;
    }
    .disabled {
      cursor: unset;
      background: #dde0eb;
      border: 0.0625rem solid #c7cbd6;
      color: #6f7288;
    }
  }
  .modal-default-button {
    float: right;
  }

  .modal-enter {
    opacity: 0;
  }

  .modal-leave-active {
    opacity: 0;
  }

  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
}
</style>
