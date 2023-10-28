<template>
    <div class="action">
        <div class="action__wrap wrap">
            <div class="action-top">
                <div class="action-categories">
                    <div class="action-categories-icon">
                        <img src="/icons/burger-menu.svg" alt="">
                    </div>
                    <div class="action-categories-title">
                        <router-link to="/allcategories">Топ категорій</router-link>
                    </div>
                </div>
                <div class="action-search">
                    <div class="action-search-input">
                        <input type="text" placeholder="Введите ваш запрос" v-model="request">
                    </div>
                    <div class="action-search-button">
                        <img src="/icons/search.svg" alt="">
                    </div>
                </div>
                <div class="action-personal">
                    <div class="action-personal-item" @click="regContent = !regContent" style="cursor:pointer"><img
                            src="/icons/personal.svg" alt=""></div>
                    <div class="action-personal-item"><router-link to="#"><img src="/icons/liked.svg" alt=""></router-link>
                    </div>
                    <div class="action-personal-item" @click="cartContent = !cartContent" style="cursor:pointer"><img
                            src="/icons/cart.svg" alt="">
                    </div>
                </div>
            </div>
            <div class="action-bottom">
                <div class="action-bottom-items">
                    <template v-for="(item, idx) in categories" :key="idx">
                        <div class="action-bottom-item" @mouseleave="this.showCategory = ''">
                            <div class="action-bottom-name" @mouseenter="showCategory = item.categoryName">
                                <div class="action-bottom-name__title">
                                    {{ item.categoryName }}
                                </div>
                                <div class="action-bottom-name__icon">
                                    <svg style="max-width: 24px" fill="#ffffff" version="1.1" id="Layer_1"
                                        xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                        width="64px" height="64px" viewBox="0 0 100 100" enable-background="new 0 0 100 100"
                                        xml:space="preserve">
                                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                        <g id="SVGRepo_iconCarrier">
                                            <g>
                                                <path
                                                    d="M78.466,35.559L50.15,63.633L22.078,35.317c-0.777-0.785-2.044-0.789-2.828-0.012s-0.789,2.044-0.012,2.827L48.432,67.58 c0.365,0.368,0.835,0.563,1.312,0.589c0.139,0.008,0.278-0.001,0.415-0.021c0.054,0.008,0.106,0.021,0.16,0.022 c0.544,0.029,1.099-0.162,1.515-0.576l29.447-29.196c0.785-0.777,0.79-2.043,0.012-2.828S79.249,34.781,78.466,35.559z">
                                                </path>
                                            </g>
                                        </g>
                                    </svg>
                                </div>


                                <template v-if="showCategory === item.categoryName" @mouseenter="this.showCategory = item.categoryName">
                                    <div class="action-bottom-subcategories">
                                        <div class="action-bottom-subcategories__link">
                                            <template v-for="(itm, idx) in item.subcategories">
                                                <div class="action-bottom-subcategories__text">
                                                    {{ itm.subcategoryName }}
                                                </div>
                                            </template>
                                        </div>
                                    </div>
                                </template>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </div>
        <regModal v-if="regContent" @modal="regContent = !regContent, authContent = true" />
        <authModal v-if="authContent" @modal="authContent = !authContent, regContent = true" />

        <cart v-if="cartContent" @cart="cartContent = !cartContent"/>
    </div>
