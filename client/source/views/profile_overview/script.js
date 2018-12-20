import { mapGetters, mapActions } from 'vuex';
import ContainerProfile from '@/containers/profile/index.vue';

export default {

  components: {
    'z-container-profile': ContainerProfile,
  },

  data() {
    return {
      pending: false,
    };
  },

  computed: {
    ...mapGetters([
      'myId',
    ]),
    ...mapGetters({
      me: 'me/getAllData',
      opponent: 'opponent/getAllData',
    }),

    isMe() {
      return this.myId === this.$route.params.userId;
    },

    user() {
      if (this.isMe) return this.me;
      return this.opponent;
    },
  },

  methods: {
    ...mapActions({
      getMe: 'me/loadMe',
      getOtherUser: 'opponent/loadUser',
    }),

    getUser() {
      return this.getOtherUser(this.$route.params.userId);
    },
  },

  created() {
    console.log('this is me? ', this.isMe ? 'yes!' : 'no!');

    if (!this.isMe) {
      this.pending = true;
      this.getUser().then(() => {
        this.pending = false;
      });
    }
  },

};