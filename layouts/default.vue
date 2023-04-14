<template>
    <div class="page-wrapper">
        <a-layout>
            <a-menu v-model="current" mode="horizontal" theme="dark" class="black">
                <a-menu-item key="home">
                    <nuxt-link to="/">
                        <p class="name accent-color">
                            Brandon Martinez
                        </p>
                    </nuxt-link>
                </a-menu-item>
                <a-menu-item key="projects" class="navbar-items">
                    <nuxt-link to="projects"
                        ><font-awesome-icon
                            :icon="['fas', 'project-diagram']"
                        />
                        &nbsp;Projects
                    </nuxt-link></a-menu-item
                >
                <a-menu-item key="about" class="navbar-items">
                    <nuxt-link to="/"
                        ><font-awesome-icon :icon="['fas', 'id-badge']" />
                        &nbsp;About Me</nuxt-link
                    ></a-menu-item
                >
                <a-menu-item key="resume" class="navbar-items">
                    <nuxt-link to="resume"
                        ><font-awesome-icon :icon="['fas', 'file-alt']" />
                        &nbsp;Resume</nuxt-link
                    ></a-menu-item
                >
            </a-menu>

            <a-layout-content>
                <Nuxt />
            </a-layout-content>

            <a-layout-footer class="dark-background footer">
                <a-row>
                    <a-col>
                        <div>
                            <ul>
                                <li class="footer_item">
                                    <a href="/">Home</a>
                                </li>
                                <li class="footer_item">
                                    <p class="accent-color">|</p>
                                </li>
                                <li class="footer_item">
                                    <a href="/projects">Projects</a>
                                </li>
                                <li class="footer_item">
                                    <p class="accent-color">|</p>
                                </li>
                                <li class="footer_item">
                                    <a href="/resume">Resume</a>
                                </li>
                                <li class="footer_item">
                                    <p>
                                        <span class="accent-color">|</span> Find
                                        me:
                                    </p>
                                </li>
                                <li class="footer_item">
                                    <p>
                                        &nbsp;<a
                                            href="https://github.com/Skyward176"
                                            ><font-awesome-icon
                                                :icon="['fab', 'github']"
                                                class="accent-color"
                                            />
                                            Github
                                        </a>
                                    </p>
                                </li>
                                <li class="footer_item">
                                    <p>
                                        &nbsp;<a
                                            href="mailto:contact@brandonmartinez.dev"
                                            ><font-awesome-icon
                                                :icon="[
                                                    'fas',
                                                    'envelope-open-text',
                                                ]"
                                                class="accent-color"
                                            />
                                            eMail
                                        </a>
                                    </p>
                                </li>
                                <li class="footer_item">
                                    <p>
                                        &nbsp;<a href="tel:+17328102978"
                                            ><font-awesome-icon
                                                :icon="[
                                                    'fas',
                                                    'phone-square-alt',
                                                ]"
                                                class="accent-color"
                                            />
                                            Phone
                                        </a>
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </a-col>
                </a-row>
            </a-layout-footer>
        </a-layout>
    </div>
</template>

<script>
export default {}
</script>

<style>
.page-wrapper {
    display: flex;
    min-height: 100vh;
}
.name {
    font-size: 2rem;
    padding: 0;
    margin: auto auto auto auto;
}
.accent-color {
    color: #5cb4c4;
}
.navbar-items {
    font-size: 1.25rem;
    float: right;
    display: block;
}
.dark-background {
    background-color: #000000;
}
.footer {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
        'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji',
        'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
    color: #9cadb4;
}
.footer li {
    float: left;
}

.footer a {
    padding: 8px;
    font-size: 1.5 rem;
    color: inherit;
}
.footer a:hover {
    text-decoration: none;
    color: inherit;
}

.footer ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
}
.footer_item {
    color: #9cadb4;
    font-size: 1.5 rem;
}
.footer div {
    display: flex;
    align-items: middle;
    justify-content: center;
}
.contact-text {
    color: #9cadb4;
}
</style>
