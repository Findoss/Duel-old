import { mapActions, mapGetters } from 'vuex';

export default {

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
