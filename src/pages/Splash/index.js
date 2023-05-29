import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  Animated,
  ImageBackground,
} from 'react-native';
import { MyButton } from '../../components';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { getData } from '../../utils/localStorage';
import LinearGradient from 'react-native-linear-gradient';

export default function Splash({ navigation }) {
  const top = new Animated.Value(0.3);

  const animasi = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(top, {
          toValue: 1,
          duration: 1000,
        }),
        Animated.timing(top, {
          toValue: 0.3,
          duration: 1000,
        }),
      ]),
      {
        iterations: 1,
      },
    ).start();
  };



  useEffect(() => {
    setTimeout(() => {
      getData('user').then(res => {

        if (!res) {
          navigation.replace('Home')
        } else {

          if (res.level !== 'Marketplace') {
            navigation.replace('HomeAdmin')
          } else {
            navigation.replace('Home')
          }

          // navigation.replace('Home')
        }
      })
    }, 1500)
  }, []);


  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.primary
    }}>
      <Image source={require('../../assets/logo.png')} style={{
        width: windowWidth / 3,
        height: windowWidth / 3,
        resizeMode: 'contain'
      }} />
      <Text style={{
        marginTop: 20,
        fontFamily: fonts.secondary[600],
        fontSize: 20
      }}>SIMBA</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
