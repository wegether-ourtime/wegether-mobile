import {normalize} from '@rneui/themed';
import React from 'react';
import {useState} from 'react';
import {View, useWindowDimensions, Text, StyleSheet} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {colors} from '../../common/assets';
import fonts from '../../common/assets/fonts';
import HostedScreen from '../../screens/EventScreen/HostedScreen';
import JoinedScreen from '../../screens/EventScreen/JoinedScreen';

const renderTabBar = (props: any) => (
  <TabBar
    {...props}
    indicatorStyle={{backgroundColor: colors.primary}}
    style={{backgroundColor: colors.background}}
    renderLabel={({route, focused, color}) => (
      <Text
        style={[styles.label, {color: focused ? colors.primary : colors.gray}]}>
        {route.title}
      </Text>
    )}
  />
);

const renderScene = SceneMap({
  joined: JoinedScreen,
  hosted: HostedScreen,
});

const MyEventNavigator: React.FC = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'joined', title: 'กิจกรรมที่เคยเข้าร่วม'},
    {key: 'hosted', title: 'กิจกรรมที่เป็นผู้สร้าง'},
  ]);

  return (
    <TabView
      navigationState={{index, routes}}
      renderTabBar={renderTabBar}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
      lazy
    />
  );
};

export default MyEventNavigator;

const styles = StyleSheet.create({
  label: {
    fontFamily: fonts.bold,
    fontSize: normalize(14),
  },
});
