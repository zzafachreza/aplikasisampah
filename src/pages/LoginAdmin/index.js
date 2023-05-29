import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, ActivityIndicator, TouchableOpacity, BackHandler, Alert, TextInput } from 'react-native';
import { fonts, windowWidth, colors, windowHeight } from '../../utils';
import { MyInput, MyGap, MyButton } from '../../components';
import axios from 'axios';
import { apiURL, api_token, MYAPP, storeData } from '../../utils/localStorage';
import { showMessage } from 'react-native-flash-message';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';

export default function ({ navigation }) {

    const [kirim, setKirim] = useState({
        api_token: api_token,
        telepon: null,
        pin: ''
    });
    const [loading, setLoading] = useState(false);


    const pinInput = useRef();

    const masuk = () => {

        console.log(kirim);
        if (kirim.telepon == null && kirim.pin.length == 0) {
            Alert.alert(MYAPP, 'Telepon atau PIN Anda, Tidak Boleh Kosong !');
        } else if (kirim.pin.length == 0) {
            Alert.alert(MYAPP, 'PIN Tidak Boleh Kosong !');
        } else if (kirim.telepon == null) {
            Alert.alert(MYAPP, 'Telepon Tidak Boleh Kosong ! ');
        } else {


            setLoading(true);


            axios
                .post(apiURL + 'login_admin', kirim)
                .then(res => {
                    setLoading(false);
                    console.log(res.data);
                    if (res.data.status == 404) {
                        showMessage({
                            type: 'danger',
                            message: res.data.message
                        })
                    } else {
                        storeData('user', res.data.data);
                        navigation.replace('HomeAdmin')
                    }

                });



        }




    }

    useEffect(() => {

        // const backAction = () => {
        //   Alert.alert("Info Wks", "Apakah kamu yakin akan keluar aplikasi ?", [
        //     {
        //       text: "Cancel",
        //       onPress: () => null,
        //       style: "cancel"
        //     },
        //     { text: "YES", onPress: () => BackHandler.exitApp() }
        //   ]);
        //   return true;
        // };

        // const backHandler = BackHandler.addEventListener(
        //   "hardwareBackPress",
        //   backAction
        // );

        // return () => backHandler.remove();
    }, []);

    const _checkCode = (x) => {
        console.log(x)

    }


    const _focusePrevInput = (x) => {
        console.log(x)
    }

    return (
        <>
            <ScrollView style={{ padding: 10, flex: 1, backgroundColor: colors.white, position: 'relative' }}>

                <MyGap jarak={10} />
                <View style={{ padding: 10, marginTop: windowHeight / 5, flex: 1 }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 20,
                    }}>Masukkan Nomor Ponsel</Text>
                    <Text style={{
                        fontFamily: fonts.secondary[400],
                        fontSize: 14,
                    }}>Gunakan Nomor Kartu untuk masuk yang telah terdaftar</Text>
                    <MyGap jarak={20} />
                    <View style={{
                        marginBottom: 10,
                        flexDirection: 'row',
                        borderColor: colors.tertiary,
                        borderWidth: 1,
                        borderRadius: 5,
                        overflow: 'hidden'
                    }}>
                        <View style={{
                            width: 50,
                            backgroundColor: colors.tertiary,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text style={{
                                fontFamily: fonts.secondary[600],
                                fontSize: 18,
                                color: colors.white
                            }}>+62</Text>
                        </View>
                        <View style={{
                            flex: 1,
                        }}>
                            <TextInput onChangeText={x => setKirim({
                                ...kirim,
                                telepon: x
                            })} keyboardType='phone-pad' style={{
                                height: 45,
                                left: 5,
                                fontFamily: fonts.secondary[600],
                                fontSize: 18,
                                color: colors.black
                            }} />
                        </View>
                    </View>

                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 20,
                        textAlign: 'center'
                    }}>Masukkan PIN Anda</Text>



                    <View style={{
                        marginVertical: 20,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <SmoothPinCodeInput
                            ref={pinInput}
                            value={kirim.pin}
                            codeLength={6}
                            cellStyle={{
                                borderWidth: 1,
                                borderRadius: 5,
                                borderColor: colors.tertiary,
                            }}
                            onTextChange={code => setKirim({
                                ...kirim,
                                pin: code
                            })}
                            onFulfill={_checkCode}
                            onBackspace={_focusePrevInput}
                        />
                    </View>

                    {!loading &&


                        <MyButton
                            onPress={masuk}
                            title="Masuk"
                            warna={colors.secondary}
                            Icons="log-in-outline"
                        />

                    }

                </View>
                {loading && <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <ActivityIndicator color={colors.primary} size="large" />
                </View>}
            </ScrollView>

        </>
    );
}

const styles = StyleSheet.create({});
