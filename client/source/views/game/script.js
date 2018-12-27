export default {
  beforeRouteLeave(to, from, next) {
    if (to.params.force) next();
    next(false);
  },
};
