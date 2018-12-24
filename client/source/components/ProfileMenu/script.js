import { mapActions } from 'vuex';

export default {
  name: 'z-profile-menu',

  methods: {
    ...mapActions({
      addLobby: 'lobby/add',
    }),
  },
};