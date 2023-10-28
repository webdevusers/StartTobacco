<template>
    <div class="aside">
        <div class="profile">
            <div class="profile-img">
                <img src="/icons/profile.svg" alt="">
            </div>
            <div class="profile-text">
                <div class="profile-text__name">
                    Евгений
                </div>
                <div class="profile-text__email">
                    webdevusers@icloud.com
                </div>
            </div>
        </div>
        <ul>
            <li v-for="(item, idx) in links" :key="idx" :class="{ 'active': item.active === true }" @click="this.$emit('loadPage', item.name)">
                <div class="item-img">
                    <img :src="item.img" alt="">
                </div>
                <div class="item-text">
                    {{ item.name }}
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            loadPage: 'Мої замовлення',
            links: [
                { id: 1, img: '/icons/tasklist.svg', name: 'Мої замовлення', active: true },
                { id: 2, img: '/icons/unliked.svg', name: 'Обране', active: true },
                { id: 3, img: '/icons/watch.svg', name: 'Переглянуті товари', active: false },
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
.profile {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 25px;
    border-bottom: 1px solid #292929;
    padding-bottom: 15px;

    &-img {
        margin-right: 20px;
    }

    &-text {
        font-family: tobacco;

        &__name {
            font-size: 16px;
        }

        &__email {
            font-size: 14px;
            font-weight: 60;
        }
    }
}

.aside {
    max-width: 300px;

    ul {
        li {
            user-select: none;
            margin-bottom: 10px;
            cursor: pointer;
            min-height: 50px;
            padding-left: 10px;
            font-family: tobacco;
            display: flex;
            flex-direction: row;
            align-items: center;

            .item-img {
                min-width: 60px;
            }

            &.active {
                border-radius: 10px;
                background: rgba(239, 202, 0, 0.50);
            }
        }
    }
}</style>