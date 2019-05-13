import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import InputWithLabel from '../../../src/components/common/input/InputWithLabel.jsx';
import withReduxForm from 'redux-form-storybook';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

storiesOf('Input Fields/Input with label', module)
  .addDecorator(withReduxForm)
  .add('Default input', () => <InputWithLabel placeholder="First Name" onChange={action('changed')} />)
  .add('Password input', () => <InputWithLabel type="password" placeholder="Password" onChange={action('changed')} />)
  .add('Input with custom color', () => {
    const theme = createMuiTheme({
      typography: {
        useNextVariants: true,
      },
      palette: {
        primary: {
          main: '#42f456',
        },
      },
    });
    return (
      <MuiThemeProvider theme={theme}>
        <InputWithLabel type="password" placeholder="Password" onChange={action('changed')} />
      </MuiThemeProvider>
    );
  });
