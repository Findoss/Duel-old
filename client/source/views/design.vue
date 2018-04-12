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
  <p>
    Lorem <strong>ipsum dolor sit</strong>, amet consectetur adipisicing elit. <small>numquam eaque minima similique</small> laudantium voluptatem?
  </p>
  <p>
    Текст на русском <strong>языке</strong>, <small>съешь еще</small> французских булок.
  </p>
  <br>

  <a href="">Link</a>
  <br><br>

  <table>
    <thead>
      <tr>
        <th>Input</th>
        <th>Example</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>text</td>
        <td><input type="text" name="text"></input></td>
      </tr>
      <tr>
        <td>disabled</td>
        <td><input type="text" name="text" disabled></input></td>
      </tr>
      <tr>
        <td>value</td>
        <td><input type="text" name="text" value="Lorem ipsum dolor sit amet"></input></td>
      </tr>
      <tr>
        <td>loading</td>
        <td><input type="text" name="text" class="is-autocheck-loading"></input></td>
      </tr>
      <tr>
        <td>successful</td>
        <td><input type="text" name="text" class="is-autocheck-successful"></input></td>
      </tr>
      <tr>
        <td>error</td>
        <td>
          <input type="text" name="text" class="is-autocheck-error"></input>
          <ul v-if="errors.length" class="error">
            <li v-for="error in errors">{{ error }}</li>
          </ul>
        </td>
      </tr>
      <tr>
        <td>placeholder</td>
        <td>
            <input type="text" name="password" placeholder="placeholder"></input>
        </td>
      </tr>
      <tr>
        <td>password</td>
        <td><input type="password" name="password"></input></td>
      </tr>
      <tr>
        <td>button</td>
        <td><button type="submit" class="base-button">Hello Button</button></td>
      </tr>
    </tbody>
  </table>
  <br>

</div>
</template>

<style scoped>
  @import "../styles/typography.css";
  @import "../styles/input.css";
  @import "../styles/link.css";
  @import "../styles/button.css";
  @import "../styles/card.css";
  @import "../styles/alert.css";
  @import "../styles/list.css";
</style>

<script>
export default {
  data() {
    return {
      errors: [
        'Ошибка введенных данных',
        'Error entering data',
      ]
    }
  }
};
</script>
