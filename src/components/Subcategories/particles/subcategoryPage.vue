<template>
  <div class="category__wrap wrap" v-if="!isLoader">
    <div class="category-name">{{ products.title }}</div>

    <div class="category">
      <div>
        <div class="category__title">
          {{ categories.sectionName }}
        </div>
      </div>

      <div class="category__list">
        <template v-for="(item, idx1) in categories.products" :key="item?._id">
          <a class="" href="#" @click.prevent="goToFlavoring(item)">
            <product-card
              class="category__item"
              :title="item?.title"
              :liked="item?.liked"
              :image-url="item?.imageUrl"
              :old-price="item?.oldPrice"
              :newPrice="item?.newPrice"
            />
          </a>
        </template>
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
        query: { flavoringId: item._id },
      });
    },
    async fetchFindSection(id) {
      try {
        this.isLoader = true;
        let urlStr = `https://damp-sands-00500-b961cd19fbea.herokuapp.com/items/section/find/${id}`;
        const response = await axios.get(urlStr, {});

        this.categories = response.data.section;
        console.log(this.categories);
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
        let urlStr = `https://damp-sands-00500-b961cd19fbea.herokuapp.com/items/category/find/${category}`;
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
      this.fetchFindSection(newValue.query.id);
    },
  },
  mounted() {
    this.$nextTick(function () {
      const currentParams = { ...this.$route.query };
      this.fetchFindSection(currentParams.id);
    });
  },
};
</script>
<style lang="scss">
.category {
  margin-bottom: 64px;

  &__wrap {
    padding: 64px 0;
  }

  &__title {
    font-size: 24px;
    font-family: tobacco;
    margin-bottom: 30px;

    @media (max-width: 968px) {
      text-align: center;
    }
  }

  &-name {
    font-size: 32px;
    font-family: tobacco;
    margin-bottom: 40px;
  }
  &__list {
    display: flex;
    flex-wrap: wrap;
  }
  &__item {
    margin-right: 30px;
    margin-bottom: 45px;
  }
}
</style>
