import Router from '@/routes';

export default {
  name: 'z-logo',

  methods: {
    goRoot() {
      Router.push({ name: 'root' });
    },
  },
};