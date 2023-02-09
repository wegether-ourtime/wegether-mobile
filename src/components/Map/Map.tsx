import {normalize} from '@rneui/themed';
import {useState} from 'react';
import {Platform, StyleSheet} from 'react-native';
import MapView, {Marker, PROVIDER_DEFAULT, PROVIDER_GOOGLE} from 'react-native-maps';

export const Map: React.FC<any> = props => {
  const [position, setPosition] = useState({
    latitude: 0.0922,
    longitude: 0.0421,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  return (
    <MapView.Animated
      style={styles.map}
      zoomEnabled={false}
      zoomTapEnabled={false}
      pitchEnabled={false}
      rotateEnabled={false}
      scrollEnabled={false}
      provider={PROVIDER_GOOGLE}
      initialRegion={position}>
      <Marker coordinate={position} />
    </MapView.Animated>
  );
};

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: normalize(129),
    // marginTop: normalize(10),
  },
});
