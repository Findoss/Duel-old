import { mapActions, mapGetters } from 'vuex';

import HeaderMenu from '@/components/HeaderMenu/HeaderMenu.vue';

export default {

  components: {
    'z-header-menu': HeaderMenu,
  },

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
      add: 'lobby/add',
      del: 'lobby/del',
    }),
  },

  created() {},
};
