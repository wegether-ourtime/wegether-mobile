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
import {stylesCentral} from '../../common/styles/StylesCentral';
import {Event} from '../../components/Event/Event';
import * as RootNavigation from '../../navigations/RootNavigation';
import {useAuthStore} from '../../stores/authStore';
import {useEventStore} from '../../stores/eventStore';

interface Prop {}

const JoinedScreen: React.FC<Prop> = (props: Prop) => {
  const user = useAuthStore(state => state.user);
  const events = useEventStore(state => state.events);
  const criteria = useEventStore(state => state.criteria);
  const getEvents = () =>
    useEventStore.getState().getEvents({
      eventType: EventType.JOINED,
      uesrId: user?.userId,
      ...criteria,
    });

  useFocusEffect(
    React.useCallback(() => {
      getEvents();
    }, []),
  );

  useEffect(() => {
    getEvents();
  }, []);

  // const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <>
      <View style={[{flex: 1, backgroundColor: colors.grayBg, padding: 8}]}>
        <FlatList
          keyExtractor={item => item.eventId}
          data={events}
          extraData={events}
          renderItem={({index, item}: any) => (
            <Event
              name={item.eventName}
              image={item.eventImage}
              description={item.description}></Event>
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
export default JoinedScreen;
