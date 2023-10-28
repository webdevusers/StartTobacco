<template>
  <Listbox v-model="selectedPerson" name="assignee">
    <div class="listen-box">
      <ListboxButton class="vidil">
        <div class="vidil__label">
          <svg
            class="vidil__icon"
            width="63"
            height="63"
            viewBox="0 0 63 63"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M31.5 3.9375C20.6313 3.9375 11.8125 11.8753 11.8125 21.6562C11.8125 37.4062 31.5 59.0625 31.5 59.0625C31.5 59.0625 51.1875 37.4062 51.1875 21.6562C51.1875 11.8753 42.3687 3.9375 31.5 3.9375ZM31.5 31.5C29.9425 31.5 28.4199 31.0381 27.1249 30.1728C25.8298 29.3075 24.8205 28.0776 24.2244 26.6386C23.6284 25.1997 23.4725 23.6163 23.7763 22.0887C24.0802 20.5611 24.8302 19.1579 25.9315 18.0565C27.0329 16.9552 28.4361 16.2052 29.9637 15.9013C31.4913 15.5975 33.0747 15.7534 34.5136 16.3494C35.9526 16.9455 37.1825 17.9548 38.0478 19.2499C38.9131 20.5449 39.375 22.0675 39.375 23.625C39.3727 25.7129 38.5423 27.7146 37.0659 29.1909C35.5896 30.6673 33.5879 31.4977 31.5 31.5Z"
              fill="black"
            />
          </svg>
          <div class="vidil__city">
            <div class="vidil__title">{{ selectedPerson?.city }}</div>
            <div class="vidil__text">{{ selectedPerson?.obl }}</div>
          </div>
        </div>
      </ListboxButton>
      <transition
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions class="options">
          <ListboxOption
            v-for="person in options"
            :key="person.id"
            :value="person"
            class="options__list"
          >
            <li class="options__item">
              <span class="options__span">
                {{ person.city }}
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>

<script>
import { ref } from "vue";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";

const selectedPerson = ref();
export default {
  data() {
    return {
      selectedPerson,
    };
  },
  props: {
    modelValue: {
      type: [Object, String],
      required: false,
    },
    options: {
      type: Array,
      required: false,
    },
  },
  components: {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
    selectedPerson,
  },
  watch: {
    selectedPerson(newValue) {
      if (newValue != "") {
        this.$emit("update:modelValue", newValue);
      }
    },
  },
  mounted() {
    if (this.modelValue) {
      this.selectedPerson = this.modelValue;
    } else {
      this.selectedPerson = this.options[0];
    }
  },
};
</script>
<style lang="scss" scoped>
.vidil {
  width: 100%;
  &__label {
    border-radius: 10px;
    border-style: solid;
    border-color: #000000;
    border-width: 1px;
    display: flex;
    padding: 12px 0 12px 8px;
    box-shadow:
      0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
  &__input {
    margin: 180px 0 75px;
    width: 245px;
  }
  &__icon {
    @media screen and (max-width: 570px) {
      width: 32px;
      height: 32px;
    }
  }
  &__title {
    color: #000000;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    @media screen and (max-width: 570px) {
      font-size: 0.75rem;
    }
  }
  &__text {
    margin-top: 18px;
    color: #000000;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    @media screen and (max-width: 570px) {
      font-size: 0.6875rem;
      margin-top: 6px;
    }
  }
}
.button {
  position: relative;

  border-radius: 0.5rem;
  width: 100%;
  text-align: left;
  background-color: #ffffff;
  cursor: default;
}
.options {
  overflow: hidden;
  max-width: 390px;
  position: absolute;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  margin-top: 0.25rem;
  border-radius: 0.375rem;
  box-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width))
    var(--tw-ring-color);
  --ring-color: #000000;
  --ring-opacity: 0.05;
  width: 100%;
  font-size: 1rem;
  line-height: 1.5rem;
  background-color: #ffffff;
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  z-index: 10;
  &__list {
    color: #000000;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  &__item {
    position: relative;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-right: 1rem;
    padding-left: 2.5rem;
    cursor: default;
    user-select: none;
  }
  &__span {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.listen-box {
  position: relative;
  max-width: 390px;
  @media screen and (max-width: 570px) {
    width: 170px;
  }
}
</style>
