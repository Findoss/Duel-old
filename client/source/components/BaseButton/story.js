import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';

import BaseButton from './index.vue';

storiesOf('Base/Button', module)
  .add('button', () => ({
    components: { 'z-button': BaseButton },
    template: `
      <z-button @click="action" > z-button </z-button>
    `,
    methods: { action: action('clicked') },
  }));