<template>
    <div>
        <a-divider class="title"><h1 class = "accent-color">About Me</h1></a-divider>
        <div class="container">
            <div class="left">
                <Profile />
            </div>
            <div class="middle main-text">
                <p>
                    A second year Computer Science student and software developer. Currently focused on full-stack Web Development.
                    Proudly rocking a 3.9 GPA and currently on the market for internships or part time work.
                    My current goals are improving my React powers, becoming a better designer, and expanding my online presence.
                    I'll be the first to tell you all my weaknesses, but if I had to list any strengths they'd be my willingness to
                    learn and my enthusiasm for solving problems. My hobbies include watching anime, playing videogames, working out 
                    and, as of late, playing the guitar.
                </p>
            </div>
            <div class="right">
                <a-row type="flex" justify="center">
                    <a-col>
                        <h1 class="accent-color">Technologies</h1>
                        <div class="main-text">
                            <ul class="tech-list">
                                <li v-for="tech in techList.list" :key="tech.name">
                                    <font-awesome-icon
                                        :icon="tech.icon"
                                        class="tech-icons accent-color"
                                    />
                                    <p>{{tech.name}}</p>
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
export default {
    async asyncData({ $content, params }) {
      const techList = await $content('technologies').fetch()
      return { techList }
    }
}
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
    margin-left:1rem;
    margin-right:1rem;
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
