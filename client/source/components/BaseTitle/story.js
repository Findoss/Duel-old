import { storiesOf } from '@storybook/vue';

import BaseTitle from './index.vue';

storiesOf('Base/Title', module)
  .add('all titles', () => ({
    components: { 'z-title': BaseTitle },
    template: `
      <z-title :size="1" > Size 1 <z-title>
      <br/>
      <z-title :size="2" > Size 2 <z-title>
      <br/>
      <z-title :size="3" > Size 3 <z-title>
      <br/>
      <z-title :size="4" > Size 4 <z-title>
    `,
  }));