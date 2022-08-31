<template>
    <div>
        <a-divider class="title"><h1 class="accent-color">About me</h1></a-divider>
        <div class="container">
            <div class="left">
                <Profile />
            </div>
            <div class="middle main-text">
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
            <div class="right">
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
                                <li>
                                    <font-awesome-icon
                                        :icon="['fab', 'js-square']"
                                        class="tech-icons accent-color"
                                    />
                                    <p>&nbsp;&nbsp;Next.JS</p>
                                </li>
                                <li>
                                    <font-awesome-icon
                                        :icon="['fas', 'fa-wind']"
                                        class="tech-icons accent-color"
                                    />
                                    <p>&nbsp;&nbsp;TailwindCSS</p>
                                </li>
                            </ul>
                        </div>
                    </a-col>
                </a-row>
            </div>
        </div>
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
.container {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
}
.title {
    width:100%;
}
@media (max-width: 599px) {
    .left{
        order:1;
        flex-basis: 80%;
        margin: auto;
    }
    .middle{
        margin: 2em auto 1em auto;
        order:2;
        flex-basis: 80%;
    }
    .right{
        margin: 1em auto 2em auto;
        order:3;
        flex-basis: 30%;
    }
}
@media (min-width: 600px) {
    .left{
        order:2;
        flex-basis: 40%;
        margin:auto;
    }
    .middle{
        margin:auto;
        order:1;
        flex-basis: 80%;
    }
    .right{
        margin:auto;
        order:3;
        flex-basis: 40%;
    }
}
@media (min-width: 900px) {
    .left{
        margin:auto;
        order:1;
        flex-basis: 20%;
    }
    .middle{
        margin:auto;
        order:2;
        flex-basis: 40%;
    }
    .right{
        margin:auto;
        order:3;
        flex-basis: 20%;
    }
}
</style>
