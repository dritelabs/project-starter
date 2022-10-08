<script setup lang="ts">
const {
  isMainNavigationVisible,
  rootRoutes,
  secondaryRootRoutes,
  currentRoute,
  currentRoutes,
} = useNavigation();
</script>

<template>
  <div class="flex flex-row">
    <div class="flex flex-col justify-between bg-slate-200 z-50">
      <ul class="menu p-2">
        <li
          class="mb-4 tooltip tooltip-right"
          data-tip="Toggle main menu"
          @click="isMainNavigationVisible = !isMainNavigationVisible"
        >
          <font-awesome-icon icon="fa-solid fa-bars" />
        </li>
        <li v-for="route in rootRoutes">
          <NuxtLink
            class="tooltip tooltip-right"
            :class="{
              active:
                (route.path === '/' && currentRoute.path === '/') ||
                (route.path !== '/' && currentRoute.path.includes(route.path)),
            }"
            :to="route.path"
            :data-tip="route.meta.title"
          >
            <font-awesome-icon :icon="route.meta.icon" />
          </NuxtLink>
        </li>
      </ul>
      <ul class="menu p-2">
        <li
          class="mb-4 tooltip tooltip-right"
          :data-tip="route.meta.title"
          v-for="route in secondaryRootRoutes"
        >
          <NuxtLink
            :to="route.path"
            :class="{
              active:
                (route.path === '/' && currentRoute.path === '/') ||
                (route.path !== '/' && currentRoute.path.includes(route.path)),
            }"
          >
            <font-awesome-icon :icon="route.meta.icon" />
          </NuxtLink>
        </li>
      </ul>
    </div>

    <ul class="menu menu-compact w-56 p-2" v-show="isMainNavigationVisible">
      <li class="disabled">
        <img src="/logo-black.svg" alt="" width="110" />
      </li>
      <li v-for="currentRoute in currentRoutes">
        <NuxtLink
          :to="currentRoute.path"
          class="active:bg-slate-50 focus:bg-slate-50 hover:bg-slate-50"
        >
          {{ currentRoute.meta.subtitle }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
