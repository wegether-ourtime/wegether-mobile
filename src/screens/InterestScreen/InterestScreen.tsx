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
import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {stylesApp} from '../../common/styles/AppStyle';
import {Category} from '../../components/Category/Category';
import {Touchable} from '../../components/Button/Touchable';
import {colors, font, icons} from '../../common/assets';
import {normalize} from '../../common/function/normalize';
import * as RootNavigation from '../../navigations/RootNavigation';
import {useUserCategoryStore} from '../../stores/userCategoryStore';
import CustomHeader from '../../components/Text/CustomHeader';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {FlatList} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import {allCategories} from '../../common/function/utility';

const InterestScreen: React.FC<any> = ({navigation, route}) => {
  const [register] = useState(route?.params?.register);
  // const [userId] = useState(route?.params?.userId);
  const [selectCategories, setSelectCategories] = useState<string[]>([]);
  // const userCategories = useUserCategoryStore(state => state.userCategories);
  const [categories] = useState<any>(allCategories);
  const updateUserCategories = (payload: any) =>
    useUserCategoryStore.getState().updateUserCategories(payload);
  const getUserCategories = async () => {
    const userId = await AsyncStorage.getItem('userId');
    const userCategories = await useUserCategoryStore
      .getState()
      .getUserCategories({userId});

    setSelectCategories(
      userCategories.map((uc: any) => {
        return uc.categoryId;
      }),
    );
  };

  const onSelect = async (categoryId: string) => {
    if (!selectCategories.find(sc => sc === categoryId)) {
      if (selectCategories.length == 3) {
        Toast.show({
          type: 'fail',
        });
      } else {
        setSelectCategories([...selectCategories, categoryId]);
      }
    } else {
      setSelectCategories(selectCategories.filter(sc => sc != categoryId));
    }
  };

  const onSubmit = async () => {
    const userId = await AsyncStorage.getItem('userId');
    const userCategory = await updateUserCategories({
      userId,
      categoriesId: selectCategories,
    });
    if (userCategory) {
      if (register) {
        RootNavigation.navigate('Main', {
          screen: 'MainScreen',
        });
      }
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Update interests success.',
      });
    } else {
      Toast.show({
        type: 'fail',
        text1: 'Error',
        text2: 'Update interests fail.',
      });
    }
  };

  useEffect(() => {
    getUserCategories();
  }, []);

  useFocusEffect(
    useCallback(() => {
      getUserCategories();
    }, []),
  );

  return (
    <SafeAreaView style={stylesApp.container}>
      <CustomHeader
        title="Share your interests"
        showBackBtn
        onPressBack={() => {
          if (register) {
            navigation.goBack();
          } else {
            RootNavigation.navigate('Main', {
              screen: 'MainScreen',
            });
          }
        }}
      />
      <View style={styles.main}>
        <View style={[styles.info]}>
          <Text style={{fontFamily: font.medium, fontSize: normalize(14)}}>
            Choose at least one category to find your connection
          </Text>
        </View>
        <View style={styles.categories}>
          {categories.map((item: any, index: number) => {
            return (
              <Category
                key={item.id}
                categoryId={item.id}
                name={item.name}
                icon={item.icon}
                selected={
                  selectCategories.find((sc: string) => sc === item.id)
                    ? true
                    : false
                }
                disabled={
                  selectCategories.length === 3 &&
                  !selectCategories.find((sc: string) => sc === item.id)
                }
                onSelect={(categoryId: string) => {
                  onSelect(categoryId);
                }}></Category>
            );
          })}
        </View>
        <View style={{alignSelf: 'center'}}>
          <Text style={{fontFamily: font.medium, fontSize: normalize(14)}}>
            {selectCategories.length} / 3
          </Text>
        </View>
        <Touchable
          label={'Save'}
          color={colors.primary}
          fontColor={colors.white}
          style={[styles.button]}
          onPress={() => {
            onSubmit();
          }}></Touchable>
      </View>
    </SafeAreaView>
  );
};

export default InterestScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  button: {
    margin: normalize(20),
    marginBottom: normalize(0),
    padding: normalize(10),
  },
  categories: {
    marginVertical: normalize(20),
    margin: normalize(10),
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  info: {
    alignItems: 'center',
    justifyContent: 'center',
  },
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
