<template>
    <swiper :pagination="true" :modules="modules" class="mySwiper" :loop="true" :autoplay="{ delay: 3000 }">
        <swiper-slide class="banner-image"><img src="https://firebasestorage.googleapis.com/v0/b/starttobacco-6ed2b.appspot.com/o/webp-banners%2F1-min.webp?alt=media&token=8bb36cd4-9d69-4f57-8042-f5c3ffc77593" alt="Start Tobacco banner"></swiper-slide>
        <swiper-slide class="banner-image"><img src="https://firebasestorage.googleapis.com/v0/b/starttobacco-6ed2b.appspot.com/o/webp-banners%2F2-min.webp?alt=media&token=79045404-da0a-44aa-812b-0648905768d3" alt="Start Tobacco banner"></swiper-slide>
        <swiper-slide class="banner-image"><img src="https://firebasestorage.googleapis.com/v0/b/starttobacco-6ed2b.appspot.com/o/webp-banners%2F3-min.webp?alt=media&token=31090474-3e5b-49dd-94db-8780615336a7" alt="Start Tobacco banner"></swiper-slide>
        <swiper-slide class="banner-image"><img src="https://firebasestorage.googleapis.com/v0/b/starttobacco-6ed2b.appspot.com/o/webp-banners%2F4-min.webp?alt=media&token=f927d56b-a674-4da2-8702-b8e2ffc7c81e" alt="Start Tobacco banner"></swiper-slide>
    </swiper>
</template>
<script>
import { Swiper, SwiperSlide } from 'swiper/vue';

import 'swiper/css';

import 'swiper/css/pagination';


import { Pagination, Autoplay } from 'swiper/modules';

export default {
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
<style lang="scss">
.banner-image {
    max-width: 1920px;
    width: 100%;
    min-height: 110px;
    display: block !important;
    img {
        width: 100%;
        object-fit: cover;
    }
}
</style>
  