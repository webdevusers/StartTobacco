<template>
    <div class="idx">
        <div class="idx__wrap wrap">
            <aside class="idx-aside">
                <asideM @loadPage="updateCurrentPage"/>
            </aside>
            <main class="idx-content">
                <page-content :currentPage="currentPage"/>
            </main>
        </div>
    </div>
</template>

<script setup>
import asideM from './particles/aside.vue'
import PageContent from './particles/pagecontent.vue'
</script>
<script>
export default {
    data() {
        return {
            currentPage: 'Мої замовлення',
        }
    },
    methods: {
        updateCurrentPage(page) {
            this.currentPage = page;
        }
    }
}
</script>

<style lang="scss" scoped>
.idx__wrap {
    padding: 64px 0;
    display: grid;
    grid-template-columns: 30% 70%;
}
</style>