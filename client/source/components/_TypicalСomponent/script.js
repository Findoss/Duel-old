export default {

  /*
   * name
   * components
   * props
   * data
   * computed
   * methods
   * beforeCreate
   * created
   * beforeMount
   * mounted
   * beforeUpdate
   * updated
   * beforeDestroy
   * destroyed
   * beforeRouteLeave
  */

  //
  name: 'z-exemple',

  //
  components: {

  },

  //
  props: {
    type: {
      type: String,
      default: null,
      validator(val) {
        return ['exemple'].includes(val);
      },
      required: true,
    },
  },

  //
  data() {
    return {
      property: 'exemple',
    };
  },

  //
  computed: {
    propertyComputed() {
      console.log('I change when this.property changes.');
      return this.property;
    },
  },

  //
  methods: {
    exemple() {
      this.$emit('exemple', true);
    },
  },

  //
  beforeCreate() {
    console.log('Nothing gets called before me!');
  },

  //
  created() {
    this.property = 'Example property update.';
    console.log('propertyComputed will update, as this.property is now reactive.');
  },

  //
  beforeMount() {
    console.log('this.$el doesn\'t exist yet, but it will soon!');
  },

  //
  mounted() {
    console.log(this.$el.textContent); // I'm text inside the component.
  },

  beforeUpdate() {
    console.log(this.counter); // Logs the counter value every second, before the DOM updates.
  },

  //
  updated() {
    // Fired every second, should always be true
    console.log(+this.$refs['dom - element'].textContent === this.counter);
  },

  //
  beforeDestroy() {
    // Perform the teardown procedure for someLeakyProperty.
    // (In this case, effectively nothing)
    this.someLeakyProperty = null;
    delete this.someLeakyProperty;
  },

  //
  destroyed() {
    console.log(this); // There's practically nothing here!
    MyCreepyAnalyticsService.informService('Component destroyed. All assets move in on target on my mark.');
  },

  beforeRouteLeave(to, from, next) {
    next();
  },
};