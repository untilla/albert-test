import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import styled from 'styled-components/native';
import { Text } from 'react-native';
import { fetchFilms } from './redux/actions';
import Main from './screens/Main';
import { RootState } from './redux/store';
import FilmDetails from './screens/FilmDetails';

const Stack = createStackNavigator();

const Loading = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: black;
`;

const AppRoot: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const { loaded } = useSelector((state: RootState) => state.app);
  useEffect(() => {
    dispatch(fetchFilms());
  }, [dispatch]);
  return (
    <NavigationContainer>
      {!loaded ? (
        <Loading>
          <Text style={{ color: 'white' }}>Loading...</Text>
        </Loading>
      ) : (
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="FilmDetails"
        >
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="FilmDetails" component={FilmDetails} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default AppRoot;
