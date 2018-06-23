import { mapActions } from 'vuex';

// Components
import BaseButton from '@/components/BaseButton/BaseButton.vue';

export default {

  components: {
    'z-button': BaseButton,
  },

  created() {
    this.loadMe();
    this.loadSkills();
    this.loadUserParameters();
    // ...
    // ...
    // ...
  },

  computed: {
    userId() {
      return this.$store.state.user.id;
    },
  },

  methods: {
    ...mapActions({
      loadMe: 'user/loadMe',
      loadUserParameters: 'user/loadUserParameters',
      loadSkills: 'skills/loadSkills',
      signOut: 'user/signOut',
    }),
  },
};
