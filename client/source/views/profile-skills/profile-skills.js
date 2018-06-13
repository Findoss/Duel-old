// Services
import * as SkillService from '@/services/skills';

// Components
import BaseLoading from '@/components/BaseLoading/BaseLoading.vue';

export default {

  components: {
    'z-loading': BaseLoading,
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
      .then((response) => {
        this.skills = response.skills;
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
