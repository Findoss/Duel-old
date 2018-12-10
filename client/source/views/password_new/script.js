import debounce from 'debounce';
import { mapActions } from 'vuex';

// Utils
import Rules from '@/utils/validation/rules';
import validation from '@/utils/validation';

export default {

  data() {
    return {
      fields: {
        password: {
          value: '',
          status: '',
          error: '',
          rules: [Rules.password],
        },
        confirmPassword: {
          value: '',
          status: '',
          error: '',
          rules: [Rules.password],
        },
      },
      form: {
        isAvailable: true,
        error: '',
      },
      isValidLink: false,
      nickname: '',
    };
  },

  methods: {

    ...mapActions({
      passwordNew: 'me/account/passwordNew',
      checkLink: 'me/account/checkLink',
    }),

    submit() {
      if (!validation.form(this, 'fields')) {
        return false;
      } else if (this.fields.password.value !== this.fields.confirmPassword.value) {
        this.form.error = this.$t('form.errors["014"]');
        this.fields.password.status = 'invalid';
        this.fields.confirmPassword.status = 'invalid';
        return false;
      }

      this.passwordNew({
        newPassword: this.fields.password.value,
        hash: this.$route.params.hash,
      })
        .catch(() => {
          this.fields.password.status = '';
          this.fields.confirmPassword.status = '';
          this.fields.password.status = '';
          this.fields.confirmPassword.status = '';
        })
        .finally(() => {
          this.form.isAvailable = true;
        });
    },
  },

  created() {
    this.validation = debounce((event) => {
      validation.field(this, 'fields', event.target.name)
        .finally(() => {
          if (event.target.name === 'confirmPassword') {
            if (this.fields.password.value === this.fields.confirmPassword.value &&
              this.fields.password.value !== '' &&
              this.fields.confirmPassword.value !== ''
            ) {
              this.form.error = '';
              this.fields.password.status = 'valid';
              this.fields.confirmPassword.status = 'valid';
            } else {
              this.form.error = this.$t('form.errors["014"]');
              this.fields.confirmPassword.status = 'invalid';
            }
          }
        });
    }, 500);

    this.checkLink({ link: this.$route.params.hash })
      .then((response) => {
        this.isValidLink = true;
        this.nickname = response.nickname;
      });
  },

};
