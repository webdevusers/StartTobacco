<template>
    <div class="category__wrap wrap">
        <template v-for="(item, idx) in categories" :key="idx">
            <div class="category">
                <div>
                    <div class="category__title">
                        {{ item.name }}
                    </div>
                </div>
                <swiper :pagination="true" :modules="modules" class="mySwiper" :slidesPerView="4" :spaceBetween="30"
                    :breakpoints="breakpoints">
                    <template v-for="(itm, idx1) in item.products">
                        <swiper-slide>
                            <div class="product-card">
                                <div class="product-card-img">
                                    <img :src="itm.imageUrl" :alt="title">
                                </div>
                                <div class="product-card-info">
                                    <div class="product-card-liked">
                                        <template v-if="itm.liked">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="20"
                                                viewBox="0 0 24 20" fill="none">
                                                <path
                                                    d="M5.73939 0.0287609C3.81718 0.281561 2.1575 1.35145 1.06512 3.04882C0.56347 3.8298 0.174339 4.89968 0.0383768 5.87477C-0.041325 6.44809 0.0102467 7.7482 0.127455 8.24478C0.455639 9.58552 1.25266 11.0933 2.36848 12.4702C4.27663 14.8266 7.52565 17.481 11.1779 19.6659C11.6983 19.9774 11.7545 20 11.9983 20C12.2421 20 12.2984 19.9774 12.8188 19.6659C14.1128 18.894 15.885 17.6842 17.0852 16.7497C21.2062 13.5491 23.5457 10.4523 23.9583 7.65792C24.0473 7.05752 23.9864 5.80254 23.8457 5.21568C23.5035 3.82528 22.8987 2.75539 21.9142 1.80288C21.1218 1.03996 20.3389 0.574989 19.3074 0.258989C18.6651 0.06036 18.2479 0.00167465 17.4837 0.00167465C17.1086 0.00167465 16.6445 0.0287609 16.4522 0.0648746C15.6037 0.209332 14.6425 0.597561 13.9159 1.08511C13.4048 1.43271 12.6031 2.20465 12.2796 2.67414C12.139 2.87728 12.0124 3.04431 11.9983 3.04431C11.9843 3.04431 11.8577 2.87728 11.717 2.67414C11.4029 2.21819 10.5496 1.39208 10.0667 1.07156C9.36817 0.615618 8.46801 0.240932 7.68505 0.0919609C7.23966 0.00618935 6.17072 -0.0299263 5.73939 0.0287609Z"
                                                    fill="#EFCA00" />
                                            </svg>
                                        </template>
                                        <template v-else>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="27" height="23"
                                                viewBox="0 0 27 23" fill="none">
                                                <path
                                                    d="M6.51596 1.12744L6.51818 1.12714C6.7102 1.10092 7.08574 1.09312 7.49444 1.10664C7.90155 1.1201 8.28421 1.15277 8.48809 1.19217L8.48918 1.19238C9.27699 1.34282 10.2021 1.72762 10.9177 2.196C11.1444 2.34737 11.4841 2.63732 11.8182 2.96262C12.1543 3.2898 12.4459 3.61505 12.5898 3.82462L12.5904 3.82557C12.6704 3.94147 12.748 4.04947 12.8094 4.1307C12.8395 4.17038 12.8696 4.20893 12.8961 4.24019C12.9083 4.25452 12.9271 4.27615 12.9489 4.29756C12.9588 4.30718 12.9802 4.32775 13.0094 4.34927C13.0238 4.35988 13.0508 4.37874 13.0875 4.39681C13.1159 4.4108 13.1977 4.44884 13.3103 4.44884C13.4229 4.44884 13.5047 4.4108 13.5331 4.39681C13.5698 4.37874 13.5968 4.35988 13.6112 4.34927C13.6404 4.32775 13.6619 4.30718 13.6717 4.29756C13.6935 4.27615 13.7123 4.25452 13.7245 4.24019C13.751 4.20893 13.7812 4.17038 13.8112 4.1307C13.8726 4.04947 13.9502 3.94147 14.0302 3.82557L14.0308 3.82465C14.1805 3.60665 14.4615 3.29206 14.7867 2.97595C15.1094 2.66229 15.4454 2.37643 15.6925 2.20758C16.4319 1.71003 17.4184 1.31085 18.276 1.16432L18.2845 1.16288L18.2845 1.1628C18.4468 1.13218 18.9166 1.10194 19.3223 1.10194C20.1164 1.10194 20.5231 1.16083 21.1729 1.36252L21.1741 1.36291C22.2271 1.68666 23.0169 2.15655 23.8302 2.94239C24.8378 3.92095 25.4551 5.01278 25.8091 6.45474C25.8752 6.73241 25.9285 7.20181 25.9517 7.69834C25.975 8.19613 25.9655 8.66839 25.9238 8.95069L25.9237 8.95104C25.5008 11.8261 23.0699 15.1291 18.5781 18.6304L18.5776 18.6308C17.2786 19.6459 15.3533 20.965 13.9527 21.8036L13.9521 21.804C13.6542 21.983 13.5337 22.0508 13.4572 22.0819L13.4547 22.083C13.4231 22.0959 13.4129 22.1001 13.3103 22.1001C13.2077 22.1001 13.1975 22.0959 13.1659 22.083L13.1634 22.0819C13.087 22.0508 12.9664 21.983 12.6686 21.804L12.6685 21.804C8.69735 19.4196 5.1881 16.5355 3.14515 14.0033L3.14502 14.0032C1.95688 12.5317 1.12465 10.9392 0.786122 9.55299C0.733862 9.3293 0.68879 8.87739 0.669738 8.37843C0.650757 7.88132 0.660006 7.40176 0.697461 7.13115L6.51596 1.12744ZM6.51596 1.12744C4.56186 1.38537 2.87009 2.47468 1.74866 4.22334M6.51596 1.12744L1.74866 4.22334M1.74866 4.22334C1.24005 5.01803 0.837195 6.12559 0.697489 7.13095L1.74866 4.22334Z"
                                                    stroke="#292929" />
                                            </svg>
                                        </template>
                                    </div>
                                    <div class="product-card-title">
                                        <h3>{{ itm.title }}</h3>
                                    </div>
                                    <div class="product-card-reviews">
                                        <div class="product-card-reviews-stars">
                                            <img src="/icons/stars.svg" alt="">
                                        </div>
                                        <div class="product-card-reviews-count">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="13"
                                                viewBox="0 0 16 13" fill="none">
                                                <path
                                                    d="M1.76841 0.0686588C1.14568 0.230108 0.538323 0.718301 0.257708 1.27569C-0.0152185 1.82923 0.000157679 1.46789 0.000157679 7.08018V12.1351L0.0924146 12.3273C0.223112 12.6079 0.357653 12.7501 0.622892 12.8808C0.822782 12.9808 0.903506 13 1.13799 13C1.31482 13 1.48396 12.9769 1.5839 12.9347C1.67616 12.9001 2.26814 12.4811 2.90241 12.0044L4.05562 11.1356L9.01442 11.1164C13.5658 11.0972 13.9925 11.0895 14.2039 11.028C15.0649 10.782 15.7261 10.117 15.9337 9.2905C16.0221 8.94838 16.0221 2.13675 15.9337 1.79463C15.7223 0.964319 15.0342 0.276237 14.2039 0.0648146C13.8694 -0.0197544 2.09516 -0.0159101 1.76841 0.0686588ZM14.1001 1.39485C14.3692 1.52939 14.4999 1.66778 14.6421 1.96761L14.742 2.17904L14.7536 5.36959C14.7613 7.28392 14.7497 8.65624 14.7267 8.79847C14.6767 9.11368 14.5883 9.2905 14.3769 9.50577C14.0309 9.85558 14.4922 9.82483 8.803 9.84789L3.78653 9.86711L3.57511 9.96321C3.41751 10.0324 1.89142 11.1356 1.27638 11.6277C1.20334 11.6853 1.23025 2.24054 1.30329 2.03681C1.39939 1.77541 1.6185 1.53708 1.87989 1.40254L2.12207 1.27569H7.99191H13.8656L14.1001 1.39485Z"
                                                    fill="#292929" />
                                                <path
                                                    d="M5.27829 5.04669C4.8247 5.26964 4.83239 5.93466 5.28983 6.15761C5.56275 6.29216 5.83568 6.23834 6.05094 6.0077C6.21239 5.83856 6.2393 5.50413 6.10861 5.27733C5.94716 4.98903 5.58966 4.88908 5.27829 5.04669Z"
                                                    fill="#292929" />
                                                <path
                                                    d="M7.73825 5.04669C7.28466 5.26964 7.29235 5.93466 7.74979 6.15761C8.02271 6.29216 8.29564 6.23834 8.51091 6.0077C8.67236 5.83856 8.69926 5.50413 8.56857 5.27733C8.40712 4.98903 8.04962 4.88908 7.73825 5.04669Z"
                                                    fill="#292929" />
                                                <path
                                                    d="M10.1288 5.04291C9.88664 5.16592 9.82129 5.28508 9.82129 5.60798C9.82129 5.86169 9.82898 5.89244 9.93661 6.00776C10.1403 6.22303 10.4056 6.28838 10.6631 6.18074C10.9168 6.07311 11.0398 5.87706 11.036 5.5657C11.036 5.33121 10.9168 5.1467 10.7016 5.04291C10.5055 4.94681 10.3249 4.94681 10.1288 5.04291Z"
                                                    fill="#292929" />
                                            </svg>
                                            <p>99+</p>
                                        </div>
                                    </div>
                                    <div class="product-card-discount">
                                        <div class="product-card-old-price">
                                            {{ itm.oldPrice }}₴
                                        </div>
                                        <div class="product-card-discount-info" v-if="discount > 0">
                                            - {{ itm.discount.toFixed(0) }}%
                                        </div>
                                    </div>
                                    <div class="product-card-price">
                                        {{ itm.newPrice }}₴
                                    </div>
                                </div>
                                <div class="add-to-cart" @click="addToCart()">
                                    <img src="/icons/cart.svg" alt="">
                                </div>
                            </div>
                        </swiper-slide>
                    </template>
                </swiper>
            </div>
        </template>
    </div>
