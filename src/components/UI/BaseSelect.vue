<template>
  <select :value="modelValue" @change="changeOption">
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.name }}
    </option>
  </select>
</template>

<script>
export default {
  name: "base-select",
  props: {
    modelValue: {
      type: String,
      required: false,
    },
    options: {
      type: Array,
    },
  },
  methods: {
    changeOption(event) {
      this.$emit("update:modelValue", event.target.value);
    },
  },
};
</script>
<style lang="scss" scoped>
select {
  font-family: "tobacco";
  background: none;
  border-radius: 3px;
  color: rgb(0, 0, 0);
  font-size: 22px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  border: 1px solid rgb(0, 0, 0, 0.5);
  cursor: pointer;
  align-self: flex-end;
  width: 315px;
  padding: 4px;
  @media screen and (max-width: 570px) {
    font-size: 20px;
    padding: 4px;
  }
}
option {
  width: 100%;
  margin: 5px;
}
select:hover {
  background-color: #fff;
}

select:focus {
  border-color: #8a7878;
}
</style>
