import ContainerBoard from '@/containers/board/index.vue';
import { mapGetters, mapActions } from 'vuex';

export default {

  components: {
    'z-board-container': ContainerBoard,
  },


  computed: {
    ...mapGetters([
      // 'myId',
      // 'isLogin',
    ]),
    ...mapGetters({
      me: 'me/getAllData',
      opponent: 'opponent/getAllData',
      isMyStep: 'game/isMyStep',
      currentStepTime: 'game/currentStepTime',
    }),
  },

  methods: {
    ...mapActions({
      surrender: 'game/surrender',
      fakeAction: 'game/fakeAction',
    }),
  },

  beforeRouteLeave(to, from, next) {
    if (to.params.force) next();
    next(false);
  },
};
