<template>
  <div>
    <a-layout>
      <a-menu v-model="current" mode="horizontal" theme="dark">
      <a-menu-item key="home"> <p class='name accent-color'>Brandon Martinez</p></a-menu-item>
        <a-menu-item key="projects" class='navbar-items'> <font-awesome-icon :icon="['fas', 'project-diagram']"/> &nbsp;Projects</a-menu-item>
        <a-menu-item key="about" class='navbar-items'> <font-awesome-icon :icon="['fas', 'id-badge']"/> &nbsp;About Me</a-menu-item>
      </a-menu>

      <a-layout-content>
        <Nuxt/>
      </a-layout-content>


      <a-layout-footer class='navy-background footer'>
        <a-row>
          <a-col>
            <div >
              <ul>
                  <li class='footer_item'><a href='#'>Home</a></li>
                  <li class ='footer_item'><p class='accent-color'>|</p></li>
                  <li class='footer_item'><a href='#'>Projects</a></li>
                  <li class='footer_item'><p><span class='accent-color'>|</span> Find me: </p></li>
                  <li class='footer_item'><p>&nbsp;<font-awesome-icon :icon="['fab', 'github']" class='accent-color'/> Github </p></li>
                  <li class='footer_item'><p>&nbsp;<font-awesome-icon :icon="['fas', 'envelope-open-text']" class='accent-color'/> eMail </p></li>
                  <li class='footer_item'><p>&nbsp;<font-awesome-icon :icon="['fas', 'phone-square-alt']" class='accent-color'/> Phone </p></li>
              </ul>
            </div>
          </a-col>
        </a-row>

      </a-layout-footer>
    </a-layout>
  </div>
</template>

<script>
  export default{}
</script>


<style>
  .name {
    font-size: 1.5rem;
    padding:0;
    margin:auto auto auto auto;
  }
  .accent-color{
    color: #5cb4c4;
  }
  .navbar-items {
    font-size: 1.25rem;
    float:right;
    display:block;
  }
  .navy-background {
    background-color:#001529; 
  }
  .footer {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol','Noto Color Emoji';
    color: #9cadb4;
  }
  li {
      float: left;
  }

  a {
      padding: 8px;
      font-size:1.5 rem;
      color:inherit;
  }
  a:hover {
      text-decoration:none;
      color:inherit;
  }

  ul {
      list-style-type: none;
      margin: 0;
      padding: 0;
  }
  .footer_item{
      color:#9cadb4;;
      font-size:1.5 rem;
  }
  .footer div{
      display:flex;
      align-items: middle;
      justify-content:center;
  }
  .contact-text{
    color: #9cadb4;
  }
</style>
