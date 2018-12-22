import { mapGetters, mapActions } from 'vuex';


export default {

  computed: {
    ...mapGetters({
      time: 'lobby/getTime',
    }),
  },

  methods: {
    ...mapActions({
      delLobby: 'lobby/del',
    }),
  },
};
