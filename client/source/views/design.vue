<template>
<div>

  <!-- <z-skill-card :skill="this.$store.state.skills.skills[0]"/> -->

  <z-container  class="size-l no-border">

    <p class="display-4">Board</p>
    <z-board>
      <template v-for="(col, j) in getBoard">
        <template v-for="(type, i) in col">
          <z-rune
            :i="i"
            :j="j"
            :type="type"
          >
          </z-rune>
        </template>
      </template>
    </z-board>

    <p class="display-4">Basic Tabs</p>
    <z-tabs>
      <z-tab title="tipography" :selected="true">
        <h1>h1 - h4. Heading Заголовок</h1>
        <h2>1 2 3 4 5 6 7 8 9 0</h2>

        <p class="display-1"> Display-1 </p>
        <p class="display-2"> Display-2 </p>
        <p class="display-3"> Display-3 </p>
        <p class="display-4"> Display-4 </p>
        <p>1 2 3 4 5 6 7 8 9 0</p>
        
        <br>
        <p>
          Lorem <strong>ipsum dolor sit</strong>, amet consectetur adipisicing <a href="">elit</a>. <small>numquam eaque minima similique</small> laudantium voluptatem?
        </p>
        <br>
        <p>
          Лорем <strong>высший боль сидеть</strong> Амет, консерваторские <a href="">скидки</a>. Я никогда <small>не люблю болеть очень</small> маленькое удовольствие?
        </p>
      </z-tab>
      <z-tab title="colors">
        <div class="colors">
          <div class="row">
            <div class="color color-1">--color-yellow-lite</div>
            <div class="color color-2">--color-yellow-norm</div>
            <div class="color color-3">--color-yellow-bright</div>
          </div>
          <div class="row">
            <div class="color color-4">--color-green-lite</div>
            <div class="color color-5">--color-green-norm</div>
            <div class="color color-6">--color-green-bright</div>
          </div>
          <div class="row">
            <div class="color color-7">--color-red-lite</div>
            <div class="color color-8">--color-red-norm</div>
            <div class="color color-9">--color-red-dark</div>
          </div>
          <div class="row">
            <div class="color color-13">--color-blue-lite</div>
            <div class="color color-14">--color-blue-norm</div>
            <div class="color color-15">--color-blue-bright</div>
          </div>
          <div class="row">
            <div class="color color-10">--color-gray</div>
            <div class="color color-11">--color-gray-norm</div>
            <div class="color color-12">--color-gray-bright</div>
          </div>
          <div class="row">
            <div class="color color-16">--background-0</div>
            <div class="color color-17">--background-1</div>
            <div class="color color-18">--background-2</div>
          </div>
        </div>
      </z-tab>
    </z-tabs>

    <br><br>

    <p class="display-4">Basic SkillSet</p>
    <z-skill-set>
      <z-skill
        v-for="(id, index) in skillSet" 
        :key="index" 
        :id="id"
      >
      </z-skill>
    </z-skill-set>

  </z-container>

  <z-container  class="size-l">
    <p class="display-4">Basic Loading</p>
    <z-loading :show="true">
      <h2>Us necessitatibus imp</h2>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. In itaque nesciunt, libero accusantium doloribus necessitatibus impedit cum dicta, animi voluptatem modi rerum debitis, odit consequatur perferendis ratione dolorem magnam iste?
        <a>Us necessitatibus imp</a>
      </p>
      <br>
      <h4>rendis ratione dolor</h4>
      <br>
      <z-button type="submit">Hello Button</z-button>
    </z-loading>
  </z-container>


  <z-container class="size-m">

    <z-alert
      :show="true"
    >
      icon false
    </z-alert>

    <z-alert
      :show="true"
    >
      default info
    </z-alert>

    <z-alert
      :show="true"
      :icon="true"
      type="info"
    >
      info
    </z-alert>

    <z-alert
      :show="true"
      :icon="true"
      type="error"
    >
      error content
    </z-alert>

    <z-alert
      :show="alert"
      :icon="true"
      :dismissible="true"
      @close="alert = false"
      type="warning"
    >
      warning content + dismissible
    </z-alert>

    <z-alert
      :show="alert2"
      :icon="true"
      :dismissible="true"
      @close="alert2 = false"
      type="success"
    >
      success content more Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum voluptate officiis sapiente impedit ullam velit.  + dismissible
    </z-alert>

    <br>
    <z-tabs>
      <z-tab title="field" :selected="true">
        <z-text-field
          :validationRules="field.rules"
          @validation="field.status = $event"
          label="text field rules"
          name="field1"
          v-model="field.value"
        />

        <z-text-field
          :validationIcon="false"
          :validationRules="field2.rules"
          @validation="field2.status = $event"
          label="text field rules - icon off"
          name="field9"
          v-model="field2.value"
        />

        <z-text-field
          disabled="disabled"
          label="text field disabled"
          name="field2"
        />

        <z-text-field
          initialValue="Lorem ipsum dolor sit amet"
          label="text field value"
          name="field3"
        />

        <z-text-field
          label="text field placeholder"
          name="field4"
          placeholder="placeholder"
        />

        <z-text-field
          label="text field password"
          name="field5"
          type="password"
        />

      </z-tab>
      <z-tab title="field status">
        <z-text-field
          customClasses="check-loading "
          label="text field - pending"
          name="field6"
        />

        <z-text-field
          customClasses="check-successful"
          label="text field - valid"
          name="field7"
        />

        <z-text-field
          :validationRules="field2.rules"
          label="text field - invalid + error"
          name="field8"
          ref="textFieldError"
          value="123"
        />
      </z-tab>
    </z-tabs>

    <br>
    <z-button type="submit">Normal button</z-button>
    <br><br>
    <z-button type="submit" disabled>Disable button</z-button>

  </z-container>

