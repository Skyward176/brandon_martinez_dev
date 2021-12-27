<template>
<<<<<<< HEAD
  <div class="container" style="background-color: #ececec; padding: 20px;">
    <a-card class="box-item" v-for="project in projects" :title=project.name :bordered="false" :key="project.name" hoverable>
      <img
        slot="cover"
        alt="/images/mikuSad.jpg"
        :src=project.img
      />
      <p>{{project.description}}</p>
      <p><a :href=project.url><a-button type="primary">Find it here!</a-button></a></p>
    </a-card>
  </div>
=======
    <div class="container" style="background-color: #ececec; padding: 20px">
        <a-card
            class="box-item"
            v-for="project in projects"
            :title="project.name"
            :bordered="false"
            :key="project.name"
            hoverable
        >
            <img
                slot="cover"
                alt="/images/mikuSad.jpg"
                src="/images/mikuSad.jpg"
            />
            <p>{{ project.description }}</p>
            <p>
                <a :href="project.url"
                    ><a-button type="primary">Find it here!</a-button></a
                >
            </p>
        </a-card>
    </div>
>>>>>>> develop
</template>
<style scoped>
@media (max-width: 599px) {
    .box-item {
<<<<<<< HEAD
      max-width: 80%;
      margin: 1em auto 1em auto;
=======
        width: 80%;
>>>>>>> develop
    }
}
@media (min-width: 600px) {
    .box-item {
<<<<<<< HEAD
      max-width: 49%;
      margin: 1em auto 1em auto;
=======
        width: 49%;
        margin: 1em auto 1em auto;
>>>>>>> develop
    }
}
@media (min-width: 900px) {
    .box-item {
<<<<<<< HEAD
      max-width: 32%;
      margin: 1em auto 1em auto;
=======
        width: 32%;
        margin: 1em auto 1em auto;
>>>>>>> develop
    }
}
.container {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: flex-start;
}
</style>
<script>
export default {
    async asyncData({ $content, params }) {
        const projects = await $content('projects').fetch()
        return { projects }
    },
}
</script>
