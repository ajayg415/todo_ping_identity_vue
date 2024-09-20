<template>
  <div
    class="rb-wrapper"
    :class="{ disabled: disabled, active: selected }"
    @mouseenter="setHover(true)"
    @mouseleave="setHover(false)"
  >
    <label class="label">
      <input type="radio" :checked="selected" @click="handleChange" />
      <i
        v-if="showRadio"
        class="rb"
        :class="
          selected || isHover ? 'fa-solid fa-circle-dot' : 'fa-light fa-circle'
        "
      />
      <div
        v-if="!showRadio && showDot"
        class="radio-dot"
        :class="{ active: selected }"
      />
      <slot name="label" />
    </label>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    selected: {
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
      isHover: false,
    };
  },
  methods: {
    handleChange(e) {
      this.$emit("opt-click", e.target.checked, this.id);
    },
    setHover(flag) {
      this.isHover = flag;
    },
  },
};
</script>

<style scoped>
.rb-wrapper {
  .label {
    display: flex;
    align-items: center;
    margin: auto;
    position: relative;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;
    }
    > span {
      margin-left: 10px !important;
    }
    .rb {
      font-size: 1rem;
      background-color: #ffffff;
      color: #9fa6e5;
      display: block;
      margin-left: 1rem;
    }

    .radio-dot {
      width: 0.313rem;
      height: 0.313rem;
      border-radius: 0.313rem;
      margin-right: 1rem;
      &.active {
        background: #f04e45;
      }
    }
  }
  .label:hover input ~ .rb {
    color: red;
  }
  .label input:checked ~ .rb {
    color: red;
  }
  .label:hover input:checked ~ .rb {
    color: red;
  }

  &.disabled {
    .label .rb {
      border-color: #e6e6e6;
      &:after {
        border-color: #e6e6e6;
      }
    }
    input:checked ~ .rb {
      background-color: transparent;
    }
  }
}
</style>
