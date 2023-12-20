<template>
    <div class="nf">
        <div class="nf__wrap wrap">
            <div class="nf__title">
                404
            </div>
            <div class="nf__desc">
                Нажаль такої сторінки не існує :(
            </div>
            <div class="nf__button">
                <router-link to="/">Перейти на головну</router-link>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
.nf {
    &__wrap {
        padding-top: 100px;
    }
    &__title {
        font-family: tobacco;
        font-size: 48px;
        text-align: center;
    }
    &__desc {
        margin-bottom: 100px;
        padding-top: 60px;
        text-align: center;
        font-size: 24px;
        font-family: tobacco;
    }
    &__button {
        margin-bottom: 100px;
        a {
            max-width: 204px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid #efca00;
            border-radius: 5px;
            margin: 0 auto;
        }
    }
}
</style>