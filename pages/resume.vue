<template>
    <div class ='flex p-4'>
        <nuxt-content :document="resume" />
    </div>
</template>
<script>
export default {
    async asyncData({ $content, params }) {
        const resume = await $content('resume').fetch()
        return { resume }
    },
}

</script>
<style>
    .flex{
        display:flex;
    }
    .p-4{
        padding:2rem;
    }
</style>
