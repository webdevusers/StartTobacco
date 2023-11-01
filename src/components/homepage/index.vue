<template>
  <banner />
  <div class="idx">
    <div class="idx__wrap wrap">
      <base-swiper :products="popularProducts" title="Популярні товари" />
    </div>
    <div class="newProducts">
      <base-swiper
        :products="newProducts"
        :isColorBlack="true"
        title="Новинки"
      />
    </div>

    <div class="idx__wrap wrap">
      <base-swiper :products="promotionalProducts" title="Акційні товари" />

      <articleBlock />
      <reviews />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import banner from "../base/TheBanner.vue";
import articleBlock from "../homepage/particles/article.vue";
import reviews from "../homepage/particles/reviews.vue";
import BaseSwiper from "../UI/BaseSwiper.vue";
export default {
  components: {
    banner,
    articleBlock,
    reviews,
    BaseSwiper,
  },
  data() {
    return {
      // products: [],
      popularProducts: [],
      newProducts: [],
      promotionalProducts: [],
      isLoader: false,
      // containerVolume: "0.001",
      // summ: 1,
      // section: {},
      // category: "",
    };
  },
  methods: {
    async fetchGetPromotionalProducts() {
      try {
        this.isLoader = true;
        let urlStr =
          "https://damp-sands-00500-b961cd19fbea.herokuapp.com/items/products/sale";

        const response = await axios.get(urlStr, {});
        this.promotionalProducts = response.data.onSaleProducts;
      } catch (err) {
        console.log(err);
      } finally {
        this.isLoader = false;
      }
    },
    async fetchGetNewProducts() {
      try {
        this.isLoader = true;
        let urlStr =
          "https://damp-sands-00500-b961cd19fbea.herokuapp.com/items/products/new";

        const response = await axios.get(urlStr, {});
        this.newProducts = response.data.newProducts;
      } catch (err) {
        console.log(err);
      } finally {
        this.isLoader = false;
      }
    },
    async fetchGetPopularProducts() {
      try {
        this.isLoader = true;
        let urlStr =
          "https://damp-sands-00500-b961cd19fbea.herokuapp.com/items/products/popular";

        const response = await axios.get(urlStr, {});
        this.popularProducts = response.data.popularProducts;
      } catch (err) {
        console.log(err);
      } finally {
        this.isLoader = false;
      }
    },
  },
  computed: {},
  // const currentParams = { ...this.$route.query };
  mounted() {
    this.$nextTick(async function () {
      this.fetchGetPopularProducts();
      this.fetchGetNewProducts();
      this.fetchGetPromotionalProducts();
    });
  },
};
</script>

<style lang="scss" scoped>
.newProducts {
  background: #292929;
  .discount__title {
    color: #ffffff !important;
  }
}
</style>
