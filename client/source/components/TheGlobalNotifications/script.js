import { mapActions, mapGetters } from 'vuex';

export default {

  name: 'z-global-notifications',

  computed: {
    ...mapGetters([
      'notifications',
    ]),
  },

  methods: {
    ...mapActions([
      'delNotification',
    ]),
  },
};
