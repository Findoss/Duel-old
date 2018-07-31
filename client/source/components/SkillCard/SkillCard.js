import { mapActions, mapState, mapGetters } from 'vuex';

export default {

  name: 'z-skill-card',

  props: {
    skillId: {
      type: Number,
      default() {
        return 0;
      },
    },
  },

  computed: {
    ...mapState({
      skillSetLength: state => state.user.skillSet.length,
      userGold: state => state.user.gold,
      userPoints: state => state.user.points,
      userOpenSlots: state => state.user.openSlots,
      userLevel: state => state.user.level,
    }),
    ...mapGetters({
      isSkillUnlocked: 'user/isSkillUnlocked',
      getSkillInfo: 'skills/getSkillInfo',
      getCountSkillsClones: 'user/getCountSkillsClones',
    }),
    ...mapGetters([
      'pathSkill',
    ]),
    skill() {
      return this.getSkillInfo(this.skillId);
    },
    isBuy() {
      return this.skill.priceInGold > this.userGold ||
             this.skill.minLevel >= this.userLevel;
    },
    isAdd() {
      return this.skillSetLength >= this.userOpenSlots ||
             this.getCountSkillsClones(this.skillId) >= this.skill.limitCopy ||
             this.skill.points > this.userPoints ||
             this.skill.minLevel >= this.userLevel;
    },
  },


  methods: {
    ...mapActions({
      buySkill: 'user/buySkill',
      delInSkillSet: 'user/delInSkillSet',
      addInSkillSet: 'user/addInSkillSet',
    }),
  },

  created() {

  },

};
