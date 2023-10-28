<script setup>
import MyOrders from './userOrders.vue'
import Liked from './userLiked.vue'
import Watched from './userWatched.vue'
import { defineProps, computed } from 'vue'

const props = defineProps(['currentPage'])

const getContentComponent = computed(() => {
    if (props.currentPage === 'Мої замовлення') {
        return MyOrders
    } else if (props.currentPage === 'Обране') {
        return Liked
    } else if (props.currentPage === 'Переглянуті товари') {
        return Watched
    } else {
        return MyOrders
    }
})
</script>

<template>
    <div>
        <div style="background: #fff; padding: 0">
            <!-- Header Content Goes Here -->
        </div>
        <div style="margin: 0 16px">
            <template v-if="getContentComponent">
                <getContentComponent />
            </template>
            <template v-else>
                <div style="margin: 24px 16px">
                    asd
                </div>
            </template>
        </div>
    </div>
</template>
