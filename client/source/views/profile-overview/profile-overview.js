import { mapState } from 'vuex';

// Components
import BaseLoading from '@/components/BaseLoading/BaseLoading.vue';

export default {

  components: {
    'z-loading': BaseLoading,
  },

  computed: mapState({
    user: state => state.user.user,
  }),

  methods: {

    pathSkill(id) {
      return require(`@/assets/skills/${id}.png`);
    },

    pathAvatar(avatar) {
      return require(`@/assets/avatars/${avatar}.png`);
    },
  },

  created() {
    this.$store.dispatch('user/getMe');
  },

};
