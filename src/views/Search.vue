<template>
    <div class="wrap">
        <div class="text">
            Ваш запит: {{ query }}
        </div>
        <div class="items">
            <template v-for="(item, idx) in response.products" :key="item?._id">
                <div class="card" :style="{ opacity: item?.stock_quantity === 0 ? '.3' : '1' }">
                    <a class="category__link" href="#" @click.prevent="goToFlavoring(item)">
                        <productCard class="category__item" :title="item?.title" :liked="item.liked"
                            :image-url="item.imageUrl" :old-price="item?.oldPrice" :newPrice="item.newPrice" />
                    </a>
                </div>
            </template>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios';
import productCard from "../components/UI/productCard.vue";

export default {
    data() {
        return {
            query: null,
            response: null,
            user: [],
            token: "",
        };
    },
    components: { productCard },
    async created() {
        this.query = this.$route.query.query || null;
        if (this.query !== null) {
            let urlStr = `https://eshopbackend-72da33f36405.herokuapp.com/items/search/${this.query}`;
            try {
                const response = await axios.get(urlStr);
                this.response = response.data;
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    },
    methods: {
        goToFlavoring(item) {
            this.$router.push({
                path: `/flavoring/`,
                query: { flavoringId: item._id, sectionName: item.categoryId },
            });
        },
        likedProduct(item) {
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
                let urlStr = `https://eshopbackend-72da33f36405.herokuapp.com/user/like`;
                const response = await axios.post(urlStr, {
                    productID: id,
                    userID: this.user._id,
                });
                this.fetchAuthorizationGet(this.token);
            } catch (err) {
                console.log(err);
            }
        },
        async fetchUserDislike(id) {
            try {
                let urlStr = `https://eshopbackend-72da33f36405.herokuapp.com/user/dislike`;
                const response = await axios.post(urlStr, {
                    productID: id,
                    userID: this.user._id,
                });
                this.fetchAuthorizationGet(this.token);
            } catch (err) {
                console.log(err);
            }
        },
        async fetchAuthorizationGet(token) {
            try {
                let urlStr = `https://eshopbackend-72da33f36405.herokuapp.com/user/get/`;
                const response = await axios.post(urlStr, {
                    token: token,
                });
                this.user = response.data.user;
                localStorage.setItem(`user`, JSON.stringify(this.user));
            } catch (err) {
                console.log(err);
            }
        },
    },
    mounted() {
        this.$nextTick(function () {
            this.user = JSON.parse(localStorage.getItem(`user`));
            this.token = JSON.parse(localStorage.getItem(`token`));
        });
    },
};
</script>
  
  
<style lang="scss" scoped>
.text {
    font-size: 24px;
    padding-top: 40px;
}
.items {
    padding-top: 40px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 30px;
    margin-bottom: 60px;
    @media (max-width: 1220px) {
        grid-template-columns: repeat(3, 1fr);
    }
    @media (max-width: 800px) {
        grid-template-columns: repeat(2, 1fr);
    }
    a {
        display: flex;
        justify-content: center;
    }
    @media (max-width: 550px) {
        .product-card {
            width: 175px;
        }
    }
}
</style>
