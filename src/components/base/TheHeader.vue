<template>
  <header class="header">
    <div class="header__wrap wrap">
      <router-link to="/">
        <div class="header-logo">
          <img src="/images/logo.png" alt="" />
        </div>
      </router-link>
        <nav class="header-links">
          <router-link to="/">{{ $t('homelink')}}</router-link>
          <router-link to="/about">{{ $t('aboutlink')}}</router-link>
          <router-link to="/contacts">{{ $t('contactlink')}}</router-link>
          <router-link to="/cooperation">{{ $t('cooperationlink')}}</router-link>
        </nav>
        <div class="header-time">
          <div class="header-phone">
            <a href="tel:+380686571828">+38 (068) 657 18 28</a>
            <a href="tel:+380994490452">+38 (099) 449 04 52</a>
          </div>
          <div class="header-time-icon">
            <img src="/icons/workTime.svg" alt="" />
          </div>
          <div class="header-time-dates">
            <div class="header-time-dates__title">8.00 - 20.00</div>
            <div class="header-time-dates__desc">{{ $t('worktime')}}</div>
          </div>
        </div>
      </div>
  </header>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.header-phone {
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  font-family: 'tobacco';
}
.header {
  &__wrap {
    padding-top: 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 20px;

    @media (max-width: 765px) {
      // flex-direction: column;
    }
    @media (max-width: 970px) {
      justify-content: center;
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

    // @media (max-width: 765px) {
    //   display: flex;
    //   justify-content: center;
    //   flex-wrap: wrap;
    // }
    @media (max-width: 970px) {
      display: none;
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

    &-icon {
      width: 20px;
      height: 20px;
    }

    // @media (max-width: 765px) {
    //   display: none;
    // }
    &-dates {
      margin-left: 10px;
      font-family: tobacco;
      font-size: 16px;
    }

    @media (max-width: 970px) {
      display: none;
    }
  }

  &-flex {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>
