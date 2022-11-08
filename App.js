import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigation from './Navigation/StackNavigation';
import {EventRegister} from 'react-native-event-listeners';
import {getData, ThemePalette} from './Theme/ThemePalette';

const App = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    let eventListener = EventRegister.addEventListener(
      'changeThemeEvent',
      data => {
        console.log(data);
        setIsDark(data);
      },
    );
    getData().then(res => {
      res === 'true' ? setIsDark(true) : setIsDark(false);
    });
    return () => {
      EventRegister.removeEventListener(eventListener);
    };
  }, []);

  return (
    <NavigationContainer
      theme={isDark ? ThemePalette.dark : ThemePalette.light}>
      <StackNavigation />
    </NavigationContainer>
  );
};

export default App;
