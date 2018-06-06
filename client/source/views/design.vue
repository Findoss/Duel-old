<template>
<div>

  <h1>h1. Heading Заголовок</h1>
  <h2>h2. Heading Заголовок</h2>
  <h3>h3. Heading Заголовок</h3>
  <h4>h4. Heading Заголовок</h4>

  <h4>
    1 2 3 4 5 6 7 8 9 0
  </h4>
  <p>
    1 2 3 4 5 6 7 8 9 0
  </p>
  <br>
  <p>
    Lorem <strong>ipsum dolor sit</strong>, amet consectetur adipisicing <a href="">elit</a>. <small>numquam eaque minima similique</small> laudantium voluptatem?
  </p>
  <br>
  <p>
    Лорем <strong>высший боль сидеть</strong> Амет, консерваторские <a href="">скидки</a>. Я никогда <small>не люблю болеть очень</small> маленькое удовольствие?
  </p>

  <div class="colors">
    <div class="color-row">
      <div class="color color-1">--color-yellow</div>
      <div class="color color-2">--color-yellow-hover</div>
      <div class="color color-3">--color-yellow-focus</div>
    </div>
    <div class="color-row">
      <div class="color color-4">--color-green</div>
      <div class="color color-5">--color-green-hover</div>
      <div class="color color-6">--color-green-focus</div>
    </div>
    <div class="color-row">
      <div class="color color-10">--color-gray</div>
      <div class="color color-11">--color-gray-hover</div>
      <div class="color color-12">--color-gray-focus</div>
    </div>
    <div class="color-row">
      <div class="color color-7">--color-red</div>
      <div class="color color-8">--color-red-hover</div>
      <div class="color color-9">--color-red-focus</div>
    </div>
    <div class="color-row">
      <div class="color color-13">--color-blue</div>
      <div class="color color-14">--color-blue-hover</div>
      <div class="color color-15">--color-blue-focus</div>
    </div>
    <div class="color-row">
      <div class="color color-16">--background-0</div>
      <div class="color color-17">--background-1</div>
      <div class="color color-18">--background-2</div>
    </div>
  </div>

  <div class="card">

    <z-alert
      :show="true"
      :icon="false"
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
      type="error"
    >
      error content
    </z-alert>

    <z-alert
      v-model="alert"
      :dismissible="true"
      type="warning"
    >
      warning content + dismissible
    </z-alert>

    <z-alert
      v-model="alert2"
      type="success"
      :dismissible="true"
    >
      success content more Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum voluptate officiis sapiente impedit ullam velit.  + dismissible
    </z-alert>

    <br>

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

    <z-text-field
      customClasses="is-autocheck-loading"
      label="text field - pending"
      name="field6"
    />

    <z-text-field
      customClasses="is-autocheck-successful"
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

    <z-button type="submit">Hello Button</z-button>

  </div>

</div>
</template>



<script>
  // Services
  import * as UserService from '@/services/user';

  // Components
  import BaseAlert from '@/components/BaseAlert/BaseAlert.vue';
  import BaseButton from '@/components/BaseButton/BaseButton.vue';
  import BaseTextField from '@/components/BaseTextField/BaseTextField.vue';

  // Utils
  import Rules from '@/utils/validation/rules';

  export default {
    
    components: {
      'z-alert': BaseAlert,
      'z-text-field': BaseTextField,
      'z-button': BaseButton,
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
  @import "../styles/typography.css";
  @import "../styles/link.css";
  @import "../styles/card.css";
  @import "../styles/list.css";

  .colors {
    /*background-color: #fff;*/
    padding: 5px;
  }

  .color {
    width: 185px;
    height: 50px;
    display: block;
    font-size: 10pt;
    color: #000;
  }

  .color-row {
    margin: 5px;
    display: inline-block;
  }

  .color-1 {
    background-color: var(--color-yellow);
  }

  .color-2 {
    background-color: var(--color-yellow-hover);
  }

  .color-3 {
    background-color: var(--color-yellow-focus);
  }

  .color-4 {
    background-color: var(--color-green);
  }

  .color-5 {
    background-color: var(--color-green-hover);
  }

  .color-6 {
    background-color: var(--color-green-focus);
  }

  .color-7 {
    background-color: var(--color-red);
  }

  .color-8 {
    background-color: var(--color-red-hover);
  }

  .color-9 {
    background-color: var(--color-red-focus);
  }

  .color-10 {
    background-color: var(--color-gray);
  }

  .color-11 {
    background-color: var(--color-gray-hover);
  }

  .color-12 {
    background-color: var(--color-gray-focus);
  }

  .color-13 {
    background-color: var(--color-blue);
  }

  .color-14 {
    background-color: var(--color-blue-hover);
  }

  .color-15 {
    background-color: var(--color-blue-focus);
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
