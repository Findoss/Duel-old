import { mapGetters, mapActions } from 'vuex';
import ContainerProfile from '@/containers/profile/index.vue';

export default {

  components: {
    'z-container-profile': ContainerProfile,
  },

  computed: {
    ...mapGetters([
      'myId',
    ]),
    ...mapGetters({
      userData: 'me/getAllData',
    }),

    isMe() {
      return this.myId === this.$route.params.userId;
    },
  },

  methods: {
    ...mapActions({
      getMe: 'me/loadMe',
      getUser: 'me/loadUser',
    }),
  },

  created() {
    console.log('this is me? ', this.isMe ? 'yes!' : 'no!');
  },
};