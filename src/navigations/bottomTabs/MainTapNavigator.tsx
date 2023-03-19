import React, {useContext, useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import messaging from '@react-native-firebase/messaging';
import {colors, font, icons} from '../../common/assets';
import {Text} from '@rneui/base';
import fonts from '../../common/assets/fonts';
import {normalize} from '@rneui/themed';
import {
  Image,
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import {TabActions} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
// import IncomeScreen from '../../screens/IncomeScreen';
import * as RootNavigation from '../../navigations/RootNavigation';
import {SheetManager} from 'react-native-actions-sheet';
import {ActionContext} from '../../../App';
import EventScreen from '../../screens/EventScreen/EventScreen';
import ProfileScreen from '../../screens/ProfileScreen/ProfileScreen';
import {
  responsiveHeigth,
  responsiveWidth,
} from '../../common/function/responsive';
import ScanScreen from '../../screens/ScanScreen/ScanScreen';
import EventFormScreen from '../../screens/EventFormScreen/EventFormScreen';
import ChatListScreen from '../../screens/ChatListScreen/ChatListScreen';
import {ProfileNavigator} from '../ProfileNavigator';

const Tab = createBottomTabNavigator();

const MainTapNavigator: React.FC<any> = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [registerNoti, setRegisterNoti] = useState(false);
  const [registerfailedModalNoti, setRegisterFailedModalNoti] = useState(false);
  const [initialRouteName, setInitialRouteName] = useState('Home');
  const {actiontaskId, setActiontaskId} = useContext(ActionContext);
  const ListPath = [
    {
      name: 'Home',
      title: 'หน้าหลัก',
      component: EventScreen,
      activeIcon: icons.homeActive,
      inactiveIcon: icons.homeInactive,
    },
    {
      name: 'Scan',
      title: 'หน้าสแกน qr code',
      component: ScanScreen,
      activeIcon: icons.qrActive,
      inactiveIcon: icons.qrInactive,
    },
    {
      name: 'CreateEvent',
      title: 'หน้าเพิ่มกิจกรรม',
      component: EventFormScreen,
      activeIcon: icons.createEventActive,
      inactiveIcon: icons.createEventInactive,
    },
    {
      name: 'Chat',
      title: 'ข้อความ',
      component: ChatListScreen,
      activeIcon: icons.chatActive,
      inactiveIcon: icons.chatInactive,
    },
    {
      name: 'Profile',
      title: 'หน้าโปรไฟล์',
      // ProfileScreen
      component: ProfileNavigator,
      activeIcon: icons.profileActive,
      inactiveIcon: icons.profileInactive,
    },
  ];

  return (
    <>
      <Tab.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={initialRouteName}>
        {ListPath.map((item, index) => {
          return (
            <Tab.Screen
              key={index}
              name={item.name}
              component={item.component}
              options={{
                tabBarLabelStyle: {
                  fontFamily: font.medium,
                },
                tabBarStyle: {
                  minHeight: Platform.OS === 'ios' ? 95 : 80,
                  alignItems: 'center',
                  justifyContent: 'center',
                },
                lazy: true,
                tabBarButton(props) {
                  const isFocused = props.accessibilityState?.selected;
                  return (
                    <TouchableOpacity
                      {...props}
                      style={[
                        props?.style,
                        {
                          padding: 8,
                          justifyContent: 'center',
                          alignItems: 'center',
                        },
                      ]}>
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Image
                          source={
                            isFocused ? item.activeIcon : item.inactiveIcon
                          }
                          style={
                            item.name === 'profile'
                              ? {width: 16, height: 20, marginTop: 3.5}
                              : {width: 25, height: 25}
                          }
                        />
                      </View>
                    </TouchableOpacity>
                  );
                },
              }}
            />
          );
        })}
      </Tab.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  modal: {
    width: '100%',
    height:
      Platform.OS === 'ios' ? responsiveHeigth(170) : responsiveWidth(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MainTapNavigator;
