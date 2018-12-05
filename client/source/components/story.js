import { storiesOf } from '@storybook/vue';
import '../../tools/storybook/styles/colors.css';

storiesOf('Colors', module)
  .add('global colors', () => ({
    template: `
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
        <div class="row">
          <div class="color color-19">--color-text</div>
          <div class="color color-20">--color-text-strong</div>
          <div class="color color-21">--color-text-heading</div>
        </div>
        <div class="row">
          <div class="color color-22">? ? ?</div>
          <div class="color color-23">? ? ?</div>
          <div class="color color-24">? ? ?</div>
        </div>
      </div>
    `,
  }));