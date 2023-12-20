<template>
  <div class="reviews">
    <div class="reviews__wrap wrap">
      <div class="reviews-title">{{ $t('reviews') }}</div>
      <swiper :pagination="true" :modules="modules" class="reviews" :slidesPerView="3" :spaceBetween="30"
        :autoplay="autoplay" :breakpoints="breakpoints">
        <template v-for="(item, idx) in reviews" :key="idx">
          <swiper-slide class="card" :style="{ opacity: item?.stock_quantity === 0 ? '.3' : '1' }">
            <div class="reviews-image">
              <img src="/icons/user-icon.svg" alt="" />
            </div>
            <div class="reviews-name">
              {{ item.name }}
            </div>
            <div class="reviews-desc">
              {{ item.text }}
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
import axios from 'axios'
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
          name: "Олександр",
          desc: "Купував неодноразово соуси та ароматизатори, як завжди виправдовують очікування.",
          src: "/icons/user-icon.svg",
        },
        {
          name: "Мирослав",
          desc: "Маю дуже велику компанію друзів курців, пригостив оброблений тютюн соусом, друзі були в захваті , що на скільки приємна кожна затяжка!",
          src: "/icons/user-icon.svg",
        },
        {
          name: "Олег",
          desc: "Привіт, мій досвід в курінні вже понад 15 років але з соусами зіштовхнувся вперше, дуже здивувався , що це дійсно працює.",
          src: "/icons/user-icon.svg",
        },
        {
          name: "Олена",
          desc: 'Маємо власний магазин тютюнових виробів, працюємо не один рік з компанією "Старт Тобако" , мої клієнти всі задоволенні якістю мого тютюну, соусуємо тютюн з 2015 року.',
          src: "/icons/user-icon.svg",
        },
        {
          name: "Микола",
          desc: 'Отримав дуже швидко, менеджер дуже ввічливий, допоможе у виборі, так як для мене це було вперше.',
          src: "/icons/user-icon.svg",
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
  created() {
    let urlStr;

    if (this.$i18n.locale === 'ua') {
      urlStr = "https://eshopbackend-72da33f36405.herokuapp.com/review/all";
    } else {
      urlStr = "https://starttobacco-ru-2065f143b724.herokuapp.com/review/all";
    }

    axios.get(urlStr, {}).then((response) => {
      this.reviews = response.data.items;
    });
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
