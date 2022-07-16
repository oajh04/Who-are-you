import * as React from 'react';
import Navigation from './src/router';
import {ToastProvider} from 'react-native-toast-notifications';
// import {SafeAreaView} from 'react-native-safe-area-context';

const App = () => {
  return (
    <ToastProvider placement="bottom">
      <Navigation />
    </ToastProvider>
  );
};

export default App;
