import React from 'react';
import Map from '../components/Map';
import Modal from 'react-native-modal';
import Header from '../components/Header';
import * as Location from 'expo-location';
import { useState, useEffect } from 'react';
import { Entypo } from '@expo/vector-icons';  
import * as Progress from 'react-native-progress';
import Ionicons from '@expo/vector-icons/Ionicons';
import { View, StyleSheet, Dimensions, TouchableOpacity, Image, Text } from 'react-native';

const { width, height } = Dimensions.get('window');

const obstacles = [
  {
    lat: 30.128611, // Shoubra
    lon: 31.242222,
    type: 'accident',
    imageURL: require('../../assets/Obstacle icons/accident1.jpeg')
  },
  {
    lat: 30.0566104, // Nasr City
    lon: 31.3301076,
    type: 'accident',
    imageURL: require('../../assets/Obstacle icons/accident2.jpg')
  },
  {
    lat: 29.85, // Estimated Helwan
    lon: 31.25,
    type: 'Road obstacles',
    imageURL: require('../../assets/Obstacle icons/obstacle1.jpeg')
  },
  {
    lat: 29.85, // Estimated Helwan
    lon: 31.25,
    type: 'Road obstacles',
    imageURL: require('../../assets/Obstacle icons/obstacle2.jpeg')
  },
  {
    lat: 30.128611, // Shoubra
    lon: 31.242222,
    type: 'traffic jam',
    imageURL: require('../../assets/Obstacle icons/traffic jam.jpg')
  },
];

export default function MapScreen({ navigation }) {
  const [userLocation, setUserLocation] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [initialRegion, setInitialRegion] = useState({
    latitude: 26.9,
    longitude: 30.4,
    latitudeDelta: 5,
    longitudeDelta: 5,
  });

  // Fetch user location
  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, timeInterval: 1000, distanceInterval: 1 },
        (location) => {
          setUserLocation(location);

          setInitialRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          });
        }
      );
    };

    getLocation();
  }, []);

  // Add button press handler to navigate to ContactScreen
  const handleAddButtonPress = () => {
    navigation.navigate('ContactScreen');
  };

  const handleLocationPinPress = () => {
    if (userLocation) {
      setInitialRegion({
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
      toggleModal();
    }
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // Assuming distance is dynamically calculated or set
  const distance = 80; // Set distance here for demonstration

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.mapContainer}>
        <Map
          userLocation={userLocation}
          initialRegion={initialRegion}
          markers={obstacles}
        />
      </View>
      <TouchableOpacity style={styles.locationPinButton} onPress={handleLocationPinPress}>
        <Entypo name="location-pin" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.addButton} onPress={handleAddButtonPress}>
        <Ionicons name="add-circle" size={50} color="#101A33" />
      </TouchableOpacity>
      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContent}>
          <Image source={require('../../assets/Obstacle icons/accident1.jpeg')} style={styles.image} />
          {/* Case 1: Distance less than 100 meters */}
          {distance < 100 ? (
            <Progress.Bar progress={0.8} width={200} color="red" />
          ) : (
            // Case 2: Distance more than 200 meters
            <Progress.Bar progress={0.2} width={200} color="green" />
          )}
          <Text style={styles.text}>{distance}m</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, styles.yesButton]} onPress={toggleModal}>
              <Text style={styles.buttonText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.noButton]} onPress={toggleModal}>
              <Text style={styles.buttonText}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
    marginTop: 110,
  },
  addButton: {
    position: 'absolute',
    bottom: 30 * height / 640,
    right: 20 * width / 360,
  },
  locationPinButton: {
    position: 'absolute',
    bottom: 70 * height / 640,
    right: 23 * width / 360,
    backgroundColor: '#101A33',
    borderRadius: 25,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: '#101A33',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  text: {
    fontSize: 20,
    marginVertical: 10,
    color: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 5,
    width: 100,
    alignItems: 'center', 
  },
  yesButton: {
    backgroundColor: 'green',
  },
  noButton: {
    backgroundColor: 'red',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
