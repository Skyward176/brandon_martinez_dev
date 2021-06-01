<template>
  <div>
    <a-row>
      <a-col>
        <a-divider><h1 class='accent-color'> About me </h1></a-divider>
      </a-col>
    </a-row>
    <a-row :gutter='{xs: 8, sm: 16, md: 24, lg: 32}'>
      <a-col :span=7>
        <div justify='center' align='center'>
          <img src='/profile_sample.png' width="25%"/>
        </div>
      </a-col>
      <a-col :span=10>
        <div class='main-text'>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
        </div>
      </a-col>
      <a-col :span=7>
        <a-row type='flex' justify='center'>
          <a-col>
            <h1 class='accent-color'> Technologies </h1>
            <div class='main-text'>
              <ul class='tech-list'>
                <li><font-awesome-icon :icon="['fab', 'js-square']" class='tech-icons accent-color'/> <p> &nbsp;JavaScript</p></li>
                <li><font-awesome-icon :icon="['fab', 'js-square']" class='tech-icons accent-color'/> <p> &nbsp;JavaScript</p></li>
                <li><font-awesome-icon :icon="['fab', 'js-square']" class='tech-icons accent-color'/> <p> &nbsp;JavaScript</p></li>
                <li><font-awesome-icon :icon="['fab', 'js-square']" class='tech-icons accent-color'/> <p> &nbsp;JavaScript</p></li>
                <li><font-awesome-icon :icon="['fab', 'js-square']" class='tech-icons accent-color'/> <p> &nbsp;JavaScript</p></li>
                <li><font-awesome-icon :icon="['fab', 'js-square']" class='tech-icons accent-color'/> <p> &nbsp;JavaScript</p></li>
                <li><font-awesome-icon :icon="['fab', 'js-square']" class='tech-icons accent-color'/> <p> &nbsp;JavaScript</p></li>
                <li><font-awesome-icon :icon="['fab', 'js-square']" class='tech-icons accent-color'/> <p> &nbsp;JavaScript</p></li>
              </ul>
            </div>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {}
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
