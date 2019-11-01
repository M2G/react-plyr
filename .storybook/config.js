import { addParameters, configure } from '@storybook/react';

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

function loadStories() {
  require('./stories/index.js');
}

configure(loadStories, module);
