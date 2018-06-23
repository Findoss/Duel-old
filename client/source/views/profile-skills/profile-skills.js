import { mapActions, mapState, mapGetters } from 'vuex';

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

  computed: {
    ...mapState({
      selectedSkills: state => state.user.idSkills,
      skills: state => state.skills.skills,
      infoSkillId: state => state.skills.infoSkillId,
    }),
    ...mapGetters({
      getSkillInfo: 'skills/getSkillInfo',
    }),
  },

  methods: {
    ...mapActions({
      loadSkills: 'skills/loadSkills',
      pressSkill: 'skills/pressSkill',
    }),

    pathSkill(id) {
      return require(`@/assets/skills/${id}.png`);
    },

    pathAvatar(avatar) {
      return require(`@/assets/avatars/${avatar}.png`);
    },
  },
};
