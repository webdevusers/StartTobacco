<template>
  <div class="popular" v-if="products.length > 0">
    <div class="popular__wrap wrap">
      <div class="popular__title">Популярні товари</div>

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
            <a class="" href="#" @click.prevent="goToFlavoring(item)">
              <div class="product-card">
                <div class="product-card-img">
                  <img :src="item.imageUrl" alt="title" />
                </div>
                <div class="product-card-info">
                  <div class="product-card-liked">
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
                        :fill="item.liked ? '#EFCA00' : 'none'"
                        :stroke="item.liked ? 'none' : '#292929'"
                      />
                    </svg>
                  </div>
                  <div class="product-card-title">
                    <h3>{{ item.title }}</h3>
                  </div>
                  <div class="product-card-reviews">
                    <div class="product-card-reviews-stars">
                      <img src="/icons/stars.svg" alt="" />
                    </div>
                    <div class="product-card-reviews-count">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="13"
                        viewBox="0 0 16 13"
                        fill="none"
                      >
                        <path
                          d="M1.76841 0.0686588C1.14568 0.230108 0.538323 0.718301 0.257708 1.27569C-0.0152185 1.82923 0.000157679 1.46789 0.000157679 7.08018V12.1351L0.0924146 12.3273C0.223112 12.6079 0.357653 12.7501 0.622892 12.8808C0.822782 12.9808 0.903506 13 1.13799 13C1.31482 13 1.48396 12.9769 1.5839 12.9347C1.67616 12.9001 2.26814 12.4811 2.90241 12.0044L4.05562 11.1356L9.01442 11.1164C13.5658 11.0972 13.9925 11.0895 14.2039 11.028C15.0649 10.782 15.7261 10.117 15.9337 9.2905C16.0221 8.94838 16.0221 2.13675 15.9337 1.79463C15.7223 0.964319 15.0342 0.276237 14.2039 0.0648146C13.8694 -0.0197544 2.09516 -0.0159101 1.76841 0.0686588ZM14.1001 1.39485C14.3692 1.52939 14.4999 1.66778 14.6421 1.96761L14.742 2.17904L14.7536 5.36959C14.7613 7.28392 14.7497 8.65624 14.7267 8.79847C14.6767 9.11368 14.5883 9.2905 14.3769 9.50577C14.0309 9.85558 14.4922 9.82483 8.803 9.84789L3.78653 9.86711L3.57511 9.96321C3.41751 10.0324 1.89142 11.1356 1.27638 11.6277C1.20334 11.6853 1.23025 2.24054 1.30329 2.03681C1.39939 1.77541 1.6185 1.53708 1.87989 1.40254L2.12207 1.27569H7.99191H13.8656L14.1001 1.39485Z"
                          fill="#292929"
                        />
                        <path
                          d="M5.27829 5.04669C4.8247 5.26964 4.83239 5.93466 5.28983 6.15761C5.56275 6.29216 5.83568 6.23834 6.05094 6.0077C6.21239 5.83856 6.2393 5.50413 6.10861 5.27733C5.94716 4.98903 5.58966 4.88908 5.27829 5.04669Z"
                          fill="#292929"
                        />
                        <path
                          d="M7.73825 5.04669C7.28466 5.26964 7.29235 5.93466 7.74979 6.15761C8.02271 6.29216 8.29564 6.23834 8.51091 6.0077C8.67236 5.83856 8.69926 5.50413 8.56857 5.27733C8.40712 4.98903 8.04962 4.88908 7.73825 5.04669Z"
                          fill="#292929"
                        />
                        <path
                          d="M10.1288 5.04291C9.88664 5.16592 9.82129 5.28508 9.82129 5.60798C9.82129 5.86169 9.82898 5.89244 9.93661 6.00776C10.1403 6.22303 10.4056 6.28838 10.6631 6.18074C10.9168 6.07311 11.0398 5.87706 11.036 5.5657C11.036 5.33121 10.9168 5.1467 10.7016 5.04291C10.5055 4.94681 10.3249 4.94681 10.1288 5.04291Z"
                          fill="#292929"
                        />
                      </svg>
                      <p>99+</p>
                    </div>
                  </div>
                  <div class="product-card-discount">
                    <div class="product-card-old-price">
                      {{ item.oldPrice }}₴
                    </div>
                    <div
                      class="product-card-discount-info"
                      v-if="item?.discount > 0"
                    >
                      - {{ item?.discount.toFixed(0) }}%
                    </div>
                  </div>
                  <div class="product-card-price">{{ item.newPrice }}₴</div>
                </div>
                <div class="add-to-cart" @click="addToCart()">
                  <img src="/icons/cart.svg" alt="" />
                </div>
              </div>
            </a>
          </swiper-slide>
        </template>
      </swiper>
    </div>
  </div>
</template>
<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import axios from "axios";

export default {
  data() {
    return {
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
      products: [],
    };
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  methods: {
    goToFlavoring(item) {
      this.$router.push({
        path: `/flavoring/`,
        query: { flavoringId: item._id },
      });
    },
  },
  setup() {
    return {
      modules: [Pagination],
    };
  },
  async mounted() {
    let urlStr =
      "https://damp-sands-00500-b961cd19fbea.herokuapp.com/items/products/popular";

    const response = await axios
      .get(urlStr, {})
      .then(function (response) {
        return response.data.popularProducts;
      })
      .catch(function (error) {
        throw error;
      });
    this.products = response;
  },
};
</script>
<style lang="scss">
.popular {
  &__wrap {
    padding: 32px 20px;
  }

  &__title {
    font-size: 24px;
    font-family: tobacco;
    text-align: center;
  }

  .swiper-slide {
    padding: 40px 10px;
    padding-bottom: 64px;
  }
}
</style>
