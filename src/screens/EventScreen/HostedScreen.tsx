import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import {normalize} from '@rneui/themed';
import React, {useCallback, useEffect, useState} from 'react';
import {Image, Text, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-toast-message';
import {colors, image, icons} from '../../common/assets';
import fonts from '../../common/assets/fonts';
import {EventType} from '../../common/enums/eventStatus';
import {FileResource} from '../../common/enums/fileResource';
import {stylesCentral} from '../../common/styles/StylesCentral';
import {Event} from '../../components/Event/Event';
import UserEvent from '../../models/UserEvent';
import * as RootNavigation from '../../navigations/RootNavigation';
import {useEventStore} from '../../stores/eventStore';

interface Prop {}

const HostedScreen: React.FC<Prop> = (props: Prop) => {
  const events = useEventStore(state => state.events);
  const loading = useEventStore(state => state.loading);
  const criteria = useEventStore(state => state.criteria);
  const [userId, setUserId] = useState<string>('');
  const setCriteria = (criteria: any) =>
    useEventStore.getState().setCriteria(criteria);
  const getEvents = async () => {
    const userId = (await AsyncStorage.getItem('userId')) ?? '';
    setCriteria({...criteria, eventType: EventType.HOSTED, userId});
    setUserId(userId);
    const event = await useEventStore.getState().getEvents({
      ...criteria,
      eventType: EventType.HOSTED,
      userId,
    });
  };

  useFocusEffect(
    useCallback(() => {
      getEvents();
    }, []),
  );

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <>
      <View style={[{flex: 1, backgroundColor: colors.grayBg, padding: 8}]}>
        <FlatList
          keyExtractor={item => item.eventId}
          data={events}
          extraData={events}
          renderItem={({index, item}: any) => {
            return (
              <Event
                eventId={item.eventId}
                eventName={item.eventName}
                eventImage={item.eventImage}
                eventDetail={item.eventDetail}
                startDate={item.startDate}
                endDate={item.endDate}
                eventImg={item.imgUrl}
                isHost={item.hostId === userId}
                joined={true}
                location={item.location}
                userEvents={item.userEvents}
                userId={userId}
                maxParticipant={item.maxParticipant}
              />
            );
          }}
        />
        <View />
      </View>
      <Spinner
        visible={loading}
        textContent={'Loading...'}
        textStyle={{color: '#FFF'}}
      />
    </>
  );
};
export default HostedScreen;
