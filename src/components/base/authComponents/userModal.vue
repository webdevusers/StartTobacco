<template>
  <!-- <div class=""> -->
  <div class="background" @click="hideModal">
    <div class="content" @click.stop>
      <div class="">
        <div class="content-form__logo">
          <img src="/images/logo.png" alt="" />
        </div>

        <div class="content-text__title">Ласкаво просимо!</div>
        <div class="content-text__desc">{{ user.name }}</div>

        <div class="content-form__button" @click="goToFlavoring">
          Увійдіть в свій особистий кабінет
        </div>
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
  props: {
    userContent: {
      type: Boolean,
    },
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
        localStorage.setItem(`token`, JSON.stringify(this.token));
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
    hideModal() {
      this.$emit("update:userContent", false);
    },
    goToFlavoring(item) {
      this.hideModal();
      this.$router.push({
        path: `/personal-information`,
        query: { navigation: "my-orders" },
      });
    },
  },
  async created() {
    this.user = JSON.parse(localStorage.getItem(`user`));
  },
};
</script>

<style lang="scss" scoped>
.background {
  z-index: 20;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  display: none;
  background: rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
}
.content {
  // border: 1px solid #000;
  box-shadow: 5px 5px 25px 0px rgba(0, 0, 0, 0.2);
  padding: 50px 100px;
  background: white;
  border-radius: 5px;
  min-width: 250px;
  text-align: center;
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
