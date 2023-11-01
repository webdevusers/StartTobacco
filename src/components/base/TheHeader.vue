<template>
  <header class="header">
    <div class="header__wrap wrap">
      <router-link to="/">
        <div class="header-logo">
          <img src="/images/logo.png" alt="" />
        </div>
      </router-link>
      <div class="header-flex">
        <nav class="header-links">
          <router-link to="#">Головна</router-link>
          <router-link to="#">Про нас</router-link>
          <router-link to="#">Контакти</router-link>
          <router-link to="#">Співпраця</router-link>
          <button @click="isOpen = !isOpen" class="schedule">
            Графік роботи
          </button>
        </nav>
        <div class="header-time">
          <div class="header-time-icon">
            <img src="/icons/workTime.svg" alt="" />
          </div>
          <div class="header-time-dates">
            <div class="header-time-dates__title">8.00 - 20.00</div>
            <div class="header-time-dates__desc">Без вихідних</div>
          </div>
        </div>
        <div class="schedule">
          <!-- <button @click="isOpen = !isOpen">Графік роботи</button> -->
          <div class="schedule-time" v-if="isOpen">
            <div class="schedule-box">
              <div class="schedule-time-icon">
                <img src="/icons/workTime.svg" alt="" />
              </div>
              <div class="schedule-time-dates">
                <div class="schedule-time-dates__title">8.00 - 20.00</div>
                <div class="schedule-time-dates__desc">Без вихідних</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
    };
  },
};
</script>

<style lang="scss" scoped>
.header {
  &__wrap {
    padding-top: 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 20px;
    @media (max-width: 765px) {
      flex-direction: column;
    }
  }

  &-logo {
    img {
      user-select: none;
    }
  }

  &-links {
    a {
      margin-right: 35px;
      text-decoration: none;
      color: #292929;
      font-family: tobacco;
      border-bottom: 1px solid transparent;
      transition: 0.3s;
      padding-bottom: 3px;

      &:hover {
        border-color: #333333;
      }

      user-select: none;
    }
    @media (max-width: 765px) {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
    }
  }
  &-box {
    position: absolute;
  }
  &-time {
    display: flex;
    flex-direction: row;
    align-items: center;
    user-select: none;
    position: relative;
    flex-wrap: wrap;

    @media (max-width: 765px) {
      display: none;
    }
    &-dates {
      margin-left: 10px;
      font-family: tobacco;
      font-size: 16px;
    }
  }
  &-flex {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
}
.schedule {
  display: none;
  @media (max-width: 765px) {
    display: block;
  }
  &-box {
    position: absolute;
    top: 0;
    background: #ffffff;
    z-index: 20;
    padding: 10px;
    border-radius: 5px;
    width: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    box-shadow: 5px 5px 25px 0px rgba(0, 0, 0, 0.2);
  }
  &-time {
    display: flex;
    // flex-direction: wrow;
    align-items: center;
    user-select: none;
    position: relative;
    flex-wrap: wrap;
    justify-content: center;
    &-icon {
      width: 20px;
      height: 20px;
    }
    &-dates {
      margin-left: 10px;
      font-family: tobacco;
      font-size: 16px;
    }
  }
}
</style>
