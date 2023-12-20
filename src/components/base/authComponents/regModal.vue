<template>
  <div class="background" @click="hideModal">
    <div class="content" @click.stop>
      <div class="content-text">
        <div class="content-text__title"> {{ $t('welcomeText')}} </div>
        <div class="content-text__desc">{{ $t('createAuth')}}</div>
      </div>
      <div class="content-form">
        <div class="content-form__logo">
          <img src="/images/logo.png" alt="" />
        </div>
        <div class="content-form__items">
          <div class="content-form__items-item">
            <input :class="[
              v$.name.$error ? 'error-color' : '',
              'content-form__items-item-input',
            ]" type="text" :placeholder="$t('fullnameAuth')" v-model="v$.name.$model" required />
          </div>
          <div class="content-form__items-item">
            <input :class="[
              v$.surname.$error ? 'error-color' : '',
              'content-form__items-item-input',
            ]" type="text" :placeholder="$t('surnameAuth')" v-model="v$.surname.$model" required />
          </div>
          <div class="content-form__items-item">
            <input :class="[
              v$.email.$error ? 'error-color' : '',
              'content-form__items-item-input',
            ]" type="text" placeholder="E-mail" v-model="v$.email.$model" required />
          </div>
          <div class="content-form__items-item">
            <input :class="[
              v$.phone.$error ? 'error-color' : '',
              'content-form__items-item-input',
            ]" type="text" placeholder="Моб. телефон" v-model="v$.phone.$model" required />
          </div>
          <div class="content-form__items-item">
            <input :class="[
              v$.password.$error ? 'error-color' : '',
              'content-form__items-item-input',
            ]" type="password" placeholder="Пароль" v-model="v$.password.$model" required />
          </div>
          <div class="content-form__items-item">
            <input :class="[
              v$.passwordConfirm.$error ? 'error-color' : '',
              'content-form__items-item-input',
            ]" type="password" :placeholder="$t('confirmPass')" v-model="v$.passwordConfirm.$model" required />
          </div>
        </div>
        <div class="content-form__button" @click="handleAuth">{{ $t('createPersonal')}}</div>
        <div class="content-form__text" @click="this.$emit('modal', modal)" style="cursor: pointer">
          {{ $t('autentificate')}}
        </div>
      </div>
    </div>
    <div class="modalSuccesfull" v-if="created">
      {{ $t('succefullyAuth') }}
    </div>
  </div>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, sameAs } from "@vuelidate/validators";
import axios from "axios";

export default {
  data() {
    return {
      v$: useVuelidate(),
      name: "",
      surname: "",
      email: "",
      phone: "",
      password: "",
      passwordConfirm: "",
      modal: true,
      user: {},
      created: false,
    };
  },
  props: {
    regContent: {
      type: Boolean,
    },
  },
  methods: {
    async fetchRegistration() {
      try {
        this.isLoader = true;
        let urlStr = `https://eshopbackend-72da33f36405.herokuapp.com/user/registration`;
        const response = await axios.post(urlStr, {
          name: this.name,
          surname: this.surname,
          email: this.email,
          phone: this.phone,
          password: this.password,
        });
        this.user = response.data;
        localStorage.setItem(`user`, JSON.stringify(this.user));
        this.fetchAuthorizationToken();
      } catch (err) {
        console.log(err);
      } finally {
        this.isLoader = false;
      }
    },
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
        // this.fetchAuthorizationGet(response.data.token);
      } catch (err) {
        console.log(err);
      } finally {
        this.isLoader = false;
      }
    },
    hideModal() {
      this.$emit("update:regContent", false);
    },
    handleAuth() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        this.created = true
        return;
      }
      this.fetchRegistration();
      this.hideModal();
    },
  },
  validations() {
    return {
      name: { required, minLength: minLength(3) },
      surname: { required, minLength: minLength(3) },
      email: { required, email },
      phone: { required, minLength: minLength(10) },
      password: { required, minLength: minLength(3) },
      passwordConfirm: { required, sameAs: sameAs(this.password) },
    };
  },
  watch: {
    created(val) {
      if (val === true) {
        setTimeout(() => {
          this.created = false;
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

        &-input {
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
