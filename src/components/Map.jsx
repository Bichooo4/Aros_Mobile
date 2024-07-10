import React from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import { View, StyleSheet, Dimensions, Text, Image } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function Map({ initialRegion, markers }) {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
        showsUserLocation={true}
        followsUserLocation={true}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: marker.lat, longitude: marker.lon }}
            title={marker.type}
          >
            <Callout>
              <View>
                <Text>{marker.type}</Text>
                <Text>{marker.description}</Text>
                <Image source={marker.imageURL} style={styles.calloutImage} />
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: width,
    height: height,
  },
  calloutImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    marginBottom: 10,
  },
});