import { addDecorator, addParameters, configure } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';

// Option defaults:
addParameters({
  options: {
    isFullScreen: false,
    showNav: true,
    showPanel: true,
    panelPosition: 'right',
    sortStoriesByKind: false,
    hierarchySeparator: /\/|\./,
    hierarchyRootSeparator: /\|/,
    sidebarAnimations: true,
    enableShortcuts: true,
    // theme: undefined,
  },
});

addDecorator(withInfo({ inline: true, source: false }));
addDecorator(withKnobs);

const req = require.context('../stories', true, /.stories.tsx$/);

function loadStories() {
  req.keys().forEach(req);
}

configure(loadStories, module);

