<template>
  <div
    class="app-button-wrapper"
    :class="{
      disable: disable,
      active: !disable,
      shadow: shadow,
      rounded: rounded,
      'primary-btn': primaryBtn,
    }"
    :style="{
      'background-color': getBgColor,
      border: getBorder,
    }"
    @click="btnClick"
  >
    <i
      v-if="leftIcon"
      class="btn-icon left-icon"
      :class="leftIcon"
      :style="{ color: iColor('left') }"
    />
    <button
      v-if="btnLabel"
      class="app-button"
      :style="{ color: textColor, 'font-weight': fontWeight }"
    >
      {{ btnLabel }}
    </button>
    <i
      v-if="rightIcon"
      class="btn-icon right-icon"
      :class="rightIcon"
      :style="{ color: iColor('right') }"
    />
  </div>
</template>

<script>
export default {
  props: {
    btnLabel: {
      type: String,
      required: true,
    },
    labelColor: {
      type: String,
      default: "#999999",
    },
    primaryBtn: {
      type: Boolean,
      default: true,
    },
    leftIcon: {
      type: String,
      default: "",
    },
    leftIconColor: {
      type: String,
      default: "",
    },
    border: {
      type: Boolean,
      default: false,
    },
    borderColor: {
      type: String,
      required: false,
    },
    rightIcon: {
      type: String,
      default: "",
    },
    rightIconColor: {
      type: String,
      default: "",
    },
    iconColor: {
      type: String,
      default: "#1b92ca",
    },
    disable: {
      type: Boolean,
      default: false,
    },
    shadow: {
      type: Boolean,
      default: false,
    },
    rounded: {
      type: Boolean,
      default: false,
    },
    hasBgcolor: {
      type: Boolean,
      default: true,
    },
    bgColor: {
      type: String,
      default: "#ffffff",
    },
    fontWeight: {
      type: Number,
      default: 100,
    },
  },
  computed: {
    textColor() {
      if (this.disable) {
        return "#5a5a5a";
      }
      if (this.primaryBtn) {
        return "#ffffff";
      }
      return this.labelColor;
    },
    getBgColor() {
      if (this.hasBgcolor) {
        if (this.disable) {
          return "#e6e6e6";
        }
        if (this.primaryBtn) {
          return "#1b92ca";
        }
        return this.bgColor;
      }
      return "#ffffff";
    },
    getBorder() {
      if (this.border || this.borderColor) {
        if (this.disable) {
          return "1px solid #d4d4d4";
        }
        if (this.borderColor) {
          return `1px solid ${this.borderColor}`;
        }
        return "1px solid #1b92ca";
      }
      return "none";
    },
  },
  methods: {
    btnClick(e) {
      if (!this.disable) {
        this.$emit("click");
      }
      e.stopPropagation();
    },
    iColor(side) {
      if (this.primaryBtn) {
        return "#ffffff";
      }
      if (side === "left") {
        return this.leftIconColor || this.iconColor;
      }
      return this.rightIconColor || this.iconColor;
    },
  },
};
</script>

<style scoped>
.app-button-wrapper {
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 12px;

  &.active:hover {
    box-shadow: 0 0 5px;
  }
  &.rounded {
    border-radius: 1rem;
  }
  &.shadow {
    box-shadow: 1px 2px 0.163rem 2px #0166951a;
  }
  .btn-icon {
    padding: 8px 10px;
  }
  .app-button {
    padding: 8px;
    cursor: pointer;
    background: inherit;
    border: none;
    font-size: 10px;
  }
}
</style>
