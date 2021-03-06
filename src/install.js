import eq from 'object-equal';
import { transitionTo } from './history/base';

export default router => (Vue) => {
  Vue.mixin({
    onShow() {
      const app = router.app = this.$root;
      const { $mp } = app;
      if ($mp) {
        const { currentRoute } = router;
        const {
          query,
          page = {},
        } = $mp;
        let { route } = page;
        if (route) {
          if (route.indexOf(router.base) !== 0) {
            route = router.base + route;
          }
          if (currentRoute.path !== route || !eq(currentRoute.query, query)) {
            transitionTo(router, {
              path: route,
              query,
            });
          }
        }
      }
    },
  });

  Object.defineProperty(Vue.prototype, '$router', {
    get() { return router; },
  });

  Object.defineProperty(Vue.prototype, '$route', {
    get() { return router.currentRoute; },
  });
};