</div>
</template>



<script>
  import { mapActions, mapState, mapGetters } from 'vuex';

  // Components
  import SkillCard from '@/components/SkillCard/SkillCard.vue';
  import SkillSet from '@/components/SkillSet/SkillSet.vue';
  import Skill from '@/components/Skill/Skill.vue';
  import Board from '@/components/Board/Board.vue';
  import Rune from '@/components/BoardRune/BoardRune.vue';

  // Utils
  import Rules from '@/utils/validation/rules';

  export default {
    
    components: {
      'z-skill-card': SkillCard,
      'z-skill-set': SkillSet,
      'z-skill': Skill,
      'z-board': Board,
      'z-rune': Rune,
    },

    computed: {
      ...mapState({
        userParameters: state => state.me.parameters,
      }),
      ...mapGetters([
        'pathAvatar',
      ]),
      ...mapGetters({
        getBoard: 'game/getBoard',
        user: 'me/getAllData',
        skillSet: 'me/getSkillSet',
      }),
    },

    data() {
      return {
        error: 'Ошибка введенных данных, Error entering data',
        alert: true,
        alert2: true,
        field: {
          value: '',
          status: false,
          rules: [Rules.password],
        },
        field2: {
          value: '',
          status: false,
          rules: [Rules.password],
        },
      };
    },

    mounted() {
      this.$refs.textFieldError.validation();
    },
  };
</script>

<style scoped>
  .colors {
    display: flex;
    width: 100%;
    flex-flow: row wrap;
    justify-content: center;
  }

  .color {
    width: 200px;
    height: 50px;
    display: block;
    font-size: 10pt;
    color: #000;
  }

  .color-row {
    margin: 5px;
    display: flex;
  }

  .color-1 {
    background-color: var(--color-yellow-lite);
  }

  .color-2 {
    background-color: var(--color-yellow-norm);
  }

  .color-3 {
    background-color: var(--color-yellow-bright);
  }

  .color-4 {
    background-color: var(--color-green-lite);
  }

  .color-5 {
    background-color: var(--color-green-norm);
  }

  .color-6 {
    background-color: var(--color-green-bright);
  }

  .color-7 {
    background-color: var(--color-red-lite);
  }

  .color-8 {
    background-color: var(--color-red-norm);
  }

  .color-9 {
    background-color: var(--color-red-dark);
  }

  .color-10 {
    background-color: var(--color-gray-lite);
  }

  .color-11 {
    background-color: var(--color-gray-norm);
  }

  .color-12 {
    background-color: var(--color-gray-bright);
  }

  .color-13 {
    background-color: var(--color-blue-lite);
  }

  .color-14 {
    background-color: var(--color-blue-norm);
  }

  .color-15 {
    background-color: var(--color-blue-bright);
  }

  .color-16 {
    color: #fff;
    background-color: var(--background-0);
  }

  .color-17 {
    color: #fff;
    background-color: var(--background-1);
  }

  .color-18 {
    color: #fff;
    background-color: var(--background-2);
  }
</style>
