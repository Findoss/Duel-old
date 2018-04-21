<template>
<div class="card">

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
    Текст <a href="">на русском</a><strong> языке</strong>, <small>съешь еще</small> французских булок.
  </p>

  <br>

  <alert-box
    :initShow="alert"
  >
    default info + dismissible
  </alert-box>

  <alert-box
    :initShow="true"
    type="error"
  >
    error content
  </alert-box>

  <alert-box
    :initShow="true"
    :dismissible="true"
    type="warning"
  >
    warning content
  </alert-box>

  <alert-box
    :initShow="true"
    type="success"
    :dismissible="true"
  >
    success content more Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum voluptate officiis sapiente impedit ullam velit.
  </alert-box>

  <br>

  <text-field
    label="text-field rules"
    name="field1"
    :rules="field.rules"
    @input="field.value = $event"
    @validation="field.status = $event"
  />

  <text-field
    label="text-field rules - icon off"
    name="field9"
    :icon="false"
    :rules="field2.rules"
    @input="field2.value = $event"
    @validation="field2.status = $event"
  />

  <text-field
    label="text-field disabled"
    name="field2"
    disabled="disabled"
  />

  <text-field
    label="text-field value"
    name="field3"
    initialValue="Lorem ipsum dolor sit amet"
  />

  <text-field
    label="text-field placeholder"
    name="field4"
    placeholder="placeholder"
  />

  <text-field
    label="text-field password"
    name="field5"
    type="password"
  />

  <text-field
    label="text-field - pending"
    name="field6"
    customClasses="is-autocheck-loading"
  />

  <text-field
    label="text-field - valid"
    name="field7"
    customClasses="is-autocheck-successful"
  />

  <text-field
    label="text-field - invalid + error"
    name="field8"
    ref="textFieldError"
    initialValue="123"
    :rules="field2.rules"
  />

  <z-button type="submit">Hello Button</z-button>

  <br>

</div>
</template>

<style scoped>
  @import "../styles/typography.css";
  @import "../styles/link.css";
  @import "../styles/card.css";
  @import "../styles/alert.css";
  @import "../styles/list.css";
</style>

<script>
import Rules from '@/modules/validation-rules';
import UserService from '@/services/user-service';
import BaseAlert from '@/components/BaseAlert/BaseAlert.vue';
import BaseTextField from '@/components/BaseTextField/BaseTextField.vue';

export default {
  
  components: {
    'alert-box': BaseAlert,
    'text-field': BaseTextField,
    'z-button': BaseButton,
  },

  data() {
    return {
      error: 'Ошибка введенных данных, Error entering data',
      alert: true,
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
