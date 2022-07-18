import * as React from 'react';
import Navigation from './src/router';
import {ToastProvider} from 'react-native-toast-notifications';
// import {SafeAreaView} from 'react-native-safe-area-context';

const App = () => {
  return (
    <ToastProvider
      placement="bottom"
      animationType="slide-in"
      offsetBottom={40}>
      <Navigation />
    </ToastProvider>
  );
};

export default App;
