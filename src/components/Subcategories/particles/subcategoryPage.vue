<template>
  <div class="category__wrap wrap" v-if="!isLoader">
    <div class="category-name">{{ products.title }}</div>

    <div class="category" v-if="$route.query.sectinId">
      <div>
        <div class="category__title">
          {{ categories.sectionName }}
        </div>
      </div>

      <div class="category__list">
        <template v-for="(item, idx1) in categories.products" :key="item?._id">
          <div class="card" :style="{ opacity: item?.stock_quantity === 0 ? '.3' : '1' }">
            <button class="like" @click="likedProduct(item)">
              <svg xmlns="http://www.w3.org/2000/svg" width="27" height="23" viewBox="0 0 27 23" fill="none">
                <path class="st0" d="M7.6,1.9C5.7,2.2,4,3.2,2.9,4.9C2.4,5.7,2,6.8,1.9,7.7c-0.1,0.6,0,1.9,0.1,2.4c0.3,1.3,1.1,2.8,2.2,4.2
	c1.9,2.4,5.2,5,8.8,7.2c0.5,0.3,0.6,0.3,0.8,0.3c0.2,0,0.3,0,0.8-0.3c1.3-0.8,3.1-2,4.3-2.9c4.1-3.2,6.5-6.3,6.9-9.1
	c0.1-0.6,0-1.9-0.1-2.4c-0.3-1.4-0.9-2.5-1.9-3.4c-0.8-0.8-1.6-1.2-2.6-1.5c-0.6-0.2-1.1-0.3-1.8-0.3c-0.4,0-0.8,0-1,0.1
	c-0.8,0.1-1.8,0.5-2.5,1c-0.5,0.3-1.3,1.1-1.6,1.6c-0.1,0.2-0.3,0.4-0.3,0.4c0,0-0.1-0.2-0.3-0.4c-0.3-0.5-1.2-1.3-1.7-1.6
	c-0.7-0.5-1.6-0.8-2.4-1C9.1,1.9,8,1.8,7.6,1.9z" :fill="isLike(item._id) ? '#EFCA00' : 'none'"
                  :stroke="isLike(item._id) ? 'none' : '#292929'" />
              </svg>
            </button>
            <a class="category__link" href="#" @click.prevent="goToFlavoring(item)">
              <product-card class="category__item" :title="item?.title" :liked="item?.liked" :image-url="item?.imageUrl"
                :old-price="item?.oldPrice" :newPrice="item?.newPrice" />
            </a>
          </div>
        </template>
      </div>
    </div>
    <div class="category" v-else>
      <div class="" v-if="products?.sections?.length > 0">
        <div class="" v-for="point in products.sections" :key="point._id">
          <div>
            <div class="category__title">
              {{ point.sectionName }}
            </div>
          </div>
          <div class="category__list">
            <template v-for="(item, idx1) in point.products" :key="item?._id">
              <div class="card" :style="{ opacity: item?.stock_quantity === 0 ? '.3' : '1' }">
                <button class="like" @click="likedProduct(item)">
                  <svg xmlns="http://www.w3.org/2000/svg" width="27" height="23" viewBox="0 0 27 23" fill="none">
                    <path class="st0" d="M7.6,1.9C5.7,2.2,4,3.2,2.9,4.9C2.4,5.7,2,6.8,1.9,7.7c-0.1,0.6,0,1.9,0.1,2.4c0.3,1.3,1.1,2.8,2.2,4.2
	c1.9,2.4,5.2,5,8.8,7.2c0.5,0.3,0.6,0.3,0.8,0.3c0.2,0,0.3,0,0.8-0.3c1.3-0.8,3.1-2,4.3-2.9c4.1-3.2,6.5-6.3,6.9-9.1
	c0.1-0.6,0-1.9-0.1-2.4c-0.3-1.4-0.9-2.5-1.9-3.4c-0.8-0.8-1.6-1.2-2.6-1.5c-0.6-0.2-1.1-0.3-1.8-0.3c-0.4,0-0.8,0-1,0.1
	c-0.8,0.1-1.8,0.5-2.5,1c-0.5,0.3-1.3,1.1-1.6,1.6c-0.1,0.2-0.3,0.4-0.3,0.4c0,0-0.1-0.2-0.3-0.4c-0.3-0.5-1.2-1.3-1.7-1.6
	c-0.7-0.5-1.6-0.8-2.4-1C9.1,1.9,8,1.8,7.6,1.9z" :fill="isLike(item._id) ? '#EFCA00' : 'none'"
                      :stroke="isLike(item._id) ? 'none' : '#292929'" />
                  </svg>
                </button>
                <a class="category__link" href="#" @click.prevent="goToFlavoring(item)">
                  <product-card class="category__item" :title="item?.title" :liked="item?.liked"
                    :image-url="item?.imageUrl" :old-price="item?.oldPrice" :newPrice="item?.newPrice" />
                </a>
              </div>
            </template>
          </div>
        </div>
      </div>
      <div class="category__title" v-else>
        <div class="category-items">
          <div class="category-block-svg">
            <svg viewBox="0 0 32 32" enable-background="new 0 0 32 32" version="1.1" xml:space="preserve"
              xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000">
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <g id="Files_Folder40"></g>
                <g id="Files_Folder39"></g>
                <g id="Files_Folder38"></g>
                <g id="Files_Folder37"></g>
                <g id="Files_Folder36"></g>
                <g id="Files_Folder35"></g>
                <g id="Files_Folder34">
                  <g>
                    <path
                      d="M27,9v5c0,0.55-0.45,1-1,1H6.74L2.96,27.29C2.83,27.72,2.43,28,2,28c-0.05,0-0.1,0-0.15-0.01 C1.36,27.92,1,27.5,1,27V5c0-0.55,0.45-1,1-1h7c0.31,0,0.61,0.15,0.8,0.4L12.5,8H26C26.55,8,27,8.45,27,9z"
                      fill="#FE9803"></path>
                  </g>
                  <line fill="none" stroke="#231F20" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"
                    stroke-width="2" x1="26" x2="2" y1="27" y2="27"></line>
                  <g>
                    <path
                      d="M30.96,14.29l-4,13C26.83,27.71,26.44,28,26,28H2c-0.32,0-0.62-0.15-0.8-0.41 c-0.19-0.25-0.25-0.58-0.16-0.88l4-13C5.17,13.29,5.56,13,6,13h24c0.32,0,0.62,0.15,0.8,0.41C30.99,13.66,31.05,13.99,30.96,14.29 z"
                      fill="#FFC10A"></path>
                  </g>
                </g>
                <g id="Files_Folder33"></g>
                <g id="Files_Folder32"></g>
                <g id="Files_Folder31"></g>
                <g id="Files_Folder30"></g>
                <g id="Files_Folder29"></g>
                <g id="Files_Folder28"></g>
                <g id="Files_Folder27"></g>
                <g id="Files_Folder26"></g>
                <g id="Files_Folder25"></g>
                <g id="Files_Folder24"></g>
                <g id="Files_Folder23"></g>
                <g id="Files_Folder22"></g>
                <g id="Files_Folder21"></g>
                <g id="Files_Folder20"></g>
                <g id="Files_Folder19"></g>
                <g id="Files_Folder18"></g>
                <g id="Files_Folder17"></g>
                <g id="Files_Folder16"></g>
                <g id="Files_Folder15"></g>
                <g id="Files_Folder14"></g>
                <g id="Files_Folder13"></g>
                <g id="Files_Folder12"></g>
                <g id="Files_Folder11"></g>
                <g id="Files_Folder10"></g>
                <g id="Files_Folder09"></g>
                <g id="Files_Folder08"></g>
                <g id="Files_Folder07"></g>
                <g id="Files_Folder06"></g>
                <g id="Files_Folder05"></g>
                <g id="Files_Folder04"></g>
                <g id="Files_Folder03"></g>
                <g id="Files_Folder02"></g>
                <g id="Files_Folder01"></g>
              </g>
            </svg>
          </div>
          <div class="category-text">
            Покищо в нас немає цього товару, заходьте пізніше :(
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <base-loader />
  </div>
</template>
<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import axios from "axios";
import productCard from "../../UI/productCard.vue";
import BaseLoader from "../../UI/BaseLoader.vue";
export default {
  data() {
    return {
      isLoader: false,
      user: [],
      token: "",
      products: [],
      breakpoints: {
        1220: {
          slidesPerView: 4,
        },
        1024: {
          slidesPerView: 3,
        },
        968: {
          slidesPerView: 2,
        },
        570: {
          slidesPerView: 2,
        },
        320: {
          slidesPerView: 1,
        },
      },
      categories: [],
    };
  },
  components: {
    Swiper,
    SwiperSlide,
    productCard,
    BaseLoader,
  },
  setup() {
    return {
      modules: [Pagination],
    };
  },
  methods: {
    goToFlavoring(item) {
      this.$router.push({
        path: `/flavoring/`,
        query: { flavoringId: item._id, sectionName: this.categories._id },
      });
    },
    isLike(id) {
      return this.user?.liked.filter((item) => item.productID == id).length > 0
        ? true
        : false;
    },
    likedProduct(item) {
      if (!this.user) {
        return;
      }
      // console.log(item._id);
      if (this.isLike(item._id)) {
        this.fetchUserDislike(item._id);
      } else {
        this.fetchUserLike(item._id);
      }
    },
    async fetchUserLike(id) {
      try {
        // this.isLoader = true;
        let urlStr = `https://eshopbackend-72da33f36405.herokuapp.com/user/like`;
        const response = await axios.post(urlStr, {
          productID: id,
          userID: this.user._id,
        });
        // console.log(response.data.edited);
        this.fetchAuthorizationGet(this.token);
      } catch (err) {
        console.log(err);
      } finally {
        // this.isLoader = false;
      }
    },
    async fetchUserDislike(id) {
      try {
        // this.isLoader = true;
        let urlStr = `https://eshopbackend-72da33f36405.herokuapp.com/user/dislike`;
        const response = await axios.post(urlStr, {
          productID: id,
          userID: this.user._id,
        });
        // console.log(response.data.edited);
        this.fetchAuthorizationGet(this.token);
      } catch (err) {
        console.log(err);
      } finally {
        // this.isLoader = false;
      }
    },
    async fetchAuthorizationGet(token) {
      try {
        // this.isLoader = true;
        let urlStr = `https://eshopbackend-72da33f36405.herokuapp.com/user/get/`;
        const response = await axios.post(urlStr, {
          token: token,
        });
        this.user = response.data.user;

        localStorage.setItem(`user`, JSON.stringify(this.user));
      } catch (err) {
        console.log(err);
      } finally {
        // this.isLoader = false;
      }
    },
    async fetchFindSection(id) {
      try {
        this.isLoader = true;
        let urlStr;

        if (this.$i18n.locale === 'ua') {
          urlStr = `https://eshopbackend-72da33f36405.herokuapp.com/items/section/find/${id}`;
        } else {
          urlStr = `https://starttobacco-ru-2065f143b724.herokuapp.com/items/section/find/${id}`;
        }

        const response = await axios.get(urlStr, {});
        this.categories = response.data.section;
        this.fetchFindCategory(this.categories.category);
      } catch (err) {
        console.log(err);
      } finally {
        this.isLoader = false;
      }
    },

    async fetchFindCategory(category) {
      try {
        this.isLoader = true;
        let urlStr;

        if (this.$i18n.locale === 'ua') {
          urlStr = `https://eshopbackend-72da33f36405.herokuapp.com/items/category/findAll/${category}`;
        } else {
          urlStr = `https://starttobacco-ru-back-4dd977c1528b.herokuapp.com/items/category/findAll/${category}`;
        }

        const response = await axios.get(urlStr, {});
        this.products = response.data.category;
      } catch (err) {
        console.log(err);
      } finally {
        this.isLoader = false;
      }
    },

  },
  watch: {
    $route(newValue) {
      if (newValue.query.sectinId) {
        this.fetchFindSection(newValue.query.sectinId);
      } else {
        this.fetchFindCategory(newValue.query.categoryId);
      }
    },
  },
  mounted() {
    this.$nextTick(function () {
      this.user = JSON.parse(localStorage.getItem(`user`));
      this.token = JSON.parse(localStorage.getItem(`token`));
      const currentParams = { ...this.$route.query };
      this.isLoader = true;
      if (currentParams.sectinId) {
        this.fetchFindSection(currentParams.sectinId);
      } else {
        this.fetchFindCategory(currentParams.categoryId);
      }
      this.isLoader = false;
    });
  },
};
</script>
<style lang="scss" scoped>
.category-items {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .category-block-svg {
    width: 200px;
  }
}

.category__list {
  a {
    display: flex;
    justify-content: center;
  }
}

.category__item {
  @media (max-width: 540px) {
    margin-right: 0 !important;
    margin-bottom: 0 !important;
  }
}

.product-card {
  @media (max-width: 540px) {
    width: 180px !important;
  }
}

.category {
  margin-bottom: 64px;

  &__list {
    @media (max-width: 968px) {
      display: grid !important;
      grid-template-columns: repeat(2, 1fr) !important;
    }
  }

  .card {
    display: flex;
    position: relative;
    max-width: 250px;

    @media (max-width: 540px) {
      max-width: 200px !important;
      margin: 0 auto;

      &__img {
        height: 150px !important;
      }
    }
  }

  .like {
    cursor: pointer;
    position: absolute;
    top: 17.5px;
    right: 17.5px;
    z-index: 5;

    @media (max-width: 570px) {
      right: 40px;
    }
  }

  &__wrap {
    padding: 64px 0;
  }

  &__link {
    height: 100%;
  }

  &__title {
    font-size: 24px;
    font-family: tobacco;
    margin-bottom: 40px;
    margin-top: 30px;
    // @media (max-width: 968px) {
    // text-align: center;
    // }
  }

  &-name {
    font-size: 32px;
    font-family: tobacco;
  }

  &__list {
    display: flex;
    flex-wrap: wrap;
    column-gap: 30px;
    row-gap: 45px;

    @media (max-width: 570px) {
      justify-content: center;
    }
  }

  &__item {
    margin-right: 30px;
    margin-bottom: 45px;
    // column-gap: 30px;
    // row-gap: 45px;
  }
}
</style>
