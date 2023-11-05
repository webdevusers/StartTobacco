<template>
    <div class="contacts">
        <div class="contacts__wrap wrap">
            <div>
                <div class="contacts-img">
                    <img src="/images/hakeshake.png" alt="">
                </div>
                <div class="contacts-text">
                    <p>
                        Добро пожаловать в наш интернет-магазин табачных изделий! Мы гордимся предоставлением широкого
                        ассортимента высококачественных табачных товаров для истинных ценителей.

                        Если у вас есть вопросы, предложения или вам нужна помощь, не стесняйтесь связаться с нами. Наша
                        команда всегда готова помочь вам с выбором продукции или предоставить дополнительную информацию.
                    </p>
                </div>
            </div>
            <div>
                <form>
                    <input type="text" placeholder="Як вас звати?" id="" v-model="name">
                    <input type="text" placeholder="Ваш мобільний телефон" id="" v-model="phone">
                    <textarea name="" id="" cols="30" rows="10" placeholder="Коментар" v-model="comment" />
                    <button @click="sendMessage">
                        Відправити
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios'

export default {
    data() {
        return {
            name: '',
            phone: '',
            comment: ''
        }
    },
    methods: {
        sendMessage() {
            const token = '6700460046:AAHX2VEGlAkcmhXh2_S2zLvk_whH1eKghZU';
            const chatId = '@asdopklasdpkoaspodop';
            const message = 'Ваше сообщение здесь';

            const apiUrl = `https://api.telegram.org/bot${token}/sendMessage`;

            axios.post(apiUrl, {
                chat_id: chatId,
                text: `Контакты: ${this.name}, Номер телефона: ${this.phone}, Комментарий ${this.comment}`,
            })
                .then(response => {
                    console.log('Сообщение успешно отправлено:', response.data);
                })
                .catch(error => {
                    console.error('Ошибка при отправке сообщения:', error.response.data);
                });
        },
    }
}
</script>

<style lang="scss" scoped>
.contacts {
    &__wrap {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 50px;
        padding: 80px 0;

        @media (max-width: 1140px) {
            grid-template-columns: repeat(1, 1fr);
        }
    }

    &-img {
        max-width: 450px;
        width: 100%;
        margin-bottom: 40px;

        img {
            width: 100%;
            border-radius: 15px;
        }
    }

    &-text {
        font-family: 'tobacco';
    }
}

form {
    background: #292929;
    padding: 25px;
    display: flex;
    flex-direction: column;

    input {
        background: none;
        margin-bottom: 20px;
        background: white;
        padding: 10px;
        border-radius: 10px;
    }

    textarea {
        margin-bottom: 20px;
        background: none;
        background: white;
        padding: 10px;
        border-radius: 10px;
        max-height: 120px;
    }

    button {
        background: #efca00;
        border-radius: 10px;
        color: white;
        padding: 10px;
    }
}
</style>