import React, { Component } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import Login from './src/screens/login'
import Main from './src/screens/main';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {
  Colors,
  DebugInstructions,
  Header,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const AuthStack = createStackNavigator();
console.clear();

class App extends Component {

  render() {
    return (
      <NavigationContainer >
        <StatusBar
          hidden={true}
        />
        <AuthStack.Navigator screenOptions={{ headerShown: false }}>
          <AuthStack.Screen name="Login" component={Login} />
          <AuthStack.Screen name="Main" component={Main} />
        </AuthStack.Navigator>

      </NavigationContainer >
    );
  };
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#72BEDC',
  },
});

export default App;