<template>
    <div className='w-full flex flex-row h-16 bg-black shadow-lg'>
        <div className='basis-3/4 w-3/4 my-auto mx-2'>
            <NuxtLink href='/'>
                <p className='font-light font-sans text-4xl text-gray-50'>
                    Brandon Martinez
                </p>
            </NuxtLink>
        </div>
        <div className='basis-1/4 w-1/4 flex flex-row-reverse my-auto '>
            <NuxtLink className='' to="projects">
                <p className='font-light font-sans text-xl text-gray-50 mx-2'>
                    Projects
                </p>
            </NuxtLink>
            <NuxtLink className='' to="/">
                <p className='font-light font-sans text-xl text-gray-50 mx-2'>
                    About Me
                </p>
            </NuxtLink>
        </div>
    </div>
</template>
