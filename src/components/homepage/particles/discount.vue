<template>
  <div class="discount" v-if="products.length > 0">
    <!-- {{ products }} -->
    <div class="discount__wrap wrap">
      <div class="discount__title">Акційні товари</div>
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
              <product-card
                :title="item.title"
                :liked="item.liked"
                :image-url="item.imageUrl"
                :old-price="item.oldPrice"
                :newPrice="item.newPrice"
              />
            </a>
          </swiper-slide>
        </template>
      </swiper>
    </div>
  </div>
</template>
<script>
import productCard from "../../UI/productCard.vue";
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
    productCard,
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
  mounted() {
    this.$nextTick(async function () {
      let urlStr =
        "https://damp-sands-00500-b961cd19fbea.herokuapp.com/items/products/sale";

      const response = await axios
        .get(urlStr, {})
        .then(function (response) {
          return response.data.onSaleProducts;
        })
        .catch(function (error) {
          throw error;
        });
      this.products = response;
    });
  },
};
</script>
<style lang="scss">
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

  .swiper-slide {
    padding: 40px 10px;
    padding-bottom: 64px;
  }
}
</style>
