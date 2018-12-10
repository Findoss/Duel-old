import { storiesOf } from '@storybook/vue';

import BaseInput2 from './index.vue';

storiesOf('Base/Input', module)
  .add('logo', () => ({
    components: { 'z-input': BaseInput2 },
    template: `
      <z-input />
    `,
  }));