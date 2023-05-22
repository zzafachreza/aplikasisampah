import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, ActivityIndicator, TouchableOpacity, BackHandler, Alert, TextInput } from 'react-native';
import { fonts, windowWidth, colors, windowHeight } from '../../utils';
import { MyInput, MyGap, MyButton } from '../../components';
import axios from 'axios';
import { apiURL, api_token, MYAPP, storeData } from '../../utils/localStorage';
import { showMessage } from 'react-native-flash-message';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';

export default function MasterBSUAdd({ navigation }) {

    const [kirim, setKirim] = useState({
        nama_lengkap: null,
        telepon: null,
        pin: null,
        alamat: null,
    });
    const [loading, setLoading] = useState(false);


    const pinInput = useRef();

    const daftar = () => {


        if (kirim.telepon == null) {
            Alert.alert(MYAPP, 'No Handphone tidak boleh kosong !');
        } else if (kirim.nama_lengkap == null) {
            Alert.alert(MYAPP, 'Nama tidak boleh kosong !');
        } else if (kirim.pin == null) {
            Alert.alert(MYAPP, 'PIN tidak boleh kosong !');
        } else {


            setLoading(true);
            console.log(kirim);

            axios
                .post(apiURL + 'bsu_add', kirim)
                .then(res => {
                    setLoading(false);
                    console.log(res.data);
                    if (res.data.status == 404) {
                        showMessage({
                            type: 'danger',
                            message: res.data.message
                        })
                    } else if (res.data.status == 200) {
                        showMessage({
                            type: 'success',
                            message: res.data.message
                        });
                        navigation.goBack();
                    }

                });



        }




    }


    return (
        <>
            <ScrollView style={{ padding: 10, flex: 1, backgroundColor: colors.white, position: 'relative' }}>


                <MyInput label="Nama" onChangeText={x => setKirim({
                    ...kirim,
                    nama_lengkap: x
                })} />
                <MyGap jarak={10} />
                <View style={{}}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 14,
                    }}>No. Handphone</Text>

                    <View style={{
                        marginBottom: 10,
                        flexDirection: 'row',
                        borderColor: colors.primary,
                        borderWidth: 1,
                        borderRadius: 5,
                        overflow: 'hidden'
                    }}>
                        <View style={{
                            width: 50,
                            backgroundColor: colors.primary,
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
                                fontFamily: fonts.secondary[400],
                                fontSize: 14,
                                color: colors.black
                            }} />
                        </View>
                    </View>
                </View>
                <MyInput placeholder="Masukkan 6 Digit Angka Berbeda" label="PIN" maxLength={6} onChangeText={x => setKirim({
                    ...kirim,
                    pin: x
                })} keyboardType="number-pad" secureTextEntry={true} />
                <MyGap jarak={10} />
                <MyInput label="Alamat" multiline rows={3} onChangeText={x => setKirim({
                    ...kirim,
                    alamat: x
                })} />
                <MyGap jarak={10} />



            </ScrollView>
            {loading && <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <ActivityIndicator color={colors.primary} size="large" />
            </View>}
            <TouchableOpacity onPress={daftar} style={{
                padding: 10,
                backgroundColor: colors.primary,
                justifyContent: 'center',
                alignItems: 'center'
            }}><Text style={{
                fontSize: 20,

                fontFamily: fonts.primary[800],
                textAlign: 'center',
                color: colors.white
            }}>REGISTRASI</Text></TouchableOpacity>
        </>
    );
}

const styles = StyleSheet.create({});
