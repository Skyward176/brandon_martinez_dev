<template>
  <div>
    <a-layout>
      <a-menu v-model="current" mode="horizontal" theme="dark">
        <a-menu-item key="home" class='name'> Brandon Martinez</a-menu-item>
        <a-menu-item key="mail"> <a-icon type="profile" />About Me</a-menu-item>
        <a-menu-item key="app"> <a-icon type="appstore" />My Projects</a-menu-item>
      </a-menu>


      <a-layout-content>
        <Nuxt/>
      </a-layout-content>


      <a-layout-footer>
        <div class = 'footer'>
        </div>
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

.name {
  color: orangered;
  font-size: 1.5rem;
}
</style>
