<template>
  <div class="background" @click="hideModal">
    <div class="content" @click.stop>
      <div class="content-text">
        <div class="content-text__title">{{ $t('welcomeText')}}</div>
        <div class="content-text__desc">{{ $t('loginAuth')}}</div>
      </div>
      <div class="content-form">
        <div class="content-form__logo">
          <img src="/images/logo.png" alt="" />
        </div>
        <div class="content-form__items">
          <div class="content-form__items-item">
            <input type="text" placeholder="E-mail" v-model="email" required />
          </div>
          <div class="content-form__items-item">
            <input type="password" placeholder="Пароль" v-model="password" required />
          </div>
        </div>
        <div class="content-form__button" @click="handleAuth">{{ $t('vhodVAccount') }}</div>
        <div class="content-form__text" @click="this.$emit('modal', modal)" style="cursor: pointer">
          {{ $t('createAccount')}}
        </div>
      </div>
    </div>
    <div class="modalSuccesfull" v-if="auth">
      {{ $t('succefullyAuth1')}}
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
      auth: false
    };
  },
  props: {
    authContent: {
      type: Boolean,
    },
  },
  methods: {
    async fetchAuthorizationToken() {
      try {
        this.isLoader = true;
        let urlStr = `https://eshopbackend-72da33f36405.herokuapp.com/user/authorization`;
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
        let urlStr = `https://eshopbackend-72da33f36405.herokuapp.com/user/get/`;
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
      this.$emit("update:authContent", false);
    },
    handleAuth() {
      this.auth = true;
      if (!this.email && !this.password) {
        this.isError = true;
      } else {
        this.fetchAuthorizationToken();
        this.hideModal();
      }

      // Создание аккаунта
    },
  },
  watch: {
    auth(val) {
      if (val === true) {
        setTimeout(() => {
          this.auth = false;
        }, 3000);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@keyframes addedToCart {
  from {
    top: 0px;
  }

  to {
    top: 75px;
  }
}

.modalSuccesfull {
  position: fixed;
  top: 75px;
  right: 100px;
  background: #15ff00;
  padding: 20px;
  z-index: 15;
  border-radius: 10px;
  color: #292929;
  animation: addedToCart 1.2s;

  @media (max-width: 540px) {
    right: 20px;
  }
}

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
  display: grid;
  grid-gap: 50px;
  grid-template-columns: repeat(2, 1fr);

  @media (max-width: 570px) {
    grid-template-columns: repeat(1, 1fr);
  }

  box-shadow: 5px 5px 25px 0px rgba(0, 0, 0, 0.2);
  padding: 50px 100px;
  background: white;
  border-radius: 5px;
  min-width: 375px;

  @media (max-width: 765px) {
    padding: 40px;
  }

  @media (max-width: 570px) {
    padding: 20px;
  }

  &-text {
    &__title {
      padding-top: 40px;
      font-family: tobacco;
      font-size: 32px;
      color: #00000060;
      margin-bottom: 30px;

      @media (max-width: 570px) {
        font-size: 16px;
      }
    }

    &__desc {
      font-family: tobacco;
      font-size: 24px;
      max-width: 200px;

      @media (max-width: 570px) {
        font-size: 15px;
      }
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
          border: 1px solid rgba(0, 0, 0, 0.50);
          outline: none;
          width: 320px;
          padding: 10px 16px;

          @media (max-width: 570px) {
            width: 100%;
          }
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

.error-color {
  border: 1px solid red;
}
</style>
