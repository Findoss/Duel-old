import { storiesOf } from '@storybook/vue';

import BaseLogo from './index.vue';

storiesOf('Base/Logo', module)
  .add('logo', () => ({
    components: { 'z-logo': BaseLogo },
    template: `
      <z-logo />
    `,
  }));