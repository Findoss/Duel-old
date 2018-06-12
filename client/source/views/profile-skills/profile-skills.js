// Services
import * as SkillService from '@/services/skills';

// Components
import BaseLoading from '@/components/BaseLoading/BaseLoading.vue';

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
    };
  },

  computed: {},

  created() {
    SkillService.getAllSkills()
      .then((data) => {
        this.skills = data.skills;
        this.loading = true;
      })
      .catch((error) => {
        console.warn(error);
      });
  },

  methods: {
    pathSkill(id) {
      return require(`@/assets/skills/${id}.png`);
    },
  },
};
