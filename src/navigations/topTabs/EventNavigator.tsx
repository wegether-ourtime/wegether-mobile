import {normalize} from '@rneui/themed';
import React from 'react';
import {useState} from 'react';
import {View, useWindowDimensions, Text, StyleSheet} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import fonts from '../../common/assets/fonts';
// import font from "../../../android/app/build/intermediates/assets/debug/mergeDebugAssets/fonts/font";
import {colors} from '../../common/assets';
import SuggestionScreen from '../../screens/EventScreen/SuggestionScreen';
import IncomingScreen from '../../screens/EventScreen/IncomingScreen';
import EventScreen from '../../screens/EventScreen/EventScreen';
// import NewEventScreen from '../../screens/MainScreen/NewEventScreen';
// import EventScreen from '../../screens/MainScreen/EventScreen';

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

interface Prop {}

const EventTapNavigator: React.FC<Prop> = (props: Prop) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'suggestion', title: 'Suggestion'},
    {key: 'incoming', title: 'Incoming'},
  ]);
  const renderScene = ({route}: any) => {
    switch (route.key) {
      case 'suggestion':
        return <SuggestionScreen />;
      case 'incoming':
        return <IncomingScreen />;
      default:
        return null;
    }
  };

  return (
    <TabView
      key={index}
      navigationState={{index, routes}}
      renderTabBar={renderTabBar}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
      lazy
    />
  );
};

export default EventTapNavigator;

const styles = StyleSheet.create({
  label: {
    fontFamily: fonts.bold,
    fontSize: normalize(16),
  },
});
