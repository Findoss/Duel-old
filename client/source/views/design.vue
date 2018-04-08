<template>
<div>

  <h1>h1. Heading</h1>
  <h2>h2. Heading</h2>
  <h3>h3. Heading</h3>
  <h4>h4. Heading</h4>

  <p>
    Lorem <strong>ipsum dolor sit</strong>, amet consectetur adipisicing elit. Sit commodi necessitatibus dicta mollitia? Incidunt, odit consequuntur cumque saepe quasi temporibus error maxime autem corporis, numquam eaque minima similique laudantium voluptatem?
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
        <td>password</td>
        <td><input type="password" name="password"></input></td>
      </tr>
      <tr>
        <td>button</td>
        <td><button type="submit">Hello Button</button></td>
      </tr>
    </tbody>
  </table>
  <br>

</div>
</template>

<style scope>
  @import "../styles/typography.css";
  @import "../styles/input.css";
  @import "../styles/link.css";
  @import "../styles/button.css";
</style>
