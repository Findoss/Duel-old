import ContainerCenter from '@/containers/center/index.vue';

export default {
  components: {
    'z-container-center': ContainerCenter,
  },

  beforeRouteLeave(to, from, next) {
    if (to.params.force) next();
    next(false);
  },
};
