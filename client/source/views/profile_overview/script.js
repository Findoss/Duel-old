import { mapActions } from 'vuex';

export default {
  methods: {
    ...mapActions({
      signOut: 'me/account/signOut',
      privateSend: 'me/loadMe',
    }),
  },
};
