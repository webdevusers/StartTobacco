<template>
  <Combobox as="div" v-model.stop="selectedPerson">
    <div class="search-input">
      <ComboboxInput :placeholder="$t('inputSearch')" class="action-search-input" autocomplete="off"
        @change.prevent="query = $event.target.value" :displayValue="(option) => option.title" />
      <div class="action-search-button">
        <div @click="handleSearch">
          <img src="/icons/search.svg" alt="" />
        </div>
      </div>

      <transition enter-active-class="transition duration-100 ease-out" enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100" leave-active-class="transition duration-75 ease-out"
        leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-95 opacity-0">
        <ComboboxOptions class="search-input__options">
          <div class="" v-if="options.length > 0">
            <ComboboxOption v-for="option in options" :key="option._id" :value="option" v-slot="{ active, selected }">
              <li :class="['search-input__list']">
                <span :class="['search-input__span']">
                  <div v-if="option.title" class="search-input__title">
                    {{ option.title }}
                  </div>
                </span>
              </li>
            </ComboboxOption>
          </div>
        </ComboboxOptions>
      </transition>
    </div>
  </Combobox>
</template>

<script>
import { ref } from "vue";
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from "@headlessui/vue";
import { useRouter } from "vue-router";

export default {
  name: "BaseInputSearch",
  data() {
    return {
      query: "",
      selectedPerson: "",
    };
  },
  props: {
    fuzzySearch: {
      type: String,
      required: false,
    },
    options: {
      type: Array,
    },
  },
  components: {
    Combobox,
    ComboboxInput,
    ComboboxOption,
    ComboboxOptions,
  },
  methods: {
    handleSearch() {
      if (this.query.trim() !== "") {
        // Используем объект $router для перехода на страницу "search" и передачи параметра query
        this.$router.push({
          name: "search",
          query: { query: this.query },
        });
      }
    },
  },
  watch: {
    query(newValue) {
      this.$emit("update:fuzzySearch", newValue);
    },

    selectedPerson(newValue) {
      // this.$emit("update:modelValue", newValue._id);
      this.$router.push({
        name: "flavoring",
        query: { flavoringId: newValue._id },
      });
    },
  },
};
</script>


<style lang="scss" scoped>
.search-input {
  position: relative;

  // margin-top: 0.25rem;
  // &__btn {
  //   display: flex;
  //   position: absolute;
  //   top: 0;
  //   left: 0;
  //   align-items: center;
  //   border-top-right-radius: 0.25rem;
  //   border-bottom-right-radius: 0.25rem;
  //   cursor: pointer;
  //   &:hover {
  //     cursor: pointer;
  //     opacity: 1;
  //   }
  // }
  &__options {
    position: absolute;
    z-index: 10;
    background: #ffffff;
    overflow: hidden;
    border-radius: 0px 0px 5px 5px;
    max-height: 450px;
    width: 545px;

    @media (max-width: 1220px) {
      max-width: 545px;
    }

    @media (max-width: 970px) {
      max-width: 250px;
    }

    @media (max-width: 570px) {
      max-width: 425px;
      top: 55px;
      left: 29%;
      border-radius: 5px;
      transform: translate(-50%);
    }
  }

  &__list {
    position: relative;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    text-align: left;
    cursor: pointer;
    user-select: none;
  }

  &__span {
    display: flex;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-left: 0.75rem;
    padding-right: 1.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__title {
    padding-left: 1rem;
    font-weight: 700;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.action {
  background: #292929;
  position: relative;

  &-search {
    display: flex;
    flex-direction: row;
    align-items: center;

    @media (max-width: 570px) {
      // margin-top: 30px;
      row-gap: 30px;
      // order: 3;
    }

    &-input {
      border-radius: 5px;
      width: 545px;
      padding: 8px 12px;
      border: none;

      &:focus {
        outline: none;
        border: none;
      }

      @media (max-width: 1220px) {
        max-width: 545px;
      }

      @media (max-width: 970px) {
        max-width: 400px;
      }

      @media (max-width: 570px) {
        max-width: 290px;
      }
    }

    &-button {
      background: #efca00;
      border-radius: 0px 5px 5px 0px;
      padding: 8px 20px;
      // cursor: pointer;
      // user-select: none;
      display: flex;
      position: absolute;
      top: 0;
      right: 0;
      align-items: center;
      // border-top-right-radius: 0.25rem;
      // border-bottom-right-radius: 0.25rem;
      cursor: pointer;

      &:hover {
        cursor: pointer;
        opacity: 1;
      }
    }
  }
}
</style>
