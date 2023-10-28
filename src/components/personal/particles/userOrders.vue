<template>
    <div class="orders">
        <div class="orders__title">
            Мої замовлення
        </div>
        <div class="orders__wrap">
            <template v-for="(item, idx) in products" :key="idx">
                <pc :title="item.title" :liked="item.liked" :image-url="item.imageUrl" :old-price="item.oldPrice" :newPrice="item.newPrice"/>
            </template>
        </div>
    </div>
</template>
<script setup>
import pc from '../../UI/productCard.vue'
</script>
<script>
export default {
    data() {
        return {
            products: [
                {
                    id: 1,
                    imageUrl: "/images/product.png",
                    liked: true,
                    title: "Ароматизатор TBA Blueberry (Wild) (Дикая Черника)",
                    isOnSale: true,
                    oldPrice: 29999,
                    newPrice: 249999,
                },
                {
                    id: 2,
                    imageUrl: "/images/product.png",
                    liked: true,
                    title: "Ароматизатор TBA Blueberry (Wild) (Дикая Черника)",
                    isOnSale: true,
                    oldPrice: 29999,
                    newPrice: 249999,
                },
                {
                    id: 3,
                    imageUrl: "/images/product.png",
                    liked: false,
                    title: "Ароматизатор TBA Blueberry (Wild) (Дикая Черника)",
                    isOnSale: true,
                    oldPrice: 29999,
                    newPrice: 249999,
                },
                {
                    id: 4,
                    imageUrl: "/images/product.png",
                    liked: false,
                    title: "Ароматизатор TBA Blueberry (Wild) (Дикая Черника)",
                    isOnSale: true,
                    oldPrice: 29999,
                    newPrice: 249999,
                },
                {
                    id: 5,
                    imageUrl: "/images/product.png",
                    liked: false,
                    title: "Ароматизатор TBA Blueberry (Wild) (Дикая Черника)",
                    isOnSale: true,
                    oldPrice: 29999,
                    newPrice: 249999,
                },
            ],
        }
    }
}
</script>
<style lang="scss" scoped>
.orders__title {
    margin-bottom: 30px;
    font-size: 24px;
    font-family: tobacco;
}
.orders__wrap {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 30px;
}
</style>