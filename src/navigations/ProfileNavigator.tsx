import {createStackNavigator} from '@react-navigation/stack';
import FriendProfileScreen from '../screens/ProfileScreen/FriendProfileScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';

const Stack = createStackNavigator();

export const ProfileNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, gestureEnabled: false}}>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="FriendProfileScreen" component={FriendProfileScreen} />
    </Stack.Navigator>
  );
};
