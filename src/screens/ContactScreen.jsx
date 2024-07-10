import React from 'react';
import Header from '../components/Header';
import * as Location from 'expo-location';
import { useState, useEffect, useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Camera, CameraView } from 'expo-camera';
import { Picker } from '@react-native-picker/picker';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Image, ScrollView, ActivityIndicator, Alert, Button } from 'react-native';

export default function ContactScreen({ navigation }) {
  const cameraRef = useRef(null);
  const [city, setCity] = useState('');
  const [error, setError] = useState('');
  const [region, setRegion] = useState('');
  const [street, setStreet] = useState('');
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState('accident');
  const [imageUri, setImageUri] = useState('https://itaretet.sirv.com/accident%20image.jpg');
  const [userLocation, setUserLocation] = useState(null);
  const [submittedData, setSubmittedData] = useState([]);
  const [cameraVisible, setCameraVisible] = useState(false);
  const [cameraPermission, setCameraPermission] = useState(null);

  useEffect(() => {
    const fetchLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Permission to access location was denied');
        setLoading(false);
        return;
      }

      try {
        let location = await Location.getCurrentPositionAsync({});
        setCity('Cairo');
        setRegion('Shoubra');
        setStreet('shoubra street');
        setUserLocation(location);
        setLoading(false);
      } catch (error) {
        setError('Error fetching location');
        setLoading(false);
      }
    };

    fetchLocation();
  }, []);

  useEffect(() => {
    const getCameraPermission = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setCameraPermission(status === 'granted');
    };

    getCameraPermission();
  }, []);

  const takePicture = async () => {
    if (!cameraPermission) {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'No camera permission',
          'Please grant camera permission to take pictures.',
          [
            {
              text: 'OK',
              onPress: () => console.log('Permission denied'),
              style: 'cancel',
            },
          ],
          { cancelable: true }
        );
        return;
      }
    }

    try {
      setCameraVisible(true);
    } catch (error) {
      console.error('Error taking picture:', error);
      Alert.alert('Error', 'Failed to take picture. Please try again.');
    }
  };

  const handleTakePhoto = async () => {
    try {
      if (cameraRef.current) {
        const options = { quality: 0.5, base64: true };
        const photo = await cameraRef.current.takePictureAsync(options);
        console.log(photo.uri);
      }
    } catch (error) {
      console.error('Error taking picture:', error);
      Alert.alert('Error', 'Failed to take picture. Please try again.');
    }
  };

  const handleSubmit = () => {
    const data = {
      type,
      city,
      region,
      street,
      imageUri,
      latitude: userLocation?.coords.latitude,
      longitude: userLocation?.coords.longitude,
    };

    setSubmittedData([...submittedData, data]);
    console.log('Submitted Data:', data);
    navigation.navigate('MapScreen');
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Header backButton={true} />
        <ActivityIndicator style={styles.loadingIndicator} size="large" color="#101A33" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Header backButton={true} />
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header backButton={true} />
      {cameraVisible ? (
        <CameraView style={{ flex: 1, justifyContent: 'flex-end' }} facing="back" ref={cameraRef}>
          <TouchableOpacity style={styles.cameraButton} onPress={handleTakePhoto}>
            <Ionicons name="camera" size={24} color="white" />
          </TouchableOpacity>
        </CameraView>
      ) : (
        <ScrollView contentContainerStyle={styles.formContainer}>
          <Text style={styles.label}>Type</Text>
          <Picker
            selectedValue={type}
            onValueChange={(itemValue) => setType(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Accident" value="accident" />
            <Picker.Item label="Traffic Jam" value="traffic jam" />
            <Picker.Item label="Obstacle" value="obstacle" />
            <Picker.Item label="Road Issues" value="road issues" />
          </Picker>

          <Text style={styles.label}>City</Text>
          <TextInput
            style={styles.input}
            value={city}
            onChangeText={setCity}
            placeholder="City"
            editable={false}
          />

          <Text style={styles.label}>Region</Text>
          <TextInput
            style={styles.input}
            value={region}
            onChangeText={setRegion}
            placeholder="Region"
            editable={false}
          />

          <Text style={styles.label}>Street</Text>
          <TextInput
            style={styles.input}
            value={street}
            onChangeText={setStreet}
            placeholder="Street"
            editable={false}
          />

          <TouchableOpacity style={styles.TakePictureButton} onPress={takePicture}>
            <Ionicons name="camera" size={24} color="white" />
            <Text style={styles.cameraButtonText}>Take Picture</Text>
          </TouchableOpacity>

          {imageUri && (
            <View style={styles.imagePreview}>
              <Image source={{ uri: imageUri }} style={styles.previewImage} />
            </View>
          )}

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  TakePictureButton: {
    backgroundColor: '#101A33',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  cameraButtonText: {
    color: 'white',
    marginLeft: 10,
  },
  cameraButton: {
    backgroundColor: '#101A33',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginBottom: 20,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 40,
  },
  imagePreview: {
    alignItems: 'center',
    marginBottom: 10,
  },
  previewImage: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 5,
  },
  submitButton: {
    backgroundColor: '#101A33',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
  },
  loadingIndicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});