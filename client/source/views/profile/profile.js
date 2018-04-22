import MeService from '@/services/me-service';
import imgAvatar from '@/assets/avatars/avatar.png';

export default {

  data() {
    return {
      user: {
        nickname: '----',
        email: '----@----.--',
        avatar: '',
        rank: '',
      },

    };
  },

  beforeRouteEnter(to, from, next) {
    MeService.getMe()
      .then((user) => {
        next(vm => vm.setData(user));
      })
      .catch((error) => {
        console.warn('asdas');
        this.$router.push({ path: '/' });
      });


    // getPost(to.params.id, (err, post) => {
    //   next(vm => vm.setData(user));
    // });
  },

  methods: {
    signOut() {
      localStorage.setItem('session-token', null);
      this.$router.push({ path: '/' });
    },
    setData(user) {
      this.user = user;
      this.user.avatar = imgAvatar;
    },
  },
};


// export default {
//   // если путь изменяется, а компонент уже отображён,
//   // логика будет немного иной
//   beforeRouteUpdate (to, from, next) {
//     this.post = null
//     getPost(to.params.id, (err, post) => {
//       this.setData(err, post)
//       next()
//     })
//   },
// }
