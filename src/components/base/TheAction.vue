<template>
  <div class="action">
    <!-- {{ categories }} -->
    <div class="action__wrap wrap">
      <div class="action-top">
        <div class="action-categories">
          <div class="action-categories-icon">
            <img src="/icons/burger-menu.svg" alt="" />
          </div>
          <div class="action-categories-title">
            <router-link to="/allcategories">Топ категорій</router-link>
          </div>
        </div>
        <div class="action-search">
          <div class="action-search-input">
            <input
              type="text"
              placeholder="Введите ваш запрос"
              v-model="request"
            />
          </div>
          <div class="action-search-button">
            <img src="/icons/search.svg" alt="" />
          </div>
        </div>
        <div class="action-personal">
          <div
            class="action-personal-item"
            @click="regContent = !regContent"
            style="cursor: pointer"
          >
            <img src="/icons/personal.svg" alt="" />
          </div>
          <div class="action-personal-item">
            <router-link to="#">
              <img src="/icons/liked.svg" alt="" />
            </router-link>
          </div>
          <div
            class="action-personal-item"
            @click="cartContent = !cartContent"
            style="cursor: pointer"
          >
            <img src="/icons/cart.svg" alt="" />
          </div>
        </div>
      </div>

      <div class="action-bottom">
        <div class="action-bottom-items">
          <template v-for="(item, idx) in categories" :key="idx">
            <div
              class="action-bottom-item"
              @mouseleave="this.showCategory = ''"
            >
              <div
                class="action-bottom-name"
                @mouseenter="showCategory = item.title"
              >
                <div class="action-bottom-name__title">
                  {{ item.title }}
                </div>
                <div
                  class="action-bottom-name__icon"
                  v-if="item?.sections.length > 0"
                >
                  <ChevronDownIcon class="" aria-hidden="true" />
                </div>
              </div>
              <div class="" v-if="item?.sections">
                <template
                  v-if="showCategory === item.title"
                  @mouseenter="showCategory = item.title"
                >
                  <div class="action-bottom-relative">
                    <div class="action-bottom-subcategories">
                      <div class="action-bottom-subcategories__link">
                        <a
                          v-for="(itm, idx) in item.sections"
                          :key="itm._id"
                          @click.prevent="getUserNavigation(itm)"
                        >
                          <div class="action-bottom-subcategories__text">
                            {{ itm.sectionName }}
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
    <regModal
      v-if="regContent"
      @modal="(regContent = !regContent), (authContent = true)"
      v-model:regContent="regContent"
    />
    <authModal
      v-if="authContent"
      @modal="(authContent = !authContent), (regContent = true)"
      v-model:authContent="authContent"
    />

    <cart v-if="cartContent" @cart="cartContent = !cartContent" />
  </div>
</template>
<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { ChevronDownIcon } from "@heroicons/vue/20/solid";
import regModal from "./authComponents/regModal.vue";
import authModal from "./authComponents/authModal.vue";
import cart from "./cart.vue";
import axios from "axios";
</script>
<script>
export default {
  data() {
    return {
      request: "",
      showCategory: "",
      regContent: false,
      authContent: false,
      cartContent: false,
      isOpen: false,
      products: [],
      categories: [],
    };
  },
  components: {
    Menu,
    MenuButton,
    MenuItems,
    MenuItem,
    ChevronDownIcon,
  },
  methods: {
    clearCategory() {
      this.showCategory = null;
    },
    getUserNavigation(item) {
      this.$router.push({
        path: `/subcategory/`,
        query: { categoryId: item.category, sectinId: item._id },
      });
    },
  },
  mounted() {
    this.$nextTick(async function () {
      let urlStr =
        "https://damp-sands-00500-b961cd19fbea.herokuapp.com/items/actions";

      const response = await axios
        .get(urlStr, {})
        .then(function (response) {
          return response.data;
        })
        .catch(function (error) {
          throw error;
        });
      this.categories = response;
    });
  },
};
</script>

<style lang="scss" scoped>
.action {
  background: #292929;
  position: relative;

  &__wrap {
    display: flex;
    flex-direction: column;
    padding: 15px 20px;
  }

  &-top {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }

  &-categories {
    user-select: none;
    cursor: pointer;
    border-radius: 5px;
    background: rgba(90, 89, 89, 0.5);
    padding: 7.5px 20px;
    display: flex;
    flex-direction: row;
    align-items: center;

    &-icon {
      max-width: 24px;
      width: 100%;

      img {
        width: 100%;
      }

      margin-right: 15px;
    }

    &-title {
      font-family: tobacco;

      a {
        color: white;
        text-decoration: none;
      }

      font-size: 18px;
    }
  }

  &-search {
    display: flex;
    flex-direction: row;
    align-items: center;

    &-input {
      input {
        border-radius: 5px 0px 0px 5px;
        width: 545px;
        padding: 8px 12px;
        border: none;

        &:focus {
          outline: none;
          border: none;
        }

        @media (max-width: 1220px) {
          width: 480px;
        }
      }
    }

    &-button {
      background: #efca00;
      border-radius: 0px 5px 5px 0px;
      padding: 8px 20px;
      cursor: pointer;
      user-select: none;
    }
  }

  &-personal {
    display: flex;
    flex-direction: row;
    align-items: center;

    &-item {
      padding: 7.5px;
      transition: 0.3s;

      &:hover {
        scale: (1.25);
      }
    }
  }

  &-bottom {
    // position: relative;
    margin-top: 34px;
    &-items {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
    // position: relative;
    &-item {
      margin-right: 30px;
      user-select: none;

      @media (max-width: 1220px) {
        margin-right: 25px;
      }
    }

    &-name {
      display: flex;
      flex-direction: row;
      align-items: center;
      color: white;
      font-size: 18px;
      font-family: tobacco;
      cursor: pointer;

      &__title {
        font-size: 18px;
      }

      &__icon {
        margin-left: 0.5rem;
        margin-right: -0.25rem;
        width: 1.25rem;
        height: 1.25rem;

        &:hover {
          color: #f3f4f6;
        }
      }
    }
    &-relative {
      position: relative;
    }
    &-subcategories {
      z-index: 11;
      position: absolute;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 5px 10px;
      background: #292929;
      border-radius: 0px 0px 5px 5px;
      width: 100%;
      @media (max-width: 1220px) {
        padding: 20px 5px;
      }

      &__text {
        color: #ffffff;
        padding: 10px;
        transition: 0.3s;
        white-space: pre;
        &:hover {
          background: #5a595980;
          border-radius: 10px;
        }
      }
    }
  }
}
</style>
