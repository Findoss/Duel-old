export default {
  name: 'z-user-parameters',

  props: {
    user: {
      type: Object,
    },
  },

  //
  created() {
    console.log(this.user);
  },
};
