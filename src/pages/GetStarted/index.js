import React, { useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    Image,
    Animated,
    ImageBackground,
    TouchableOpacity,
    Linking,
    SafeAreaView,
} from 'react-native';
import { MyButton } from '../../components';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { getData } from '../../utils/localStorage';
import LinearGradient from 'react-native-linear-gradient';
import { Icon } from 'react-native-elements';
export default function GetStarted({ navigation }) {


    const masuk = () => {

        getData('user').then(res => {
            if (!res) {
                navigation.replace('Login')
            } else {
                navigation.replace('Home')

            }
        })
    }





    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',

            }}>
                <Image source={require('../../assets/logo.png')} style={{
                    width: windowWidth / 3,
                    height: windowWidth / 3,
                    resizeMode: 'contain'
                }} />
                <Text style={{
                    marginTop: 20,
                    fontFamily: fonts.secondary[600],
                    fontSize: 25
                }}>SIMBA</Text>
            </View>
            <View style={{
                // flex: 1,
                padding: 10,
                flexDirection: 'row'
            }}>
                <View style={{
                    flex: 1,
                    paddingRight: 5,
                }}>
                    <MyButton onPress={() => navigation.navigate('Register')} title="Registrasi" warna={colors.primary} />
                </View>
                <View style={{
                    flex: 1,
                    paddingLeft: 5,
                }}>
                    <MyButton onPress={() => navigation.navigate('Login')} title="Login" warna={colors.secondary} />
                </View>
            </View>
            <Text style={{
                margin: 10,
                textAlign: 'center',
                fontFamily: fonts.secondary[400],
                fontSize: 12,
                color: colors.foourty
            }}>Pastikan Nomor Anda Aktif, Jika ingin login/mendaftar</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({});
