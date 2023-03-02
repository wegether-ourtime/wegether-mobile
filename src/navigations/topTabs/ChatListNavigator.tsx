import {normalize} from '@rneui/themed';
import React from 'react';
import {useState} from 'react';
import {View, useWindowDimensions, Text, StyleSheet} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {colors} from '../../common/assets';
import fonts from '../../common/assets/fonts';
import DirectMessageScreen from '../../screens/ChatListScreen/DirectMessageScreen';
import EventMessageScreen from '../../screens/ChatListScreen/EventMessageScreen';

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
  dm: DirectMessageScreen,
  em: EventMessageScreen,
});

const ChatListNavigator: React.FC = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'dm', title: 'Direct Message'},
    {key: 'em', title: 'Event Message'},
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

export default ChatListNavigator;

const styles = StyleSheet.create({
  label: {
    fontFamily: fonts.bold,
    fontSize: normalize(14),
  },
});
