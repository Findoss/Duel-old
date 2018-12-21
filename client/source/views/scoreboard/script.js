import { mapActions, mapGetters } from 'vuex';
import ContainerProfile from '@/containers/profile/index.vue';

export default {
  components: {
    'z-container-profile': ContainerProfile,
  },

  data() {
    return {
      users: [],
    };
  },

  computed: {
    ...mapGetters({
      isLogin: 'isLogin',
      user: 'me/getAllData',
    }),
  },


  methods: {
    ...mapActions({
      loadScoreboard: 'me/loadScoreboard',
    }),
  },

  created() {
    this.loadScoreboard()
      .then((response) => {
        this.users = response;
      });
  },
};
