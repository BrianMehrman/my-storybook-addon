import React from 'react';
import { storiesOf } from '@storybook/react';
import withNotes from '../src/notes-addon';

import { Button } from '@storybook/react/demo';
import { action } from '@storybook/addon-actions';

// import { logger } from '@storybook/node-logger';

// logger.info('=> test.');

storiesOf('Button', module)
  .addDecorator(withNotes)
  .add('with text', () => (
    <Button onClick={action('Click')}>
      Hello Button
    </Button>
  ), { notes: 'Notes go here' })
  .add('with some emoji', () => (
    <Button><span role='img' aria-label='so cool'>😀 😎 👍 💯</span></Button>
  ));
