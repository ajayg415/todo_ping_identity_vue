<template>
  <div v-on-clickaway="away" class="multi-select-dropdown">
    <div class="dd-el" @click="toggleDd">
      <span class="selection">{{ label }}</span>
      <i
        class="dd-icon fa-solid"
        :class="isOpen ? 'fa-caret-up' : 'fa-caret-down'"
      />
    </div>
    <div v-show="isOpen" class="dd-box">
      <div class="filter-list">
        <div
          v-for="opt in options"
          :key="opt.id"
          class="filter-item"
          :class="{ active: opt.selected }"
        >
          <app-radio-button
            :id="opt.id"
            :selected="opt.selected"
            :show-radio="showRadio"
            :show-dot="showDot"
            @opt-click="optClicked"
          >
            <template #label>
              <div class="opt-label">
                {{ opt.label }}
              </div>
            </template>
          </app-radio-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mixin as clickaway } from "vue-clickaway2";

import AppRadioButton from "./AppRadioButton.vue";

export default {
  components: {
    "app-radio-button": AppRadioButton,
  },
  mixins: [clickaway],
  props: {
    label: {
      type: String,
      default: "Select",
    },
    options: {
      type: Array,
      required: true,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    showRadio: {
      type: Boolean,
      default: false,
    },
    showDot: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    away() {
      this.isOpen = false;
    },
    toggleDd() {
      this.isOpen = !this.isOpen;
    },
    optClicked(sel, id) {
      this.$emit("opt-selected", sel, id);
      if (!this.multiple) {
        this.away();
      }
    },
    checkComp() {
      return this.multiple ? "app-check-box" : "app-radio-button";
    },
  },
};
</script>

<style scoped>
.multi-select-dropdown {
  position: relative;
  .dd-el {
    cursor: pointer;
    font-weight: 600;
    background: #e7f8ff;
    display: flex;
    justify-content: space-between;
    height: 1.75rem;
    align-items: center;
    border-radius: 2.75rem;
    padding: 0.25rem 0.5rem;
  }
  .selection {
    padding-right: 0.5rem;
    color: #6f7288;
    font-size: 0.75rem;
  }
  .dd-box {
    position: absolute;
    z-index: 99;
    .filter-list {
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
      border-radius: 0 0 0.3rem 0.3rem;
      border: solid 0.063rem #0891cc;
      background: #ffffff;
      max-height: calc(70vh - 6rem);
      overflow: auto;
      .filter-item {
        padding: 0.5rem;
        border-bottom: 0.5px solid #cee7f7;
        &.active {
          background: #f0f9fd;
        }
      }
    }
  }
}
::v-deep {
  .opt-label {
    margin-left: 0.5rem;
    text-transform: capitalize;
    font-size: 0.75rem;
  }
}
</style>
