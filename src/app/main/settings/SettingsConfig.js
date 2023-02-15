import { lazy } from 'react';

const Settings = lazy(() => import('./Settings'));

const SettingsConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'settings',
      element: <Settings />,
      children: [
        {
          path: ':pageId',
          element: <Settings />,
          children: [
            {
              path: ':id',
              element: <Settings />,
            },
          ],
        },
      ],
    },
  ],
};

export default SettingsConfig;
