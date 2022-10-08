import { RouteRecordNormalized } from "vue-router";

export function useNavigation() {
  const router = useRouter();
  const routes = router.getRoutes();
  const currentRoute = router.currentRoute;
  const isMainNavigationVisible = ref(true);

  const rootRoutes = computed(() =>
    routes
      .filter((route) => route.meta.isRootRoute)
      .sort((a) => (a.path === "/" ? -1 : 0))
  );

  const secondaryRootRoutes = computed(() =>
    routes
      .filter((route) => route.meta.isSecondaryRootRoute)
      .sort((a) => (a.path === "/" ? -1 : 0))
  );

  const routesWithChildren = computed(() =>
    [...rootRoutes.value, ...secondaryRootRoutes.value].reduce<{
      [x: string]: {
        route: RouteRecordNormalized;
        children: RouteRecordNormalized[];
      };
    }>(
      (prev, rootRoute) => ({
        ...prev,
        [rootRoute.name]: {
          route: rootRoute,
          children:
            rootRoute.path === "/"
              ? []
              : routes.filter((route) => route.path.includes(rootRoute.path)),
        },
      }),
      {}
    )
  );

  const currentRouteName = computed(() =>
    Object.keys(routesWithChildren.value).find((rootRouteName) => {
      return (currentRoute.value.name as string).includes(rootRouteName);
    })
  );

  const currentRoutes = computed(() =>
    routesWithChildren.value[currentRouteName.value]?.children.sort((a) =>
      a.meta?.subtitle === "Home" ? -1 : 0
    )
  );

  return {
    isMainNavigationVisible,
    rootRoutes,
    secondaryRootRoutes,
    currentRoute,
    currentRoutes,
  };
}
