import {useCallback, useEffect, useState} from 'react';
import {StyleSheet, Text, TextInput, View, Image, FlatList} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors, font, icons} from '../../common/assets';
import images from '../../common/assets/images';
import {height, normalize} from '../../common/function/normalize';
import {stylesApp} from '../../common/styles/AppStyle';
import {stylesCentral} from '../../common/styles/StylesCentral';
import {Touchable} from '../../components/Button/Touchable';
import {CalendarInput} from '../../components/Input/Calendar';
import TextInputArea from '../../components/Input/TextArea';
import TimeInput from '../../components/Input/Time';
import CustomHeader from '../../components/Text/CustomHeader';
import {useAuthStore} from '../../stores/authStore';
import {useEventStore} from '../../stores/eventStore';
import * as RootNavigation from '../../navigations/RootNavigation';
import {launchImageLibrary} from 'react-native-image-picker';
import {Couter} from '../../components/Input/Couter';
import {useFileStore} from '../../stores/fileStore';
import {FileResource} from '../../common/enums/fileResource';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import {useFocusEffect} from '@react-navigation/native';
import UserEvent from '../../models/UserEvent';
import {SheetManager} from 'react-native-actions-sheet';
import Event from '../../models/Event';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {allCategories} from '../../common/function/utility';
import {Category} from '../../components/Category/Category';

