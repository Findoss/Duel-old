import { mapGetters, mapActions } from 'vuex';

import ContainerCenter from '@/containers/center/index.vue';


export default {

  components: {
    'z-container-center': ContainerCenter,
  },

  computed: {
    ...mapGetters({
      time: 'lobby/getTime',
    }),
  },

  methods: {
    ...mapActions({
      addLobby: 'lobby/add',
      delLobby: 'lobby/del',
    }),
  },

  created() {
    this.addLobby();
  },

  beforeRouteLeave(to, from, next) {
    if (to.params.force) next();
    next(false);
  },
};