</template>
<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

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
            }, categories: [
                {
                    name: 'Ароматизатор для тютюну',
                    link: '/',
                    products: [
                        { id: 1, imageUrl: "/images/product.png", liked: true, title: 'Ароматизатор TBA Blueberry (Wild) (Дикая Черника)', isOnSale: true, oldPrice: 29999, newPrice: 249999 },
                        { id: 2, imageUrl: "/images/product.png", liked: true, title: 'Ароматизатор TBA Blueberry (Wild) (Дикая Черника)', isOnSale: true, oldPrice: 29999, newPrice: 249999 },
                        { id: 3, imageUrl: "/images/product.png", liked: false, title: 'Ароматизатор TBA Blueberry (Wild) (Дикая Черника)', isOnSale: true, oldPrice: 29999, newPrice: 249999 },
                        { id: 4, imageUrl: "/images/product.png", liked: false, title: 'Ароматизатор TBA Blueberry (Wild) (Дикая Черника)', isOnSale: true, oldPrice: 29999, newPrice: 249999 },
                        { id: 5, imageUrl: "/images/product.png", liked: false, title: 'Ароматизатор TBA Blueberry (Wild) (Дикая Черника)', isOnSale: true, oldPrice: 29999, newPrice: 249999 },

                    ]
                },
                {
                    name: 'Соуси для тютюну',
                    link: '/',
                    products: [
                        { id: 1, imageUrl: "/images/product.png", liked: true, title: 'Ароматизатор TBA Blueberry (Wild) (Дикая Черника)', isOnSale: true, oldPrice: 29999, newPrice: 249999 },
                        { id: 2, imageUrl: "/images/product.png", liked: true, title: 'Ароматизатор TBA Blueberry (Wild) (Дикая Черника)', isOnSale: true, oldPrice: 29999, newPrice: 249999 },
                        { id: 3, imageUrl: "/images/product.png", liked: false, title: 'Ароматизатор TBA Blueberry (Wild) (Дикая Черника)', isOnSale: true, oldPrice: 29999, newPrice: 249999 },
                        { id: 4, imageUrl: "/images/product.png", liked: false, title: 'Ароматизатор TBA Blueberry (Wild) (Дикая Черника)', isOnSale: true, oldPrice: 29999, newPrice: 249999 },
                        { id: 5, imageUrl: "/images/product.png", liked: false, title: 'Ароматизатор TBA Blueberry (Wild) (Дикая Черника)', isOnSale: true, oldPrice: 29999, newPrice: 249999 },

                    ]
                },
                {
                    name: 'Аксесуари для тютюну',
                    link: '/',
                    products: [
                        { id: 1, imageUrl: "/images/product.png", liked: true, title: 'Ароматизатор TBA Blueberry (Wild) (Дикая Черника)', isOnSale: true, oldPrice: 29999, newPrice: 249999 },
                        { id: 2, imageUrl: "/images/product.png", liked: true, title: 'Ароматизатор TBA Blueberry (Wild) (Дикая Черника)', isOnSale: true, oldPrice: 29999, newPrice: 249999 },
                        { id: 3, imageUrl: "/images/product.png", liked: false, title: 'Ароматизатор TBA Blueberry (Wild) (Дикая Черника)', isOnSale: true, oldPrice: 29999, newPrice: 249999 },
                        { id: 4, imageUrl: "/images/product.png", liked: false, title: 'Ароматизатор TBA Blueberry (Wild) (Дикая Черника)', isOnSale: true, oldPrice: 29999, newPrice: 249999 },
                        { id: 5, imageUrl: "/images/product.png", liked: false, title: 'Ароматизатор TBA Blueberry (Wild) (Дикая Черника)', isOnSale: true, oldPrice: 29999, newPrice: 249999 },

                    ]
                },
                {
                    name: 'Хімічні компоненти',
                    link: '/',
                    products: [
                        { id: 1, imageUrl: "/images/product.png", liked: true, title: 'Ароматизатор TBA Blueberry (Wild) (Дикая Черника)', isOnSale: true, oldPrice: 29999, newPrice: 249999 },
                        { id: 2, imageUrl: "/images/product.png", liked: true, title: 'Ароматизатор TBA Blueberry (Wild) (Дикая Черника)', isOnSale: true, oldPrice: 29999, newPrice: 249999 },
                        { id: 3, imageUrl: "/images/product.png", liked: false, title: 'Ароматизатор TBA Blueberry (Wild) (Дикая Черника)', isOnSale: true, oldPrice: 29999, newPrice: 249999 },
                        { id: 4, imageUrl: "/images/product.png", liked: false, title: 'Ароматизатор TBA Blueberry (Wild) (Дикая Черника)', isOnSale: true, oldPrice: 29999, newPrice: 249999 },
                        { id: 5, imageUrl: "/images/product.png", liked: false, title: 'Ароматизатор TBA Blueberry (Wild) (Дикая Черника)', isOnSale: true, oldPrice: 29999, newPrice: 249999 },

                    ]
                },
                {
                    name: 'Інші товари',
                    link: '/',
                    products: [
                        { id: 1, imageUrl: "/images/product.png", liked: true, title: 'Ароматизатор TBA Blueberry (Wild) (Дикая Черника)', isOnSale: true, oldPrice: 29999, newPrice: 249999 },
                        { id: 2, imageUrl: "/images/product.png", liked: true, title: 'Ароматизатор TBA Blueberry (Wild) (Дикая Черника)', isOnSale: true, oldPrice: 29999, newPrice: 249999 },
                        { id: 3, imageUrl: "/images/product.png", liked: false, title: 'Ароматизатор TBA Blueberry (Wild) (Дикая Черника)', isOnSale: true, oldPrice: 29999, newPrice: 249999 },
                        { id: 4, imageUrl: "/images/product.png", liked: false, title: 'Ароматизатор TBA Blueberry (Wild) (Дикая Черника)', isOnSale: true, oldPrice: 29999, newPrice: 249999 },
                        { id: 5, imageUrl: "/images/product.png", liked: false, title: 'Ароматизатор TBA Blueberry (Wild) (Дикая Черника)', isOnSale: true, oldPrice: 29999, newPrice: 249999 },

                    ]
                },
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
}
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
}
</style>