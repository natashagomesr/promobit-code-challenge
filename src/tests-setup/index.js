import { render } from '@testing-library/react';

import AppProvider from '../context/App';

const renderWithProviders = component => render(
  <AppProvider>
    {component}
  </AppProvider>
  );

export default renderWithProviders;
