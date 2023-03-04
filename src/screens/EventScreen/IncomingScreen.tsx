import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {Image, Text, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
import {colors, image, icons} from '../../common/assets';
import {EventType} from '../../common/enums/eventStatus';
import {Event} from '../../components/Event/Event';
import {useAuthStore} from '../../stores/authStore';
import {useEventStore} from '../../stores/eventStore';

interface Prop {}

const IncomingScreen: React.FC<Prop> = (props: Prop) => {
  const user = useAuthStore(state => state.user);
  const events = useEventStore(state => state.events);
  const loading = useEventStore(state => state.loading);
  const criteria = useEventStore(state => state.criteria);
  const getEvents = () =>
    useEventStore
      .getState()
      .getEvents({
        eventType: EventType.INCOMING,
        uesrId: user?.userId,
        ...criteria,
      });

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
          renderItem={({index, item}: any) => (
            <Event
              eventId={item.eventId}
              eventName={item.eventName}
              eventImage={item.eventImage}
              eventDetail={item.eventDetail}
              startDate={item.startDate}
              endDate={item.endDate}
              // location={item.location}
            ></Event>
          )}
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
