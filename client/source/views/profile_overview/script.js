import { mapActions } from 'vuex';

export default {

  created() {
    this.property = 'Example property update.';
    console.log('propertyComputed will update, as this.property is now reactive.');
  },

  methods: {
    ...mapActions({
      signOut: 'me/account/signOut',
    }),
  },
};
