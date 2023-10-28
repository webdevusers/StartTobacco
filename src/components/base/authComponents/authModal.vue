<template>
    <div class="content">
        <div class="content-text">
            <div class="content-text__title">
                Ласкаво просимо!
            </div>
            <div class="content-text__desc">
                Увійдіть в свій особистий кабінет
            </div>
        </div>
        <div class="content-form">
            <div class="content-form__logo">
                <img src="/images/logo.png" alt="">
            </div>
            <div class="content-form__items">
                <div class="content-form__items-item">
                    <input type="text" placeholder="E-mai" v-model="email" required>
                </div>
                <div class="content-form__items-item">
                    <input type="password" placeholder="Пароль" v-model="password" required>
                </div>
            </div>
            <div class="content-form__button" @click="handleCreate()">
                Увійти
            </div>
            <div class="content-form__text" @click="this.$emit('modal', modal)" style="cursor: pointer">
                Створити аккаунт
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            email: '',
            password: '',
        }
    },
    methods: {
        handleAuth() {
            // Авторизация
        }
    }
}
</script>

<style lang="scss" scoped>
.content {
    position: fixed;
    z-index: 12;
    left: 50%;
    top: 55%;

    transform: translate(-50%, -50%);

    display: grid;
    grid-gap: 50px;
    grid-template-columns: repeat(2, 1fr);

    padding: 50px 100px;
    background: #FFFFFF;

    align-items: center;

    border-radius: 5px;

    &-text {
        &__title {
            padding-top: 40px;
            font-family: tobacco;
            font-size: 32px;
            color: #00000060;
            margin-bottom: 30px;
        }

        &__desc {
            font-family: tobacco;
            font-size: 24px;
            max-width: 200px;
        }
    }

    &-form {
        &__logo {
            margin-bottom: 20px;
        }

        &__items {
            &-item {
                margin-bottom: 10px;

                input {
                    font-family: tobacco;
                    font-size: 14px;

                    border-radius: 3px;
                    background: #FFF;
                    box-shadow: 0px 4px 27px -3px rgba(0, 0, 0, 0.25);
                    border: none;
                    outline: none;
                    width: 320px;
                    padding: 10px 16px;
                }
            }
        }

        &__button {
            cursor: pointer;
            margin-top: 20px;
            display: flex;
            justify-content: center;
            font-family: tobacco;
            font-size: 16px;
            padding: 10px;
            border-radius: 3px;
            background: #FDB500;
            box-shadow: 0px 4px 27px -3px rgba(0, 0, 0, 0.25);
        }

        &__text {
            text-align: center;
            padding-top: 15px;
            font-family: tobacco;
            font-size: 16px;
            color: rgba(210, 159, 32, 0.80);
            font-feature-settings: 'clig' off, 'liga' off;
            line-height: 22px;
            text-decoration-line: underline;
        }
    }
}
</style>