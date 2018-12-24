import { mapGetters, mapActions } from 'vuex';


export default {

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
};
