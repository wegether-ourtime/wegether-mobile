import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  Alert,
  Platform,
  TouchableHighlight,
  Linking,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {useCameraDevices, Camera} from 'react-native-vision-camera';
import {useScanBarcodes, BarcodeFormat} from 'vision-camera-code-scanner';
import images from '../../common/assets/images';

const ScanScreen: React.FC<any> = ({navigation}) => {
  const [hasPermission, setHasPermission] = React.useState(false);
  const devices = useCameraDevices('triple-camera');
  const device = devices.back;
  console.log(devices);

  const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {
    checkInverted: true,
  });

  useEffect(() => {
    (async () => {
      console.log(await Camera.getCameraPermissionStatus())
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);

  useEffect(() => {
    if (barcodes && barcodes.length >= 0) {
      console.log(barcodes[0]?.displayValue);
    }
  }, [barcodes]);

  return (
    <SafeAreaView style={{flex: 1}}>
      {device != null && hasPermission && (
        <>
          <Camera
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
            frameProcessor={frameProcessor}
            frameProcessorFps={5}
          />
          {barcodes.map((barcode, idx) => (
            <Text key={idx} style={styles.barcodeTextURL}>
              {barcode.displayValue}
            </Text>
          ))}
        </>
      )}
    </SafeAreaView>
  );
};
export default ScanScreen;

const styles = StyleSheet.create({
  barcodeTextURL: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
});
