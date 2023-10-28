<template>
    <div class="cart">
        <div class="cart-content">
            <ul class="items-list">
                <li v-for="item in itemsCart" :key="item.id">
                    <div class="item-remove" @click="deleteItem(item.id)">
                        <img src="/icons/delete.svg" alt="">
                    </div>
                    <div class="item-img">
                        <img :src="item.src" alt="">
                    </div>
                    <div class="item-name">
                        {{ item.name }}
                    </div>
                    <div class="item-price">
                        {{ item.price }}₴
                    </div>
                    <div class="item-count">
                        <p @click="removeCount(item.id)" v-if="item.count > 0">-</p>
                        <input type="number" v-model="item.count">
                        <p @click="addCount(item.id)">+</p>
                    </div>
                </li>
            </ul>
        </div>
        <div class="cart-buttons">
            <div class="cart-buttons-item gray">
                Продовжити покупки
            </div>
            <div class="cart-buttons-item yellow">
                <div class="cart-buttons-item__price">
                    2 999 <span>₴</span>
                </div>
                <div class="cart-buttons-item-btn">
                    Оформити замовлення
                </div>
            </div>
        </div>
        <div class="cart-close" @click="this.$emit('cart', cart)">
            <svg width="32px" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <path d="M19 5L5 19M5 5L9.5 9.5M12 12L19 19" stroke="#000000" stroke-width="1.5" stroke-linecap="round"
                        stroke-linejoin="round"></path>
                </g>
            </svg>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            itemIds: [
                { id: '1' },
                { id: '2' }
            ],
            cart: true,
            itemsCart: [
                {
                    id: 1, src: '/images/product.png', name: 'Ароматизатор TBA Blueberry (Wild) (Дикая Черника)', price: 2999, count: 1
                },
                {
                    id: 2, src: '/images/product.png', name: 'Ароматизатор TBA Blueberry (Wild) (Дикая Черника)', price: 2999, count: 1
                },
            ]
        }
    },
    methods: {
        getItems() {
            axios.post('local', {}).then((responce) => { responce = this.itemsCart });
        },
        removeCount(id) {
            const item = this.itemsCart.find(item => item.id === id);

            if (item) {
                item.count -= 1
            } else {
                console.log('Элемент не найден')
            }
        },
        addCount(id) {
            const item = this.itemsCart.find(item => item.id === id);

            if (item) {
                item.count += 1
            } else {
                console.log('Элемент не найден')
            }
        },
        deleteItem(id) {
            const index = this.itemsCart.findIndex(item => item.id === id);

            if (index !== -1) {
                this.itemsCart.splice(index, 1);
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.cart {
    z-index: 13;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    background: white;
    border-radius: 5px;
    padding: 50px 100px;
    &-close {
        cursor: pointer;
        position: absolute;
        right: 32px;
        top: 32px;
    }
    &-buttons {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        padding-top: 40px;

        &-item {
            &.gray {
                border-radius: 5px;
                border: 2px solid #E8E7E7;
                background: #F5F5F5;

                padding: 12px 20px;

                font-family: tobacco;
                font-size: 16px;
            }

            &.yellow {
                border-radius: 10px;
                border: 1px solid #EFCA00;
                background: rgba(239, 202, 0, 0.20);
                display: flex;
                flex-direction: row;
                align-items: center;
                padding: 14px 12px;
            }

            &__price {
                color: #000;
                margin-right: 20px;
                font-family: tobacco;
                font-size: 30px;
                font-style: normal;
                font-weight: 500;
                line-height: normal;

                span {
                    font-size: 16px;
                }
            }

            &-btn {
                border-radius: 7px;
                background: #EFCA00;
                padding: 10px 20px;
                font-family: tobacco;
            }
        }
    }
}

.items-list {
    li {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }
}

.item {
    &-count {
        padding-left: 20px;
        display: flex;
        flex-direction: row;
        align-items: center;

        font-family: tobacco;

        p {
            font-size: 24px;
            padding: 7.5px;
            user-select: none;
            cursor: pointer;
        }

        input {
            width: 50px;
            height: 25px;
            font-size: 18px;
            font-family: tobacco;
            border-radius: 3px;
            border: 1px solid rgba(0, 0, 0, 0.50);
            background: rgba(216, 216, 216, 0.40);
            text-align: center;
            padding-left: 5px;
        }
    }

    &-price {
        font-size: 20px;
        font-weight: 800;
        font-family: tobacco;
    }

    &-name {
        font-family: tobacco;
        font-size: 20px;
        max-width: 300px;
        margin-right: 20px;
    }
}</style>