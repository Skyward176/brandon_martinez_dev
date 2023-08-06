<template>
  <ul className='flex flex-row p-2 content-center'>
      <li className='flex-grow m-2' key="home">
          <NuxtLink to="/">
              <p className="text-4xl text-teal-500 font-light hover:underline">
                  Brandon Martinez
              </p>
          </NuxtLink>
      </li>
      <li className="text-gray-300 m-2 text-xl font-light hover:underline" key="projects">
          <NuxtLink to="projects">
              <font-awesome-icon :icon="['fas', 'project-diagram']"/>
              Projects
          </NuxtLink>

      </li>
      <li className="text-gray-300 text-xl m-2 font-light hover:underline" key="about">
          <NuxtLink to="/">
              <font-awesome-icon :icon="['fas', 'id-badge']" />
              About Me
          </NuxtLink>
      </li>
      <li className="text-gray-300 text-xl m-2 content-center font-light hover:underline" key="resume">
          <NuxtLink to="resume">
              <font-awesome-icon :icon="['fas', 'file-alt']" />
              <p>
                Resume
              </p>
          </NuxtLink>
      </li>
  </ul>
</template>
