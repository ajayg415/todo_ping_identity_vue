<template>
  <div
    ref="appTextBox"
    class="app-text-box"
    :class="{
      'read-only': readOnly,
      'edit-mode': isInEdit,
    }"
    :style="{
      border: `1px solid #e8e8e8`,
      width: width,
    }"
  >
    <input
      ref="appTb"
      v-model="inputText"
      :placeholder="placeholder"
      class="input inp-single"
      :style="{ color: fontColor }"
      :readonly="readOnly"
      @focus="editHandler"
      @blur="checkBlur"
      @keyup.enter="checkEnter"
    />
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: [String, Number],
      default: "",
    },
    width: {
      type: String,
      default: "250px",
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
    contentWidth: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: "",
    },
    fontColor: {
      type: String,
      default: "#000000",
    },
  },
  data() {
    return {
      inputText: this.text,
      isInEdit: false,
    };
  },
  watch: {
    inputText(newVal) {
      this.$emit("change", newVal);
    },
    text(newVal) {
      this.inputText = newVal;
    },
  },
  mounted() {
    if (this.contentWidth) {
      const el = this.$refs.appTextBox;
      el.style.width = `${el.children[0].value.length + 5}ch`;
    }
  },
  methods: {
    editHandler() {
      this.isInEdit = true;
      this.$refs.appTb.focus();
    },
    checkEnter(e) {
      e.stopimmediatepropagation?.();
    },
    checkBlur(e) {
      this.$emit("blur", this.inputText, e);
    },
  },
};
</script>

<style lang="scss" scoped>
.app-text-box {
  border-radius: 0.25rem;
  color: #404255;
  padding: 0.5rem;
  justify-content: space-between;
  display: flex;
  align-items: center;
  border: 1px solid grey;
  &.read-only {
    border-color: transparent !important;
  }
  .input {
    background: transparent;
    min-height: auto;
    resize: none;
    border: none;
    border: none;
    overflow: hidden;
    outline: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
    width: 100%;
  }
  .inp-single {
    padding: 0;
  }
  .edit-icon {
    cursor: pointer;
    opacity: 0.5;
    &:hover {
      opacity: 1;
    }
  }
}
</style>
