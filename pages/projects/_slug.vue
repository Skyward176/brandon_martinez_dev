<template>
  <div style="background-color: #ececec; padding: 20px;">
    <div>
      <a-carousel :dot-position="bottom">
        <div v-for="project of projects">
          <h3>{{project.name}}</h3>
        </div>
      </a-carousel>
    </div>

    <a-row :gutter="16">
      <a-col v-for="project of projects" :flex="1">
        <a-card :title=project.name :bordered="false" >
          {{project.description}}
        </a-card>
        <a-divider/>
      </a-col>
    </a-row>
  </div>
</template>
<style scoped>
  .ant-carousel >>> .slick-slide {
    text-align: center;
    background: #364d79;
  }
  .ant-carousel >>> .slick-slide h3 {
    color: #fff;
  }
</style>
<script>
  export default {
    async asyncData({ $content, params }) {
      const projects = await $content('projects').fetch()
      return { projects }
    }
  }
</script>