</template>
<script setup>
import regModal from './authComponents/regModal.vue';
import authModal from './authComponents/authModal.vue'
import cart from './cart.vue'
</script>
<script>
export default {
    data() {
        return {
            request: '',
            showCategory: '',
            regContent: false,
            authContent: false,
            cartContent: false,
            categories: [
                {
                    categoryName: 'Ароматизатори для тютюну',
                    image: '/images/subcategories.jpg',
                    subcategories: [
                        {
                            subcategoryName: 'Подкатегория 1',
                        },
                        {
                            subcategoryName: 'Подкатегория 2',
                        },
                        {
                            subcategoryName: 'Подкатегория 3',
                        }
                    ],
                },
                {
                    categoryName: 'Соуси для тютюну',
                    image: '/images/subcategories.jpg',
                    subcategories: [
                        {
                            subcategoryName: 'Подкатегория 1',
                        },
                        {
                            subcategoryName: 'Подкатегория 2',
                        },
                        {
                            subcategoryName: 'Подкатегория 3',
                        }
                    ],
                },
                {
                    categoryName: 'Аксесуари для тютюну',
                    subcategories: [
                        {
                            subcategoryName: 'Подкатегория 1',
                        },
                        {
                            subcategoryName: 'Подкатегория 2',
                        },
                        {
                            subcategoryName: 'Подкатегория 3',
                        }
                    ],
                    image: '/images/subcategories.jpg',
                },
                {
                    categoryName: 'Хімічні компоненти',
                    subcategories: [
                        {
                            subcategoryName: 'Подкатегория 1',
                        },
                        {
                            subcategoryName: 'Подкатегория 2',
                        },
                        {
                            subcategoryName: 'Подкатегория 3',
                        }
                    ],
                    image: '/images/subcategories.jpg',
                },
                {
                    categoryName: 'Інші товари',
                    subcategories: [
                        {
                            subcategoryName: 'Подкатегория 1',
                        },
                        {
                            subcategoryName: 'Подкатегория 2',
                        },
                        {
                            subcategoryName: 'Подкатегория 3',
                        }
                    ],
                    image: '/images/subcategories.jpg',
                },
            ]
        }
    },
    methods: {
        clearCategory() {
            this.showCategory = null;
        }
    }
}
</script>

<style lang="scss" scoped>
.action {
    background: #292929;
    position: relative;

    &__wrap {
        display: flex;
        flex-direction: column;
        padding: 15px 20px;
    }

    &-top {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
    }

    &-categories {
        user-select: none;
        cursor: pointer;
        border-radius: 5px;
        background: rgba(90, 89, 89, 0.50);
        padding: 7.5px 20px;
        display: flex;
        flex-direction: row;
        align-items: center;

        &-icon {
            max-width: 24px;
            width: 100%;

            img {
                width: 100%;
            }

            margin-right: 15px;
        }

        &-title {
            font-family: tobacco;

            a {
                color: white;
                text-decoration: none;
            }

            font-size: 18px;
        }
    }

    &-search {
        display: flex;
        flex-direction: row;
        align-items: center;

        &-input {
            input {
                border-radius: 5px 0px 0px 5px;
                width: 545px;
                padding: 8px 12px;
                border: none;

                &:focus {
                    outline: none;
                    border: none;
                }

                @media (max-width: 1220px) {
                    width: 480px
                }
            }
        }

        &-button {
            background: #EFCA00;
            border-radius: 0px 5px 5px 0px;
            padding: 8px 20px;
            cursor: pointer;
            user-select: none;
        }
    }

    &-personal {
        display: flex;
        flex-direction: row;
        align-items: center;

        &-item {
            padding: 7.5px;
            transition: .3s;

            &:hover {
                scale: (1.25);
            }
        }
    }

    &-bottom {
        position: relative;

        &-items {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
        }

        &-item {
            margin-right: 30px;
            user-select: none;

            @media (max-width: 1220px) {
                margin-right: 25px;
            }
        }

        &-name {
            display: flex;
            flex-direction: row;
            align-items: center;
            color: white;
            font-size: 18px;
            font-family: tobacco;
            cursor: pointer;

            &__title {
                font-size: 18px;

            }

            &__icon {
                padding-top: 8px;
                margin-left: 10px;
                transition: .3s;
            }
        }

        &-subcategories {
            z-index: 11;
            position: absolute;
            bottom: -140px;

            display: flex;
            flex-direction: column;
            align-items: center;
            padding-top: 50px;
            padding: 5px 10px;
            background: #292929;
            border-radius: 0px 0px 5px 5px;

            @media (max-width: 1220px) {
                padding: 20px 5px;
            }

            &__text {
                padding: 10px;
                transition: .3s;
                white-space: pre;
                &:hover {
                    background: #5A595980;
                    border-radius: 10px;
                }
            }

        }

    }
}</style>