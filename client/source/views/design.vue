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

  <p class="error arrow-error ">arrow-error alert</p>

  <p class="error">error alert</p>

  <br>

  <text-field
    label="text-field rules"
    name="field1"
    v-model="field.value"
    :validationStatus="field.status"
    :validationError="field.error"
    @input="validation(field)"
  />

  <text-field
    label="text-field rules - icon off"
    name="field9"
    :validationIcon="false"
    v-model="field2.value"
    :validationStatus="field2.status"
    :validationError="field2.error"
    @input="validation(field2)"
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
    validationStatus="pending"
  />

  <text-field
    label="text-field - valid"
    name="field7"
    validationStatus="valid"
  />

  <text-field
    label="text-field - invalid + error"
    name="field8"
    validationStatus="invalid"
    validationError="error"
  />

  <button type="submit" class="base-button">Hello Button</button>

  <br>

</div>
</template>

<style scoped>
  @import "../styles/typography.css";
  @import "../styles/link.css";
  @import "../styles/button.css";
  @import "../styles/card.css";
  @import "../styles/alert.css";
  @import "../styles/list.css";
</style>

<script>
import UserService from '@/services/user-service';
import Rules from '@/modules/validation-rules';
import BaseTextField from '@/components/BaseTextField/BaseTextField.vue'

export default {

  components: {
    'text-field': BaseTextField
  },

  data() {
    return {
      error: 'Ошибка введенных данных, Error entering data',
      field: {
        value: '',
        error: '',
        status: '',
        rules: (value) => {
          return value.length > 3
        }
      },
      field2: {
        value: '',
        error: '',
        status: '',
        rules: (value) => {
          return value.length > 3
        }
      }
    }
  },

  methods: {
    validation(formField) {
      const field = formField;
      field.error = '';
      field.status = 'pending';
      if (field.rules(field.value)) {
        field.status = 'valid';
      } else {
        field.status = 'invalid';
        field.error = 'error';
      }
    }
  },
};
</script>
