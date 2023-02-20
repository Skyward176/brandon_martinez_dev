<template>
    <div className="flex flex-col h-full">
        <Navbar />
        <div>
            <slot />
        </div>
        <div className='flex flex-row justify-self-end w-full bg-black text-gray-50 font-sans font-light'>
            <a className = 'mx-2' href="/">Home</a>
            <a className = 'mx-2' href="/projects">Projects</a>
            <p><span class="">|</span> Find me:</p>
            <p>
                &nbsp;<a href="https://github.com/Skyward176">
                    Github
                </a>
            </p>
            <p>
                &nbsp;<a href="mailto:contact@brandonmartinez.dev">
                    eMail
                </a>
            </p>
            <p>&nbsp;<a href="tel:+17328102978"> Phone</a></p>
        </div>
    </div>
</template>

<script>
    export default {}
</script>