const CreateEventScreen: React.FC<any> = ({navigation, route}) => {
  const [isEdit] = useState(route?.params?.isEdit);
  const eventId = route?.params?.eventId;
  const form = useEventStore(state => state.form);
  const loading = useEventStore(state => state.loading);
  // const user = useAuthStore(state => state.user);
  const [toggleModalUpload, setToggleModalUpload] = useState<boolean>(false);
  const [eventImg, setEventImg] = useState<any>();
  const [isHost, setIsHost] = useState(undefined);
  const validateField = form
    ? !Object.entries(form).some(x => {
        if (['endDate', 'eventCategories'].includes(x[0])) {
          return false;
        }

        return x[1] === null || x[1] === '';
      })
    : null;

  const onSubmit = async () => {
    if (!validateField) {
      Toast.show({
        type: 'fail',
        position: 'top',
        // topOffset : 10,
        text1: 'Error',
        text2: 'Some field must not empyu!',
      });
    } else {
      const userId = await AsyncStorage.getItem('userId');
      let event: Event;
      let file: any;
      if (form?.eventId) {
        event = await useEventStore.getState().updateEvent(form?.eventId, {
          ...form,
        });
      } else {
        event = await useEventStore.getState().createEvent({
          ...form,
          userEvents: [{userId, isHost: true}],
        });
      }

      if (eventImg?.assets) {
        file = await useFileStore
          .getState()
          .uploadFile(eventImg, FileResource.EVENT, event.eventId);
      }

      if (event && eventImg?.assets && file) {
        setEventImg(undefined);
        RootNavigation.navigate('Main', {
          screen: 'EventDetailScreen',
          params: {eventId: event.eventId},
        });
      } else {
        // err message
      }
    }
  };

  const getEvent = async () => {
    if (isEdit) {
      const event = await useEventStore.getState().getEvent(eventId);
      useEventStore.getState().setForm({
        ...event,
      });

      if (event.imgUrl) {
        setEventImg(event.imgUrl);
      }

      const isHost = event.userEvents.find(async (ue: UserEvent) => {
        const userId = await AsyncStorage.getItem('userId');
        return ue.userId == userId;
      })?.isHost;
      isHost && setIsHost(isHost);
    }
    // else {
    //   useEventStore.getState().clearForm();
    // }
  };

  const onChangeText = (field: string, value: string) =>
    useEventStore.getState().setForm({...form, [field]: value});

  const onPressChangeImg = async () => {
    await launchImageLibrary(
      {
        mediaType: 'photo',
      },
      async res => {
        if (!res.didCancel) {
          setEventImg(res);
        }
      },
    );
  };

  const onSelectCategory = (categoryId: string) => {
    if (
      !form?.eventCategories?.find((ec: any) => ec.categoryId === categoryId)
    ) {
      useEventStore.getState().setForm({
        ...form,
        eventCategories: [
          ...(form?.eventCategories ? [...form?.eventCategories] : []),
          {eventId, categoryId},
        ],
      });
    } else {
      useEventStore.getState().setForm({
        ...form,
        eventCategories: form?.eventCategories.filter(
          (ec: any) => ec.categoryId !== categoryId,
        ),
      });
    }
  };

  useEffect(() => {
    getEvent();
  }, [isEdit]);

  useEffect(() => {
    useEventStore.getState().clearForm();
  }, []);

  useFocusEffect(
    useCallback(() => {
      getEvent();
    }, []),
  );

  return (
    <SafeAreaView style={[stylesApp.container]}>
      <CustomHeader
        title={isEdit ? form?.eventName : 'Post Event'}
        showBackBtn={isEdit}
        onPressBack={() => navigation.goBack()}
      />
      <View style={styles.main}>
        <ScrollView
          keyboardShouldPersistTaps="always"
          style={{flex: 1}}
          contentContainerStyle={{
            paddingBottom: normalize(130),
          }}>
          <View
            style={[
              styles.input,
              {
                marginHorizontal: normalize(24),
                padding: normalize(0),
                height: normalize(200),
                alignItems: 'center',
                justifyContent: 'center',
              },
            ]}>
            {eventImg ? (
              <>
                <TouchableOpacity
                  containerStyle={styles.changeImg}
                  onPress={() => onPressChangeImg()}>
                  <Image source={icons.changeImage}></Image>
                </TouchableOpacity>
                <Image
                  source={
                    eventImg?.assets ? eventImg.assets[0] : {uri: eventImg}
                  }
                  style={{
                    height: '100%',
                    width: '100%',
                  }}
                />
              </>
            ) : (
              <TouchableOpacity
                containerStyle={{
                  height: '100%',
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={async () => {
                  const img = await launchImageLibrary(
                    {
                      mediaType: 'photo',
                    },
                    res => {
                      if (!res.didCancel) setEventImg(res);
                    },
                  );
                }}>
                <Image
                  source={icons.addButton}
                  style={{
                    height: normalize(25),
                    width: normalize(25),
                  }}
                />
              </TouchableOpacity>
            )}
          </View>
          <FlatList
            keyExtractor={item => item.id}
            data={allCategories}
            style={styles.categories}
            horizontal
            // pagingEnabled={false}
            showsHorizontalScrollIndicator={false}
            // extraData={events}
            renderItem={({index, item}: any) => {
              return (
                <Category
                  key={item.id}
                  categoryId={item.id}
                  name={item.name}
                  icon={item.icon}
                  selected={
                    form?.eventCategories?.find(
                      (ec: any) => ec.categoryId === item.id,
                    )
                      ? true
                      : false
                  }
                  // backgroundColor={colors.transOrange}
                  // textColor={colors.white}
                  // disabled={
                  //   criteria?.categoriesId.length === 3 &&
                  //   !criteria?.categoriesId.find((sc: string) => sc === item.id)
                  // }
                  onSelect={(categoryId: string) =>
                    onSelectCategory(categoryId)
                  }
                />
              );
            }}
          />

          <View style={styles.inputConatiner}>
            <View style={styles.inputName}>
              <Text style={styles.inputText}>Name</Text>
            </View>
            <TextInput
              value={form?.eventName}
              style={styles.input}
              editable={true}
              placeholder={'Event Name'}
              // placeholderTextColor={colors.disable}
              onChangeText={value => onChangeText('eventName', value)}
            />
          </View>
          <View
            style={{
              ...styles.inputConatiner,
              // marginHorizontal: normalize(24),
              marginTop: normalize(8),
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={styles.inputText}>How many People?</Text>
            <View style={{paddingHorizontal: normalize(10)}}>
              <Couter
              // disabled={view}
              ></Couter>
            </View>
          </View>
          <View style={styles.inputConatiner}>
            <View style={styles.inputName}>
              <Image
                source={icons.calendar}
                style={{marginHorizontal: normalize(4)}}
              />
              <Text style={styles.inputText}>Days</Text>
            </View>
            <CalendarInput
              style={styles.input}
              // disabled={view}
            ></CalendarInput>
          </View>
          <View style={styles.inputConatiner}>
            <View style={styles.inputName}>
              <Image
                source={icons.time}
                style={{marginHorizontal: normalize(4)}}
              />
              <Text style={styles.inputText}>Times</Text>
            </View>
            <TimeInput
              style={styles.input}
              // disabled={view}
            ></TimeInput>
          </View>
          <View style={styles.inputConatiner}>
            <View style={styles.inputName}>
              <Image
                source={icons.location}
                style={{marginHorizontal: normalize(4)}}
              />
              <Text style={styles.inputText}>Location</Text>
            </View>
            <TouchableOpacity
              style={styles.input}
              // disabled={view}
              onPress={() => {
                RootNavigation.navigate('Main', {
                  screen: 'LocationScreen',
                });
              }}>
              {form?.location ? (
                <Text style={{color: colors.fontBlack}}>
                  {form.location.name}
                </Text>
              ) : (
                <Text style={{color: colors.grayPlaceholder}}>Location</Text>
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.inputConatiner}>
            <View style={styles.inputName}>
              {/* <Image
                source={icons.calendar}
                style={{marginHorizontal: normalize(4)}}
              /> */}
              <Text style={styles.inputText}>Detail</Text>
            </View>
            <TextInput
              value={form?.eventDetail}
              style={[
                styles.input,
                {
                  height: normalize(72),
                  paddingTop: normalize(15),
                  textAlignVertical: 'top',
                },
              ]}
              // editable={!view ?? true}
              placeholder={'รายละเอียดเพิ่มเติม'}
              multiline
              maxLength={133}
              onChangeText={value => onChangeText('eventDetail', value)}
            />
          </View>
          <Touchable
            label={'Post'}
            // disable={!validateField}
            // color={!validateField ? colors.disable : colors.primary}
            disable={false}
            color={colors.primary}
            fontColor={colors.white}
            style={[styles.button]}
            onPress={() => onSubmit()}></Touchable>
        </ScrollView>
      </View>
      <Spinner
        visible={loading}
        textContent={'Loading...'}
        textStyle={{color: '#FFF'}}
      />
    </SafeAreaView>
  );
};
export default CreateEventScreen;

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
  button: {
    margin: normalize(24),
    marginBottom: normalize(0),
    padding: normalize(10),
  },
  input: {
    height: normalize(48),
    padding: normalize(15),
    borderColor: colors.disable,
    borderWidth: 0.5,
    borderRadius: normalize(8),
    color: colors.fontBlack,
  },
  inputConatiner: {
    marginVertical: normalize(4),
    marginHorizontal: normalize(24),
  },
  inputName: {
    flexDirection: 'row',
    marginVertical: normalize(12),
  },
  changeImg: {
    position: 'absolute',
    right: normalize(8),
    top: normalize(8),
    zIndex: 1,
  },
  inputText: {
    paddingHorizontal: normalize(4),
    fontFamily: font.medium,
    fontSize: normalize(14),
  },
  categories: {
    marginTop: normalize(16),
    marginVertical: normalize(4),
    marginHorizontal: normalize(0),
    // paddingHorizontal: normalize(16),
    // backgroundColor: colors.disable,
  },
});
