<template>
  <div class="content">
    <div class="content-text">
      <div class="content-text__title">Ласкаво просимо!</div>
      <div class="content-text__desc">Створіть свій особистий кабінет</div>
      <div class="content-text__error" v-if="isError">заповніть всі поля</div>
    </div>
    <div class="content-form">
      <div class="content-form__logo">
        <img src="/images/logo.png" alt="" />
      </div>
      <div class="content-form__items">
        <div class="content-form__items-item">
          <input type="text" placeholder="Повне ім'я" v-model="name" required />
        </div>
        <div class="content-form__items-item">
          <input type="text" placeholder="E-mai" v-model="email" required />
        </div>
        <div class="content-form__items-item">
          <input
            type="text"
            placeholder="Моб. телефон"
            v-model="phone"
            required
          />
        </div>
        <div class="content-form__items-item">
          <input
            type="password"
            placeholder="Пароль"
            v-model="password"
            required
          />
        </div>
        <div class="content-form__items-item">
          <input
            type="password"
            placeholder="Підтвердити пароль"
            v-model="passwordConfirm"
            required
          />
        </div>
      </div>
      <div class="content-form__button" @click="handleAuth">Створити</div>
      <div
        class="content-form__text"
        @click="this.$emit('modal', modal)"
        style="cursor: pointer"
      >
        Увійти у наявний аккаунт
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      name: "",
      email: "",
      phone: "",
      password: "",
      passwordConfirm: "",
      modal: true,
      user: {},
      isError: false,
    };
  },
  props: {
    regContent: Boolean,
  },
  methods: {
    async fetchRegistration() {
      try {
        this.isLoader = true;
        let urlStr = `https://damp-sands-00500-b961cd19fbea.herokuapp.com/user/registration`;
        const response = await axios.post(urlStr, {
          fullName: this.name,
          email: this.email,
          phone: this.phone,
          password: this.password,
        });
        this.user = response.data;
        localStorage.setItem(`user`, JSON.stringify(this.user));
      } catch (err) {
        console.log(err);
      } finally {
        this.isLoader = false;
      }
    },
    handleAuth() {
      if (!this.name && !this.email && !this.phone && !this.password) {
        this.isError = true;
      } else {
        this.fetchRegistration();

        this.$emit("update:regContent", false);
      }
    },
  },
  watch: {
    isError(newValue) {
      if (newValue == true) {
        setTimeout(() => {
          this.isError = false;
        }, 3000);
      }
    },
  },
};
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
  background: #ffffff;

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
    &__error {
      color: #ca0808;
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
          background: #fff;
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
      background: #fdb500;
      box-shadow: 0px 4px 27px -3px rgba(0, 0, 0, 0.25);
    }

    &__text {
      text-align: center;
      padding-top: 15px;
      font-family: tobacco;
      font-size: 16px;
      color: rgba(210, 159, 32, 0.8);
      font-feature-settings:
        "clig" off,
        "liga" off;
      line-height: 22px;
      text-decoration-line: underline;
    }
  }
}
</style>
