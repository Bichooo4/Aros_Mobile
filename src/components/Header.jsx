import React from 'react';
import { View, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import logo from '../../assets/logo.png';

const screenHeight = Dimensions.get('window').height;

export default function Header({ backButton }) {
    const navigation = useNavigation();

    return (
        <View style={styles.header}>
            {backButton && (
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back-circle-sharp" size={40} color="white" />
                </TouchableOpacity>
            )}
            <Image source={logo} style={styles.logo} />
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#101A33',
        height: screenHeight * 0.15,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    backButton: {
        position: 'absolute',
        left: 20,
        top: 65,
        zIndex: 1,
    },
    iconBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
    },
    iconForeground: {
        position: 'absolute',
        top: 2,
        left: 2,
    },
    logo: {
        width: 300,
        height: 80,
        marginTop: 30,
        resizeMode: 'contain',
    },
});