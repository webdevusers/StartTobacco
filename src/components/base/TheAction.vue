<template>
  <div class="action">
    <!-- {{ categories }} -->
    <div class="action__wrap wrap">
      <div class="action-top">
        <div class="action-categories no-mobile-version">
          <div class="action-categories-icon">
            <img src="/icons/burger-menu.svg" alt="" />
          </div>
          <div class="action-categories-title">
            <router-link to="/">Топ категорій</router-link>
          </div>
        </div>
        <div class="action-categories mobile-version" @click="isMenu = !isMenu">
          <div class="action-categories-icon">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/starttobacco-6ed2b.appspot.com/o/menu-burger-horizontal-svgrepo-com%20(1).svg?alt=media&token=80aa83b0-2a71-473e-a3b3-6816c794c673&_gl=1*1qk6mze*_ga*MTI3NjI3MzY0LjE2OTY0MjI4NDY.*_ga_CW55HF8NVT*MTY5OTE1NTc5OS4xMi4xLjE2OTkxNTU4ODQuNTMuMC4w"
              alt=""
            />
          </div>
          <div class="action-categories-title">
            <a>Категорії</a>
          </div>
        </div>
        <!-- v-model:model-value="responsSerch" -->
        <base-inpute-search
          v-model:fuzzySearch="fuzzySearch"
          :options="optionsForSearch"
        />
        <div class="action-personal">
          <button
            class="action-personal-item"
            @click="getUser"
            style="cursor: pointer"
          >
            <img src="/icons/personal.svg" alt="" />
          </button>
          <button class="action-personal-item" @click="goToFlavoring">
            <img src="/icons/liked.svg" alt="" />
          </button>
          <button
            class="action-personal-item"
            @click="cartContent = !cartContent"
            style="cursor: pointer"
          >
            <img src="/icons/cart.svg" alt="" />
          </button>
        </div>
      </div>

      <div class="action-bottom">
        <div class="action-bottom-items">
          <template v-for="(item, idx) in categories" :key="item._id">
            <div class="action-bottom-item" @mouseleave="showCategory = ''">
              <div
                class="action-bottom-name"
                @mouseenter="showCategory = item.title"
              >
                <a
                  class="action-bottom-name__title"
                  @click.prevent="getUserCategory(item)"
                >
                  {{ item.title }}
                </a>
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
                          v-for="itm in item.sections"
                          :key="itm._id"
                          @click.prevent="getUserSectinId(itm)"
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
    <div class="" v-if="!user">
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
    </div>
    <div class="" v-else>
      <user-modal
        @modal="userContent = !userContent"
        v-model:userContent="userContent"
        v-if="userContent"
      />
    </div>
    <cart v-if="cartContent" @cart="cartContent = !cartContent" />
    <div class="menu-mobile" v-if="isMenu" @click="isMenu = false">
      <div class="menu-mobile-bottom" @click.stop>
        <nav class="header-links">
          <a href="/" class="header-link-item">Головна</a>
          <a href="/about" class="header-link-item">Про нас</a>
          <a href="/contacts" class="header-link-item">Контакти</a>
          <a href="/cooperation" class="header-link-item">Співпраця</a>
        </nav>
        <div class="menu-mobile-bottom-items">
          <div class="menu-mobile-bottom__title">Усі категорії</div>
          <template v-for="(item, idx) in categories" :key="item._id">
            <div
              class="menu-mobile-bottom-item"
              @mouseleave="showCategory = ''"
            >
              <div
                class="menu-mobile-bottom-name"
                @mouseenter="showCategory = item.title"
              >
                <a
                  class="menu-mobile-bottom-name__title"
                  @click.prevent="getUserCategory(item)"
                >
                  {{ item.title }}
                </a>
                <div
                  class="menu-mobile-bottom-name__icon"
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
                  <div class="menu-mobile-bottom-relative">
                    <div class="menu-mobile-bottom-subcategories">
                      <div class="menu-mobile-bottom-subcategories__link">
                        <a
                          v-for="itm in item.sections"
                          :key="itm._id"
                          @click.prevent="getUserSectinId(itm)"
                        >
                          <div class="menu-mobile-bottom-subcategories__text">
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
        <div class="menu-mobile-personal">
          <div class="menu-mobile-personal-icon">
            <button
              class="menu-mobile-personal-item"
              @click="getUser"
              style="cursor: pointer"
            >
              <img src="/icons/personal.svg" alt="" />
              <div class="menu-mobile-personal-btn-title">
                Особистий кабінет
              </div>
            </button>
            <button class="menu-mobile-personal-item" @click="goToFlavoring">
              <img src="/icons/liked.svg" alt="" />
              <div class="menu-mobile-personal-btn-title">Обране</div>
            </button>
            <button
              class="menu-mobile-personal-item"
              @click="(isMenu = false), (cartContent = !cartContent)"
              style="cursor: pointer"
            >
              <img src="/icons/cart.svg" alt="" />
              <div class="menu-mobile-personal-btn-title">Кошик</div>
            </button>
          </div>
        </div>
        <div class="contacts">
          <div class="contacts__title">Контакти</div>
          <div class="contacts__item">
            <img
              class="contacts__icon"
              src="../../../public/images/phone.png"
            />
            <a class="contacts__text" href="tel:">+38 (068) 657 18 28</a>
          </div>
          <div class="contacts__item">
            <img
              class="contacts__icon"
              src="../../../public/images/phone.png"
            />
            <a class="contacts__text" href="tel:">+38 (099) 449 04 52</a>
          </div>
          <div class="contacts__item">
            <img class="contacts__icon" src="../../../public/images/mail.png" />
            <a class="contacts__text" href="mailto:tobaccostart@gmail.com"
              >tobaccostart@gmail.com</a
            >
          </div>
          <div class="contacts__item">
            <img
              class="contacts__icon"
              src="../../../public/images/telegram.png"
            />
            <a class="contacts__text" href="https://t.me/zloy_huann"
              >Telegram</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { ChevronDownIcon } from "@heroicons/vue/20/solid";
