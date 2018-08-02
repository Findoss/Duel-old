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
      skillSetLength: state => state.me.skillSet.length,
      userGold: state => state.me.private.gold,
      userPoints: state => state.me.private.points,
      userOpenSlots: state => state.me.openSlots,
      userLevel: state => state.me.level,
    }),
    ...mapGetters({
      getSkillInfo: 'skills/getSkillInfo',
      isSkillUnlocked: 'me/isSkillUnlocked',
      getCountSkillsClones: 'me/getCountSkillsClones',
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
      buySkill: 'me/buySkill',
      delInSkillSet: 'me/delInSkillSet',
      addInSkillSet: 'me/addInSkillSet',
    }),
  },
};
