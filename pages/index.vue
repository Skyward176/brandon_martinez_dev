<template>
    <div className='flex flex-col h-full'>
        <div className="text-2xl text-teal-500">
            <p>About Me</p>
        </div>
        <div className="flex flex-row">
            <div className=''>
                {/*<Profile />*/}
            </div>
            <div className="w-1/3 text-white text-xl">
                <p>
                    A second year Computer Science student and software developer. Currently focused on full-stack Web Development.
                    Proudly rocking a 3.9 GPA and currently on the market for internships or part time work.
                    My current goals are improving my React powers, becoming a better designer, and expanding my online presence.
                    I'm always willing to learn and am enthusiastic for solving problems. My hobbies include watching anime, playing videogames, working out 
                    and, as of late, playing the guitar.
                </p>
            </div>
            <div className='w-1/3 flex content-center'>
                <div>
                    <h1 className="text-teal-500">Technologies</h1>
                    <div class="main-text">
                        <ul className="text-white">
                            <li v-for="tech in techList" :key="tech.name">
                                <font-awesome-icon
                                    :icon="tech.icon"
                                    class="tech-icons accent-color"
                                />
                                <p>{{tech.name}}</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    const {techList} = await useAsyncData(() => queryContent('/technologies'))
    console.log("List of techs \n" + techList);
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
