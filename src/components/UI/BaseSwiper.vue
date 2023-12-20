<template>
  <div class="discount" v-if="products.length > 0">
    <!-- {{ products }} -->
    <div class="discount__wrap wrap">
      <div
        :class="[
          isColorBlack ? 'discount__title--white' : 'discount__title--black',
          'discount__title',
        ]"
      >
        {{ title }}
      </div>
      <swiper
        :pagination="true"
        :modules="modules"
        class="mySwiper"
        :slidesPerView="4"
        :spaceBetween="30"
        :breakpoints="breakpoints"
      >
        <template v-for="(item, idx) in products">
          <swiper-slide>
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
              <a class="" href="#" @click.prevent="goToFlavoring(item)">
                <product-card
                  :title="item.title"
                  :liked="item.liked"
                  :image-url="item.imageUrl"
                  :old-price="item.oldPrice"
                  :newPrice="item.newPrice"
                />
              </a>
            </div>
          </swiper-slide>
        </template>
      </swiper>
    </div>
  </div>
</template>
<script>
import productCard from "../UI/productCard.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import axios from "axios";
export default {
  name: "base-swiper",
  data() {
    return {
      user: [],
      token: "",
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
      // products: [],
    };
  },
  components: {
    Swiper,
    SwiperSlide,
    productCard,
  },
  props: {
    products: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
    },
    isColorBlack: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    goToFlavoring(item) {
      this.$router.push({
        path: `/flavoring/`,
        query: { flavoringId: item._id },
      });
    },
    isLike(id) {
      return this.user?.liked.filter((item) => item.productID == id).length > 0
        ? true
        : false;
    },
    likedProduct(item) {
      // console.log(item._id);
      if (!this.user) {
        return;
      }
      if (this.isLike(item._id)) {
        this.fetchUserDislike(item._id);
      } else {
        this.fetchUserLike(item._id);
      }
    },
    async fetchUserLike(id) {
      try {
        this.isLoader = true;
        let urlStr = `https://eshopbackend-72da33f36405.herokuapp.com/user/like`;
        const response = await axios.post(urlStr, {
          productID: id,
          userID: this.user?._id,
        });
        // console.log(response.data.edited);
        this.fetchAuthorizationGet(this.token);
      } catch (err) {
        console.log(err);
      } finally {
        this.isLoader = false;
      }
    },
    async fetchUserDislike(id) {
      try {
        this.isLoader = true;
        let urlStr = `https://eshopbackend-72da33f36405.herokuapp.com/user/dislike`;
        const response = await axios.post(urlStr, {
          productID: id,
          userID: this.user?._id,
        });
        // console.log(response.data.edited);
        this.fetchAuthorizationGet(this.token);
      } catch (err) {
        console.log(err);
      } finally {
        this.isLoader = false;
      }
    },
    async fetchAuthorizationGet(token) {
      try {
        this.isLoader = true;
        let urlStr = `https://eshopbackend-72da33f36405.herokuapp.com/user/get/`;
        const response = await axios.post(urlStr, {
          token: token,
        });
        this.user = response.data.user;

        localStorage.setItem(`user`, JSON.stringify(this.user));
      } catch (err) {
        console.log(err);
      } finally {
        this.isLoader = false;
      }
    },
  },
  setup() {
    return {
      modules: [Pagination],
    };
  },
  mounted() {
    this.$nextTick(async function () {
      this.user = JSON.parse(localStorage.getItem(`user`));
      this.token = JSON.parse(localStorage.getItem(`token`));
    });
  },
  async created() {},
};
</script>
<style lang="scss" scoped>
.card {
  display: flex;
  position: relative;
  max-width: 250px;
  @media (max-width: 570px) {
    width: 280px;
  }
}
.like {
  cursor: pointer;
  position: absolute;
  top: 17.5px;
  right: 17.5px;
  z-index: 5;
}
.discount {
  &__slide {
    display: flex;
  }
  &__wrap {
    padding: 32px 20px;
  }

  &__title {
    font-size: 24px;
    font-family: tobacco;
    text-align: center;
  }
  &__title--black {
    color: #000;
  }
  &__title--white {
    color: #ffffff;
  }
  .swiper-slide {
    padding: 40px 10px;
    padding-bottom: 64px;
  }
}
</style>
