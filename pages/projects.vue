<template>
  <div>
    <a-card title="Default size card" style="width: 300px">
      <a slot="extra" href="#">more</a>
      <p> {{projects[0].name}}</p>
      <p>{{projects[0].description}}</p>
      <p>card content</p>
    </a-card>
  </div>
</template>

<script>
export default {
  async asyncData ({ $content }) {
    const projects = await $content('projects').fetch()

    return{
      projects
    }
  }
}
</script>

<style>
h1 {
  font-size: 2.5rem;
}
.main-text p{
  font-size: 1.5rem;
}
.tech-icons {
  font-size: 2rem;
}
.tech-list {
    list-style-type: none;
}
.tech-list li {
    justify-content: left;
    display:flex;
}
</style>
