import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import InputWithPlaceholder from '../../../src/components/common/input/InputWithPlaceholder';
import withReduxForm from 'redux-form-storybook';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

storiesOf('Input Fields/Input with placeholder', module)
  .addDecorator(withReduxForm)
  .add('Default input', () => <InputWithPlaceholder placeholder="First Name" onChange={action('changed')} />)
  .add('Password input', () => (
    <InputWithPlaceholder type="password" placeholder="Password" onChange={action('changed')} />
  ))
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
        <InputWithPlaceholder type="password" placeholder="Password" onChange={action('changed')} />
      </MuiThemeProvider>
    );
  });
