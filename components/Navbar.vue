<template>
    <nav
        className="w-full h-1/16 bg-black shadow-lg absolute divide-y divide-gray-50 flex items-center"
    >
        <div className=" mx-3 w-7/8">
            <NuxtLink to="/">
                <p className="font-light font-sans text-4xl text-gray-50">
                    Brandon Martinez
                </p>
            </NuxtLink>
        </div>
        <div className="flex flex-row-reverse w-1/8 align-text-middle">
            <div className="mx-auto">
                <NuxtLink to="projects">
                    <p>Projects</p>
                </NuxtLink>
            </div>
            <div className="w 1/24">
                <NuxtLink to="/">
                    <p>Projects</p>
                </NuxtLink>
            </div>
        </div>
    </nav>
</template>
