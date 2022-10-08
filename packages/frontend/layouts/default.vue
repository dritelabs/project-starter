<template>
  <div class="flex flex-row h-screen bg-slate-50">
    <MainMenu />
    <div class="container flex flex-col">
      <MainHeader />
      <div
        class="flex-1 scrollbar scrollbar-thumb-gray-300 scrollbar-track-gray-100 p-8"
      >
        <slot />
      </div>
    </div>
  </div>
</template>
