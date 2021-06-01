<template>
  <div>
    <a-row>
      <a-col>
        <a-divider><h1 class='accent-color'> About me </h1></a-divider>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span=7>
        <div justify='center' align='center'>
          <img src='/profile_sample.png' width="25%"/>
        </div>
      </a-col>
      <a-col :span=10>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
      </a-col>
      <a-col :span=7>
        <div>
          <a-row>
            <a-col :span=6>
              <font-awesome-icon :icon="['fab', 'js-square']" class='techIcons accent-color'/>   
            </a-col>
            <a-col :span=18>
              <p> JavaScript</p>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span=6>
              <font-awesome-icon :icon="['fab', 'js-square']" class='techIcons accent-color'/>   
            </a-col>
            <a-col :span=18>
              <p> JavaScript</p>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span=6>
              <font-awesome-icon :icon="['fab', 'js-square']" class='techIcons accent-color'/>   
            </a-col>
            <a-col :span=18>
              <p> JavaScript</p>
            </a-col>
          </a-row>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {}
</script>

<style>
.techIcons {
  font-size: 5vw;
}
</style>
