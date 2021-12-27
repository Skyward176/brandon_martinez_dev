<template>
    <div>
        <a-row>
            <a-col>
                <a-divider><h1 class="accent-color">About me</h1></a-divider>
            </a-col>
        </a-row>
        <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
            <a-col :span="7">
                <div justify="center" align="center">
                    <Profile />
                </div>
            </a-col>
            <a-col :span="10">
                <div class="main-text">
                    <p>
                        My name is Brandon, and I love to code. I’m trying to
                        learn all I can, every day. So far, I’ve worked with
                        Django and Python a lot. I’ve also had the pleasure of
                        working on websites using HTML/JavaScript/CSS. Recently,
                        I’ve been experimenting with JavaScript frameworks such
                        as Vue, React, and NuxtJS. I’ve also done coursework
                        with Java and played with Rust, C, C++ and Flutter. The
                        purpose of this site is to document the projects I make
                        as I continue to learn and do bigger, cooler things with
                        code. You can see some of the tech I’ve worked with on
                        the right, or see my contact info below.
                    </p>
                </div>
            </a-col>
            <a-col :span="7">
                <a-row type="flex" justify="center">
                    <a-col>
                        <h1 class="accent-color">Technologies</h1>
                        <div class="main-text">
                            <ul class="tech-list">
                                <li>
                                    <font-awesome-icon
                                        :icon="['fab', 'js-square']"
                                        class="tech-icons accent-color"
                                    />
                                    <p>&nbsp;&nbsp;JavaScript</p>
                                </li>
                                <li>
                                    <font-awesome-icon
                                        :icon="['fab', 'python']"
                                        class="tech-icons accent-color"
                                    />
                                    <p>&nbsp;&nbsp;Python</p>
                                </li>
                                <li>
                                    <font-awesome-icon
                                        :icon="['fab', 'python']"
                                        class="tech-icons accent-color"
                                    />
                                    <p>&nbsp;&nbsp;Django</p>
                                </li>
                                <li>
                                    <font-awesome-icon
                                        :icon="['fab', 'react']"
                                        class="tech-icons accent-color"
                                    />
                                    <p>&nbsp;&nbsp;React</p>
                                </li>
                                <li>
                                    <font-awesome-icon
                                        :icon="['fab', 'vuejs']"
                                        class="tech-icons accent-color"
                                    />
                                    <p>&nbsp;&nbsp;VueJS</p>
                                </li>
                                <li>
                                    <font-awesome-icon
                                        :icon="['fab', 'html5']"
                                        class="tech-icons accent-color"
                                    />
                                    <p>&nbsp;&nbsp;HTML 5</p>
                                </li>
                                <li>
                                    <font-awesome-icon
                                        :icon="['fab', 'css3']"
                                        class="tech-icons accent-color"
                                    />
                                    <p>&nbsp;&nbsp;CSS 5</p>
                                </li>
                                <li>
                                    <font-awesome-icon
                                        :icon="['fab', 'java']"
                                        class="tech-icons accent-color"
                                    />
                                    <p>&nbsp;&nbsp;Java</p>
                                </li>
                                <li>
                                    <font-awesome-icon
                                        :icon="['fab', 'aws']"
                                        class="tech-icons accent-color"
                                    />
                                    <p>&nbsp;&nbsp;Amazon Web Services</p>
                                </li>
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
.main-text p {
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
    display: flex;
}
</style>
