<template>
    <swiper :pagination="true" :modules="modules" class="mySwiper">
        <swiper-slide class="img" v-for="(item, idx) in banners" :key="idx"><img :src="item.src" alt="Start Tobacco banner"></swiper-slide>
    </swiper>
</template>
<script>
import { Swiper, SwiperSlide } from 'swiper/vue';

import 'swiper/css';

import 'swiper/css/pagination';


import { Pagination } from 'swiper/modules';

export default {
    data() {
        return {
            banners: [
                { src: '/banners/1.jpg' },
                { src: '/banners/2.jpg' },
                { src: '/banners/3.jpg' },
                { src: '/banners/4.jpg' },
            ]
        }
    },
    components: {
        Swiper,
        SwiperSlide,
    },
    setup() {
        return {
            modules: [Pagination],
        };
    },
};
</script>
<style lang="scss" scoped>
.img {
    max-width: 1920px;
    width: 100%;
    min-height: 140px;
    img {
        width: 100%;
        object-fit: cover;
    }
}
</style>
  