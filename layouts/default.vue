<template>
    <div className="flex flex-col h-full">
        <Navbar />
        <div>
            <slot />
        </div>
        <div>
            <ul>
                <li class="">
                    <a href="/">Home</a>
                </li>
                <li class="">
                    <p class="-color">|</p>
                </li>
                <li class="">
                    <a href="/projects">Projects</a>
                </li>
                <li class="">
                    <p><span class="">|</span> Find me:</p>
                </li>
                <li class="">
                    <p>
                        &nbsp;<a href="https://github.com/Skyward176">
                            Github
                        </a>
                    </p>
                </li>
                <li class="">
                    <p>
                        &nbsp;<a href="mailto:contact@brandonmartinez.dev">
                            eMail
                        </a>
                    </p>
                </li>
                <li class="">
                    <p>&nbsp;<a href="tel:+17328102978"> Phone</a></p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {}
</script>
