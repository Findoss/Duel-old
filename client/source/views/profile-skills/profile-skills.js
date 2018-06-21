// Services
import * as SkillService from '@/services/skills';

// Components
import BaseAlert from '@/components/BaseAlert/BaseAlert.vue';
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import BaseLoading from '@/components/BaseLoading/BaseLoading.vue';
import BaseTextField from '@/components/BaseTextField/BaseTextField.vue';

export default {

  components: {
    'z-alert': BaseAlert,
    'z-button': BaseButton,
    'z-loading': BaseLoading,
    'z-text-field': BaseTextField,
  },

  data() {
    return {
      loading: false,
      skills: [],
      pressSkillId: 0,
    };
  },

  computed: {
    selectedSkills() {
      return this.$store.state.user.idSkills;
    },
  },


  created() {
    SkillService.getAllSkills()
      .then((response) => {
        this.skills = response.skills;
        this.loading = true;
      })
      .catch((error) => {
        console.warn(error);
      });
  },

  methods: {
    pressSkill(idSkill) {
      this.pressSkillId = idSkill - 1; // todo элеиент массива !== уменю
    },

    pathSkill(id) {
      return require(`@/assets/skills/${id}.png`);
    },

    pathAvatar(avatar) {
      return require(`@/assets/avatars/${avatar}.png`);
    },
  },
};
