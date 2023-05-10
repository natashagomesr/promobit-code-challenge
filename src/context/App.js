import PropTypes from 'prop-types';

import React, { createContext, useContext } from 'react';

const AppContext = createContext();

function AppProvider({ children }) {
  return (
    <AppContext.Provider
      value={{}}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useApp must be used within a AppProvider');
  }

  return {

  };
}

AppProvider.propTypes = {
  children: PropTypes.element.isRequired
};

export default AppProvider;
