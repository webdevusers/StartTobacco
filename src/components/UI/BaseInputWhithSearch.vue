<template>
  <Combobox v-model="selected" :class="[isError ? 'shake--transition' : '']">
    <div class="combobox">
      <div class="combobox__block-input">
        <ComboboxInput
          class="combobox__input"
          :displayValue="(options) => options.name"
          @change="query = $event.target.value"
          placeholder="Відділення"
        />
        <ComboboxButton class="combobox__button">
          <ChevronUpDownIcon class="combobox__icon" aria-hidden="true" />
        </ComboboxButton>
      </div>
      <TransitionRoot
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        @after-leave="query = ''"
      >
        <ComboboxOptions class="options">
          <div
            v-if="filteredOptions.length === 0 && query !== ''"
            class="options__error"
          >
            Nothing found.
          </div>

          <ComboboxOption
            v-for="options in filteredOptions"
            as="template"
            :key="options.id"
            :value="options"
            v-slot="{ selected, active }"
          >
            <li class="options__item">
              <span class="options__item-title">
                {{ options.name }}
              </span>
            </li>
          </ComboboxOption>
        </ComboboxOptions>
      </TransitionRoot>
    </div>
  </Combobox>
</template>

<script>
import { ref, computed } from "vue";
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot,
} from "@headlessui/vue";
import { ChevronUpDownIcon } from "@heroicons/vue/20/solid";

let selected = ref("");
let query = ref("");

export default {
  data() {
    return {
      selected,
      query,
    };
  },
  components: {
    Combobox,
    ComboboxInput,
    ComboboxButton,
    ComboboxOptions,
    ComboboxOption,
    TransitionRoot,
    ChevronUpDownIcon,
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
    isError: {
      type: Boolean,
      required: false,
    },
  },
  computed: {
    filteredOptions() {
      return query.value === ""
        ? this.options
        : this.options.filter((options) =>
            options.name
              .toLowerCase()
              .replace(/\s+/g, "")
              .includes(query.value.toLowerCase().replace(/\s+/g, ""))
          );
    },
  },
  watch: {
    selected(newValue) {
      if (newValue != "") {
        this.$emit("update:modelValue", newValue);
      }
    },
  },
  mounted() {
    if (this.modelValue) {
      this.selected = this.modelValue;
    }
  },
};
</script>
<style lang="scss" scoped>
input {
  outline: none;
}
.shake--transition {
  animation: shake 0.2s 4;
  @keyframes shake {
    0%,
    100% {
      translate: 0;
    }

    25% {
      translate: 8px 0;
    }

    75% {
      translate: -8px 0;
    }
  }
}
.combobox {
  position: relative;
  margin: 35px 0 30px;
  @media (max-width: 570px) {
    margin: 30px 0 20px;
  }

  &__block-input {
    border-radius: 10px;
    border: 1px solid rgb(0, 0, 0);
    overflow: hidden;
    position: relative;
    border-radius: 0.5rem;
    max-width: 245px;
    text-align: left;
    background-color: #ffffff;
    cursor: default;
    box-shadow:
      0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);

    @media (min-width: 640px) {
      font-size: 0.875rem;
      line-height: 1.25rem;
    }
    @media screen and (max-width: 570px) {
      font-size: 0.625rem;
      padding: 8px 6px;
      max-width: 140px;
    }
  }
  &__input {
    border-style: none;
    font-size: 0.875rem;
    padding: 14px 12px;
    color: rgba(41, 41, 41, 0.5);
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    @media screen and (max-width: 570px) {
      font-size: 0.75rem;
      padding: 8px 6px;
      line-height: normal;
      font-style: normal;
    }
  }
  &__button {
    display: flex;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    padding-right: 0.5rem;
    align-items: center;
  }
  &__icon {
    width: 1.25rem;
    height: 1.25rem;
    color: #9ca3af;
  }
}
.options {
  overflow: auto;
  position: absolute;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  margin-top: 0.25rem;
  border-radius: 0.375rem;
  box-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width))
    var(--tw-ring-color);
  --ring-color: #000000;
  --ring-opacity: 0.05;
  width: 245px;
  font-size: 1rem;
  line-height: 1.5rem;
  background-color: #ffffff;
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);

  @media (min-width: 640px) {
    font-size: 0.875rem;
    line-height: 1.25rem;
  }
  @media screen and (max-width: 570px) {
    max-width: 140px;
  }
  &__error {
    position: relative;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-left: 1rem;
    padding-right: 1rem;
    color: #374151;
    cursor: default;
    user-select: none;
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
  &__item-title {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
