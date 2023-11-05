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
          <div
            class="card"
            :style="{ opacity: item?.stock_quantity === 0 ? '.3' : '1' }"
          >
            <button class="like" @click="likedProduct(item)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="27"
                height="23"
                viewBox="0 0 27 23"
                fill="none"
              >
                <path
                  class="st0"
                  d="M7.6,1.9C5.7,2.2,4,3.2,2.9,4.9C2.4,5.7,2,6.8,1.9,7.7c-0.1,0.6,0,1.9,0.1,2.4c0.3,1.3,1.1,2.8,2.2,4.2
	c1.9,2.4,5.2,5,8.8,7.2c0.5,0.3,0.6,0.3,0.8,0.3c0.2,0,0.3,0,0.8-0.3c1.3-0.8,3.1-2,4.3-2.9c4.1-3.2,6.5-6.3,6.9-9.1
	c0.1-0.6,0-1.9-0.1-2.4c-0.3-1.4-0.9-2.5-1.9-3.4c-0.8-0.8-1.6-1.2-2.6-1.5c-0.6-0.2-1.1-0.3-1.8-0.3c-0.4,0-0.8,0-1,0.1
	c-0.8,0.1-1.8,0.5-2.5,1c-0.5,0.3-1.3,1.1-1.6,1.6c-0.1,0.2-0.3,0.4-0.3,0.4c0,0-0.1-0.2-0.3-0.4c-0.3-0.5-1.2-1.3-1.7-1.6
	c-0.7-0.5-1.6-0.8-2.4-1C9.1,1.9,8,1.8,7.6,1.9z"
                  :fill="isLike(item._id) ? '#EFCA00' : 'none'"
                  :stroke="isLike(item._id) ? 'none' : '#292929'"
                />
              </svg>
            </button>
            <a
              class="category__link"
              href="#"
              @click.prevent="goToFlavoring(item)"
            >
              <product-card
                class="category__item"
                :title="item?.title"
                :liked="item?.liked"
                :image-url="item?.imageUrl"
                :old-price="item?.oldPrice"
                :newPrice="item?.newPrice"
              />
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
              <div
                class="card"
                :style="{ opacity: item?.stock_quantity === 0 ? '.3' : '1' }"
              >
                <button class="like" @click="likedProduct(item)">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="27"
                    height="23"
                    viewBox="0 0 27 23"
                    fill="none"
                  >
                    <path
                      class="st0"
                      d="M7.6,1.9C5.7,2.2,4,3.2,2.9,4.9C2.4,5.7,2,6.8,1.9,7.7c-0.1,0.6,0,1.9,0.1,2.4c0.3,1.3,1.1,2.8,2.2,4.2
	c1.9,2.4,5.2,5,8.8,7.2c0.5,0.3,0.6,0.3,0.8,0.3c0.2,0,0.3,0,0.8-0.3c1.3-0.8,3.1-2,4.3-2.9c4.1-3.2,6.5-6.3,6.9-9.1
	c0.1-0.6,0-1.9-0.1-2.4c-0.3-1.4-0.9-2.5-1.9-3.4c-0.8-0.8-1.6-1.2-2.6-1.5c-0.6-0.2-1.1-0.3-1.8-0.3c-0.4,0-0.8,0-1,0.1
	c-0.8,0.1-1.8,0.5-2.5,1c-0.5,0.3-1.3,1.1-1.6,1.6c-0.1,0.2-0.3,0.4-0.3,0.4c0,0-0.1-0.2-0.3-0.4c-0.3-0.5-1.2-1.3-1.7-1.6
	c-0.7-0.5-1.6-0.8-2.4-1C9.1,1.9,8,1.8,7.6,1.9z"
                      :fill="isLike(item._id) ? '#EFCA00' : 'none'"
                      :stroke="isLike(item._id) ? 'none' : '#292929'"
                    />
                  </svg>
                </button>
                <a
                  class="category__link"
                  href="#"
                  @click.prevent="goToFlavoring(item)"
                >
                  <product-card
                    class="category__item"
                    :title="item?.title"
                    :liked="item?.liked"
                    :image-url="item?.imageUrl"
                    :old-price="item?.oldPrice"
                    :newPrice="item?.newPrice"
                  />
                </a>
              </div>
            </template>
          </div>
        </div>
      </div>
      <div class="category__title" v-else>Вже скоро...</div>
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
        let urlStr = `https://damp-sands-00500-b961cd19fbea.herokuapp.com/user/like`;
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
        let urlStr = `https://damp-sands-00500-b961cd19fbea.herokuapp.com/user/dislike`;
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
        let urlStr = `https://damp-sands-00500-b961cd19fbea.herokuapp.com/user/get/`;
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
        let urlStr = `https://damp-sands-00500-b961cd19fbea.herokuapp.com/items/section/find/${id}`;
        const response = await axios.get(urlStr, {});
        this.categories = response.data.section;
        // console.log(this.categories);
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
        let urlStr = `https://damp-sands-00500-b961cd19fbea.herokuapp.com/items/category/findAll/${category}`;
        const response = await axios.get(urlStr, {});
        this.products = response.data.category;
        // console.log(this.products);
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
.category {
  margin-bottom: 64px;
  .card {
    display: flex;
    position: relative;
    max-width: 250px;
    @media (max-width: 570px) {
      max-width: 280px;
      justify-content: center;
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
