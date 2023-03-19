import {useCallback, useEffect, useState} from 'react';
import {StyleSheet, Text, TextInput, View, Image} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors, icons} from '../../common/assets';
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
    ? !Object.values(form).some(x => x === null || x === '')
    : null;

  const onSubmit = async () => {
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
      RootNavigation.navigate('Main', {
        screen: 'EventDetailScreen',
        params: {eventId: event.eventId},
      });
    } else {
      // err message
    }
  };

  const getEvent = async () => {
    if (isEdit) {
      const event = await useEventStore.getState().getEvent(eventId);
      useEventStore.getState().setForm({
        ...event,
      });

      const eventImg = await event?.files?.find(
        (f: any) => f.resource == FileResource.EVENT,
      );
      if (eventImg) {
        setEventImg(eventImg.path);
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
        title={isEdit ? form?.eventName : 'Create Event'}
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
                padding: normalize(0),
                height: normalize(200),
                alignItems: 'center',
                justifyContent: 'center',
              },
            ]}>
            {eventImg ? (
              <Image
                source={eventImg?.assets ? eventImg.assets[0] : {uri: eventImg}}
                style={{
                  height: '100%',
                  width: '100%',
                }}
              />
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
          <TextInput
            value={form?.eventName}
            style={styles.input}
            editable={true}
            placeholder={'Event Name'}
            // placeholderTextColor={colors.disable}
            onChangeText={value => onChangeText('eventName', value)}
          />
          <View
            style={{
              marginLeft: normalize(30),
              marginVertical: normalize(10),
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={{paddingHorizontal: normalize(10)}}>
              How many People?
            </Text>
            <View style={{paddingHorizontal: normalize(10)}}>
              <Couter
              // disabled={view}
              ></Couter>
            </View>
          </View>
          <CalendarInput
          // disabled={view}
          ></CalendarInput>
          <TimeInput
          // disabled={view}
          ></TimeInput>
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
          <TextInput
            value={form?.eventDetail}
            style={[
              styles.input,
              {
                minHeight: normalize(100),
                paddingTop: normalize(15),
                textAlignVertical: 'top',
              },
            ]}
            // editable={!view ?? true}
            placeholder={'รายละเอียดเพิ่มเติม'}
            multiline
            onChangeText={value => onChangeText('eventDetail', value)}
          />
          <Touchable
            label={'Post'}
            // disable={!validateField}
            // color={!validateField ? colors.disable : colors.primary}
            disable={false}
            color={colors.primary}
            fontColor={colors.white}
            style={[styles.button, {marginTop: normalize(30)}]}
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
    // flex: 0,
    // flexDirection: 'column',
    height: '100%',
  },
  button: {
    margin: normalize(20),
    marginBottom: normalize(0),
    padding: normalize(10),
  },
  input: {
    height: normalize(50),
    marginVertical: normalize(10),
    margin: normalize(30),
    padding: normalize(15),
    borderColor: colors.disable,
    borderWidth: 0.5,
    borderRadius: normalize(8),
    color: colors.fontBlack,
  },
});
