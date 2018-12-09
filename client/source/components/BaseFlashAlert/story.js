import { storiesOf } from '@storybook/vue';

import BaseFlashAlert from './index.vue';

storiesOf('Base/FlashAlert', module)
  .add('FlashAlert', () => ({
    components: { 'z-flash-alert': BaseFlashAlert },
    template: `
      <div> 
        <z-flash-alert type="info" :icon="true" >type="info"</z-flash-alert>
        <br/>
        <z-flash-alert type="success" :icon="true" >type="success"</z-flash-alert>
        <br/>
        <z-flash-alert type="warning" :icon="true" >type="warning"</z-flash-alert>
        <br/>
        <z-flash-alert type="error" :icon="true" >type="error"</z-flash-alert>
        <br/>
        <z-flash-alert :icon="false" >:icon="false"</z-flash-alert>
        <br/>
        <z-flash-alert :dismissible="true" >:dismissible="true"</z-flash-alert>
        <br/>
        <z-flash-alert :autoDelete="3000" >:autoDelete="3000"</z-flash-alert>
      </div>
    `,
  }));