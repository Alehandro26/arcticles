<template>
    <section class="article">
        <h2 class="article__title">Напишите свою статью</h2>
        <CAddArticle v-if="checkInput" @add="addArticle" @change="changeArticle" :article="article.text" />
    </section>
</template>

<script setup>
import { useRoute } from 'vue-router';
import CAddArticle from '../components/CAddArticle.vue';
import { openDatabase, addData, updateData, getDataById } from "@/db";
import { computed, ref, onMounted } from 'vue';

const route = useRoute();
const idArticle = ref(null);
const article = ref('');

const checkInput = computed(() => {
    return !idArticle.value || (idArticle.value && article.value)
})

onMounted(async () => {
    await dataById();
})

async function dataById() {
    if(route.params.id) {
        idArticle.value = +route.params.id;
        await openDatabase();
        article.value = await getDataById(idArticle.value);
    }
}

async function addArticle(text) {
    await openDatabase();
    const newArticle = { text };
    addData(newArticle);
}

async function changeArticle(text) {
    await openDatabase();
    const newArticle = { text };

    try {
        await updateData(idArticle.value, newArticle);
    } catch (error) {
        console.error(error);
    }
}
</script>

<style lang="less" scoped>
.article {
    display: flex;
    flex-direction: column;
    align-items: center;

    &__title {
        padding-bottom: 30px;
    }
}
</style>