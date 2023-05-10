import React from 'react';

import '@testing-library/jest-dom';

import ShowsProvider from '../../../context/Shows';

import Header from './header';
import renderWithProviders from '../../../tests-setup';

test('Should render the Header', () => {
  const { getByTestId } = renderWithProviders(
    <ShowsProvider>
      <Header />
    </ShowsProvider>
  );

  expect(getByTestId('header-title')).toBeInTheDocument();
});
