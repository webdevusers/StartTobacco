<template>
  <div class="reviews">
    <div class="reviews__wrap wrap">
      <div class="reviews-title">Отзывы</div>
      <swiper
        :pagination="true"
        :modules="modules"
        class="reviews"
        :slidesPerView="3"
        :spaceBetween="30"
        :autoplay="autoplay"
        :breakpoints="breakpoints"
      >
        <template v-for="(item, idx) in reviews" :key="idx">
          <swiper-slide
            class="card"
            :style="{ opacity: item?.stock_quantity === 0 ? '.3' : '1' }"
          >
            <div class="reviews-image">
              <img :src="item.src" alt="" />
            </div>
            <div class="reviews-stars">
              <img :src="item.stars" alt="" />
            </div>
            <div class="reviews-name">
              {{ item.name }}
            </div>
            <div class="reviews-desc">
              {{ item.desc }}
            </div>
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
import { Pagination, Autoplay } from "swiper/modules";

export default {
  data() {
    return {
      breakpoints: {
        1220: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 2,
        },
        968: {
          slidesPerView: 2,
        },
        570: {
          slidesPerView: 1,
        },
        320: {
          slidesPerView: 1,
        },
      },

      Autoplay,
      modules: [Autoplay],
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      reviews: [
        {
          name: "Floyd Miles",
          desc: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
          src: "/images/face-1.png",
          stars: "/images/reviews..png",
        },
        {
          name: "Ronald Richards",
          desc: "ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
          src: "/images/face-2.png",
          stars: "/images/reviews..png",
        },
        {
          name: "Savannah Nguyen",
          desc: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.Velit officia consequat duis enim velit mollit.Exercitation veniam consequat sunt nostrud amet.",
          src: "/images/face-3.png",
          stars: "/images/reviews..png",
        },
        {
          name: "Floyd Miles",
          desc: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
          src: "/images/face-1.png",
          stars: "/images/reviews..png",
        },
      ],
    };
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [Pagination, Autoplay],
    };
  },
};
</script>

<style lang="scss" scoped>
.reviews {
  .swiper-pagination .swiper-pagination-bullets .swiper-pagination-horizontal {
    bottom: 0px !important;
  }
  &__wrap {
    padding-bottom: 64px;
  }

  &-title {
    font-size: 24px;
    color: #292929;
    font-family: tobacco;
    margin-bottom: 20px;
  }
  &-stars {
    position: absolute;
    right: 18px;
    top: 18px;
  }
  &-name,
  &-desc {
    font-family: tobacco;
  }
  &-image {
    margin-bottom: 15px;
    img {
      border-radius: 55%;
    }
  }
  &-name {
    font-size: 18px;
    margin-bottom: 20px;
  }
  &-desc {
    font-size: 16px;
  }
}

.card {
  min-height: 300px;
  position: relative;
  border-radius: 3.1px;
  padding: 16px 10px;
  border: 0.776px solid #e7eaec;
  background: #fff;
  @media (max-width: 968px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
</style>
