import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Button,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {stylesApp} from '../../common/styles/AppStyle';
import {Category} from '../../components/Category/Category';
import {useStore} from 'zustand';
import {useCategoryStore} from '../../stores/categoryStore';
import {useEventStore} from '../../stores/eventStore';

const InterestScreen: React.FC<any> = ({navigation}) => {
  const [data, setData] = useState();
  useEffect(() => {}, []);

  const categories = [
    {id: 'cd924f7a-4bf8-4248-abd8-27728272ee38', name: 'Culture'},
    {id: '5ba5d8ae-1e18-4abd-92b8-e705e8b8efbd', name: 'Education'},
    {id: '747f05c0-0d6d-4879-9fbd-9ebd9c8623b8', name: 'Food & Cooking'},
    {id: 'cc0d5bd1-168a-400b-b3d9-3c976dd217c9', name: 'Gaming'},
    {id: 'b7af4749-90e4-4b75-b6f6-86f123d6d474', name: 'Health &Wellness'},
    {id: '13bd27d4-2431-4c97-8d24-25ff301fd8c1', name: 'Language Exchange'},
    {id: 'ae265f73-d52c-4bac-9924-6e54d5395b01', name: 'Movies & Cinema'},
    {id: '485edcab-c43d-4074-8092-b4a7652b69de', name: 'Nature'},
    {id: '212e5213-5321-4e51-94cc-e420a9ef59f5', name: 'Party and Night Life'},
    {id: '91702911-0267-4d50-97a1-ad920b477f91', name: 'Sport'},
    {id: 'b9e932a9-d0fe-4b49-9de1-e34928bc57f2', name: 'Travel'},
  ];

  return (
    <SafeAreaView style={stylesApp.container}>
      <Text>Share your interests</Text>
      <Text>Choose at least one category to find your connection</Text>
      <View>
        {categories.map(c => {
          return <Category name={c.name} ></Category>;
        })}
      </View>
    </SafeAreaView>
  );
};

export default InterestScreen;

const styles = StyleSheet.create({
  //   inner: {
  //     paddingHorizontal: normalize(17),
  //     flex: 1,
  //     justifyContent: 'space-around',
  //   },
  //   headText: {
  //     fontFamily: font.bold,
  //     fontSize: normalize(20),
  //     marginBottom: normalize(24),
  //     color: colors.fontBlack,
  //   },
  //   label: {
  //     fontFamily: font.light,
  //     fontSize: normalize(14),
  //     color: colors.gray,
  //     marginTop: normalize(24),
  //   },
  //   containerTopCard: {
  //     flex: 1,
  //     paddingTop: normalize(70),
  //   },
});
