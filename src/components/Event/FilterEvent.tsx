import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {normalize} from '../../common/function/normalize';
import {colors, font, icons} from '../../common/assets/';
import fonts from '../../common/assets/fonts';
import ActionSheet, {
  SheetManager,
  SheetProps,
} from 'react-native-actions-sheet';
import {Category} from '../Category/Category';

export const FilterEventSheet = (props: SheetProps<{tel: string}>) => {
  const categories = [
    {
      name: 'All',
    },
    {
      id: 'ae265f73-d52c-4bac-9924-6e54d5395b01',
      name: 'Movies & Cinema',
      icon: icons.movie,
    },
    {
      id: '91702911-0267-4d50-97a1-ad920b477f91',
      name: 'Sport',
      icon: icons.sport,
    },
    {
      id: '212e5213-5321-4e51-94cc-e420a9ef59f5',
      name: 'Party and Night Life',
      icon: icons.party,
    },
    {
      id: 'b9e932a9-d0fe-4b49-9de1-e34928bc57f2',
      name: 'Travel',
      icon: icons.party,
    },
    {
      id: '485edcab-c43d-4074-8092-b4a7652b69de',
      name: 'Nature',
      icon: icons.party,
    },
    {
      id: 'b7af4749-90e4-4b75-b6f6-86f123d6d474',
      name: 'Health &Wellness',
      icon: icons.party,
    },
    {
      id: 'cd924f7a-4bf8-4248-abd8-27728272ee38',
      name: 'Culture',
      icon: icons.party,
    },
    {
      id: '747f05c0-0d6d-4879-9fbd-9ebd9c8623b8',
      name: 'Food & Cooking',
      icon: icons.party,
    },
    {
      id: '5ba5d8ae-1e18-4abd-92b8-e705e8b8efbd',
      name: 'Education',
      icon: icons.party,
    },
    {
      id: 'cc0d5bd1-168a-400b-b3d9-3c976dd217c9',
      name: 'Gaming',
      icon: icons.party,
    },
    {
      id: '13bd27d4-2431-4c97-8d24-25ff301fd8c1',
      name: 'Language Exchange',
      icon: icons.party,
    },
  ];

  return (
    <ActionSheet
      containerStyle={{
        height: normalize(600),
      }}
      id={props.sheetId}
      useBottomSafeAreaPadding
      gestureEnabled={true}>
      <View style={styles.container}>
        <Text style={styles.header}>Filters</Text>
        <View style={styles.categories}>
          {categories.map(c => {
            return (
              <Category
                name={c.name}
                icon={c.icon}
                textColor={colors.primary}
                backgroundColor={colors.secondary}></Category>
            );
          })}
        </View>
      </View>
    </ActionSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: normalize(16),
    paddingVertical: normalize(15),
  },
  header: {
    fontFamily: font.medium,
    fontSize: normalize(20),
  },
  categories: {
    marginVertical: normalize(20),
    margin: normalize(10),
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
});
