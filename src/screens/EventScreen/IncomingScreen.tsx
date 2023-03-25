import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {Image, Text, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
import {colors, image, icons} from '../../common/assets';
import {EventType} from '../../common/enums/eventStatus';
import {FileResource} from '../../common/enums/fileResource';
import {Event} from '../../components/Event/Event';
import UserEvent from '../../models/UserEvent';
import {useAuthStore} from '../../stores/authStore';
import {useEventStore} from '../../stores/eventStore';

interface Prop {}

const IncomingScreen: React.FC<Prop> = (props: Prop) => {
  const events = useEventStore(state => state.events);
  const loading = useEventStore(state => state.loading);
  const criteria = useEventStore(state => state.criteria);
  const [userId, setUserId] = useState<string>('');
  const setCriteria = async (criteria: any) =>
    await useEventStore.getState().setCriteria(criteria);
  const getEvents = async () => {
    const userId = (await AsyncStorage.getItem('userId')) ?? '';
    setCriteria({...criteria, eventType: EventType.INCOMING, userId});
    setUserId(userId);
    const event = await useEventStore.getState().getEvents({
      ...criteria,
      eventType: EventType.INCOMING,
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
                userId={userId}></Event>
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
export default IncomingScreen;
