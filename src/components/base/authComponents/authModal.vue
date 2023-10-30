<template>
  <div class="content">
    <div class="content-text">
      <div class="content-text__title">Ласкаво просимо!</div>
      <div class="content-text__desc">Увійдіть в свій особистий кабінет</div>
    </div>
    <div class="content-form">
      <div class="content-form__logo">
        <img src="/images/logo.png" alt="" />
      </div>
      <div class="content-form__items">
        <div class="content-form__items-item">
          <input type="text" placeholder="E-mai" v-model="email" required />
        </div>
        <div class="content-form__items-item">
          <input
            type="password"
            placeholder="Пароль"
            v-model="password"
            required
          />
        </div>
      </div>
      <div class="content-form__button" @click="handleAuth">Увійти</div>
      <div
        class="content-form__text"
        @click="this.$emit('modal', modal)"
        style="cursor: pointer"
      >
        Створити аккаунт
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      password: "",
      token: "",
      user: "",
    };
  },
  methods: {
    async fetchAuthorizationToken() {
      try {
        this.isLoader = true;
        let urlStr = `https://damp-sands-00500-b961cd19fbea.herokuapp.com/user/authorization`;
        const response = await axios.post(urlStr, {
          email: this.email,
          password: this.password,
        });
        this.token = response.data.token;
        this.fetchAuthorizationGet(response.data.token);
      } catch (err) {
        console.log(err);
      } finally {
        this.isLoader = false;
      }
    },
    async fetchAuthorizationGet(token) {
      try {
        this.isLoader = true;
        let urlStr = `https://damp-sands-00500-b961cd19fbea.herokuapp.com/user/get/`;
        const response = await axios.post(urlStr, {
          token: token,
        });
        this.user = response.data.user;

        localStorage.setItem(`user`, JSON.stringify(this.user));
      } catch (err) {
        console.log(err);
      } finally {
        this.isLoader = false;
      }
    },
    handleAuth() {
      if (!this.email && !this.password) {
        this.isError = true;
      } else {
        this.fetchAuthorizationToken();
        this.$emit("update:authContent", false);
      }

      // Создание аккаунта
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
