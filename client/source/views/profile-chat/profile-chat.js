import { mapActions, mapGetters } from 'vuex';

export default {

  data() {
    return {
      message: '',
    };
  },

  computed: {
    ...mapGetters({
      messages: 'chat/getMessages',
    }),
  },

  methods: {
    ...mapActions({
      send: 'chat/send',
    }),
  },

  created() {},
};