import regModal from "./authComponents/regModal.vue";
import authModal from "./authComponents/authModal.vue";
import userModal from "./authComponents/userModal.vue";
import cart from "./cart.vue";
import axios from "axios";
import BaseInputeSearch from "../UI/BaseInputeSearch.vue";

export default {
  data() {
    return {
      request: "",
      showCategory: "",
      regContent: false,
      authContent: false,
      cartContent: false,
      userContent: false,
      isOpen: false,
      products: [],
      categories: [],
      user: [],
      isMenu: false,
      responsSerch: "",
      fuzzySearch: "",
      optionsForSearch: [],
    };
  },
  components: {
    Menu,
    MenuButton,
    MenuItems,
    MenuItem,
    ChevronDownIcon,
    userModal,
    BaseInputeSearch,
    regModal,
    authModal,
    cart,
  },
  methods: {
    clearCategory() {
      this.showCategory = null;
    },
    getUserSectinId(item) {
      this.isMenu = false;
      this.$router.push({
        path: `/subcategory/`,
        query: { categoryId: item.category, sectinId: item._id },
      });
    },
    getUserCategory(item) {
      this.isMenu = false;

      this.$router.push({
        path: `/subcategory/`,
        query: { categoryId: item._id },
      });
    },
    getUser() {
      this.isMenu = false;
      this.regContent = true;
      this.userContent = true;
    },
    goToFlavoring(item) {
      this.isMenu = false;
      if (this.user?.name == undefined) {
        this.regContent = true;
        this.userContent = true;
      } else {
        this.$router.push({
          path: `/personal-information`,
          query: { navigation: "chosen" },
        });
      }
    },
    async fetchSearch(request) {
      try {
        let urlStr = `https://damp-sands-00500-b961cd19fbea.herokuapp.com/items/search/${request}`;
        const response = await axios.get(urlStr, {});
        this.optionsForSearch = response.data.products;
      } catch (err) {
        console.log(err);
      } finally {
      }
    },
  },
  watch: {
    async fuzzySearch(newValue) {
      setTimeout(async () => {
        await this.fetchSearch(newValue);
      }, 1000);
    },
    regContent(newValue) {
      setTimeout(() => {
        this.user = JSON.parse(localStorage.getItem(`user`));
      }, 2000);
    },
    authContent(newValue) {
      setTimeout(() => {
        this.user = JSON.parse(localStorage.getItem(`user`));
      }, 2000);
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

  async created() {
    this.user = await JSON.parse(localStorage.getItem(`user`));
    if (this.user?.name == undefined) {
    }
  },
};
</script>

<style lang="scss" scoped>
.contacts {
  display: flex;
  flex-direction: column;
  margin: 20px 10px;

  &__title {
    margin: 0 auto;
    font-size: 18px;
    font-weight: 700;
  }

  &__item {
    display: flex;
    align-items: center;
    padding: 5px 20px;
  }

  &__icon {
    width: 16px;
    height: 16px;
    margin-right: 10px;
  }
}

.header-links {
  display: flex;
  flex-direction: column;
  margin: 20px 10px;

  a {
    padding: 5px 20px;
  }
}

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
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;

    @media (max-width: 570px) {
      // margin-top: 30px;
      row-gap: 30px;
      // order: 3;
    }
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

    // @media (max-width: 970px) {
    //   display: none;
    // }
    @media (max-width: 765px) {
      max-width: 130px;
    }

    &-icon {
      max-width: 24px;
      width: 100%;

      img {
        width: 100%;
      }

      margin-right: 15px;

      @media (max-width: 570px) {
        margin-right: 0;
      }
    }

    &-title {
      font-family: tobacco;
      font-size: 15px;

      @media (max-width: 765px) {
        font-size: 9px;
      }

      @media (max-width: 570px) {
        display: none;
      }

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

    @media (max-width: 570px) {
      // margin-top: 30px;
      row-gap: 30px;
      // order: 3;
    }

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
          max-width: 545px;
        }

        @media (max-width: 970px) {
          max-width: 250px;
        }

        @media (max-width: 570px) {
          max-width: 210px;
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

    @media (max-width: 970px) {
      display: none;
    }

    &-item {
      padding: 7.5px;
      transition: 0.3s;

      &:hover {
        scale: (1.25);
      }
    }
  }

  &-bottom {
    @media (max-width: 970px) {
      display: none;
    }

    margin-top: 34px;

    @media (max-width: 570px) {
      padding: 0 28px;
    }

    &-items {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      flex-wrap: wrap;

      @media (max-width: 1040px) {
        column-gap: 10px;
        row-gap: 15px;
      }
    }

    &-item {
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

  .menu-mobile {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    display: none;
    background: rgba(0, 0, 0, 0.25);
    display: flex;
    z-index: 100;
    flex-direction: column;
    animation: load 0.7s;
    &-bottom {
      position: absolute;
      top: 0;
      left: 0;
      width: 80%;
      height: 100vh;
      background: #ffffff;
      box-shadow: 5px 5px 25px 0px rgba(0, 0, 0, 0.2);

      &-items {
        margin: 20px 10px;

        @media (max-width: 1040px) {
          column-gap: 10px;
          row-gap: 15px;
        }
      }

      &__title {
        text-align: center;
        font-size: 18px;
        font-weight: 700;
      }

      &-item {
        padding: 10px 20px;
      }

      &-name {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        font-size: 18px;
        font-family: tobacco;
        cursor: pointer;

        &__title {
          font-size: 18px;
          font-weight: 700;

          &:active {
            background: #5a595980;
            border-radius: 10px;
          }
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
        // position: absolute;
        display: flex;
        // flex-direction: column;
        // align-items: center;
        // padding: 5px 10px;
        // background: #292929;
        border-radius: 0px 0px 5px 5px;
        width: 100%;

        &__text {
          // color: #ffffff;
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

    &-personal {
      background: rgba(0, 0, 0, 0.25);
      padding: 15px 10px;

      &-icon {
        display: flex;
        flex-direction: column;
      }

      &-item {
        display: flex;
        column-gap: 10px;
        padding: 10px 20px;
      }

      &-btn-title {
        color: #ffffff;
      }
    }
  }
}

.mobile-version {
  display: none;

  @media (max-width: 970px) {
    display: flex;
  }
}

.no-mobile-version {
  display: flex;

  @media (max-width: 970px) {
    display: none;
  }
}
@keyframes load {
  from {
    left: -350px;
  }
  to {
    left: 0;
  }
}
</style>
