import * as React from 'react';
import Navigation from './src/router';
import {ToastProvider} from 'react-native-toast-notifications';

const App = () => {

  return (
    <ToastProvider placement="bottom">
      <Navigation />
    </ToastProvider>
  );
};

export default App;
