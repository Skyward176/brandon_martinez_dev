<template>
    <div className='w-full flex flex-row h-16 bg-black shadow-lg'>
        <div className='w-1/2 my-auto mx-2'>
            <NuxtLink href='/'>
                <p className='font-light font-sans text-4xl text-gray-50'>
                    Brandon <span className='text-teal-300'>Martinez</span>
                </p>
            </NuxtLink>
        </div>
        <div className=' w-1/2 flex flex-row justify-end my-auto divide-x divide-gray-50'>
            <NuxtLink className='flex mx-2 px-2' to="/">
                <Icon color='white' name='ic:baseline-person' size='28' className='' />
                <p className='font-light font-sans text-xl text-gray-50 '>
                    About Me
                </p>
            </NuxtLink>
            <NuxtLink className='flex mx-2 px-2' to="projects">
                <Icon color='white' name='ph:git-branch-fill' size='28' className='' />
                <p className='font-light font-sans text-xl text-gray-50'>
                    Projects
                </p>
            </NuxtLink>
        </div>
    </div>
</template>
