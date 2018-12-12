import { mapActions, mapGetters } from 'vuex';
import ContainerProfile from '@/containers/profile/index.vue';

export default {

  components: {
    'z-container-profile': ContainerProfile,
  },

  computed: {
    ...mapGetters({
      userData: 'me/getAllData',
    }),
  },

  methods: {
    ...mapActions({
      signOut: 'me/account/signOut',
      privateSend: 'me/loadMe',
    }),
  },
};
