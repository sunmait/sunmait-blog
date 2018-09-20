import { configure, addDecorator } from '@storybook/react';
import React from 'react';
import backgrounds from "@storybook/addon-backgrounds";
import { withInfo, setDefaults } from '@storybook/addon-info';

function loadStories() {
  addDecorator((story, context) => withInfo('common info')(story)(context));
  addDecorator(story => (
    <div style={{fontFamily: 'sans-serif'}}>
      {story()}
    </div>
  ));
  setDefaults({
    header: false, // Toggles display of header with component name and description
    inline: false, // Displays info inline vs click button to view
    source: false, // Displays the source of story Component
    propTables: [/* Components used in story */], // displays Prop Tables with this components
  });

  // addon-bacogrunds
  addDecorator(backgrounds([
    { name: "default", value: "#fff", default: true },
    { name: "twitter", value: "#00aced", },
    { name: "facebook", value: "#3b5998" },
  ]));

  require('./stories/index.js');
}

configure(loadStories, module);
