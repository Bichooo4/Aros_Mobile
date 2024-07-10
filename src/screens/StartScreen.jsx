import React, { useEffect, useState } from 'react';
import ProgressBar from '../components/ProgressBar';
import { View, Image, StyleSheet, Dimensions, Animated } from 'react-native';

export default function StartScreen ({ navigation }) {
    const [progress, setProgress] = useState(new Animated.Value(0));

    useEffect(() => {
        Animated.timing(progress, {
            toValue: 1,
            duration: 10000,
            useNativeDriver: false,
        }).start(() => {
            navigation.replace('MapScreen');
        });
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/logo.png')}
                style={styles.logo}
                resizeMode="contain"
            />
            <ProgressBar progress={progress} />
        </View>
    );
};

const logoSize = 300; 
const marginTop = -75; 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#101A33',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    logo: {
        width: logoSize,
        height: logoSize,
        marginTop: marginTop, 
    },
});