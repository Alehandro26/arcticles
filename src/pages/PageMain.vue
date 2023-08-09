<template>
    <main class="main">
        <h1 class="main__title">Список опубликованных статей</h1>
        <CArticles v-if="listArticles.length > 0" :list="listArticles" />
        <span v-else class="main__description">Пока нет статей...</span>
    </main>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import CArticles from '../components/CArticles.vue';
import { getData, openDatabase } from "@/db";

const listArticles = ref([]);

onMounted(() => {
    getArticles();
})

async function getArticles() {
    await openDatabase();
    await getData().then((res) => {
        listArticles.value = res;
    });
    listArticles.value.reverse();
}
</script>

<style lang="less" scoped>
.main {
    display: flex;
    flex-direction: column;
    align-items: center;

    &__title {
        padding-bottom: 20px;
    }
}
</style>