import { Alert, StyleSheet, Text, View, Image, PermissionsAndroid, FlatList, ActivityIndicator, Dimensions, TextInput } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'

import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, MYAPP, storeData } from '../../utils/localStorage';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { showMessage } from 'react-native-flash-message';
import Sound from 'react-native-sound';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { MyButton, MyGap, MyInput, MyPicker } from '../../components';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { FloatingAction } from "react-native-floating-action";
import 'intl';
import 'intl/locale-data/jsonp/en';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import moment from 'moment';


export default function JemputAdd({ navigation, route }) {

    const requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: 'Cool Photo App Camera Permission',
                    message:
                        'Cool Photo App needs access to your camera ' +
                        'so you can take awesome pictures.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                // console.log('You can use the camera');
            } else {
                // console.log('Camera permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    };


    const options = {
        includeBase64: true,
        quality: 0.3,
        maxWidth: 500,
        maxHeight: 500
    };

    const [kirim, setKirim] = useState({

        foto_jemput: 'https://zavalabs.com/nogambar.jpg',
        waktu: 'Pagi',
        armada: 'Truk',
        alamat_jemput: '',
        telepon_jemput: '',
    });
    const [loading, setLoading] = useState(false);

    const sendServer = () => {
        // console.log(kirim);
        setLoading(true)

        axios.post(apiURL + 'jemput_add', kirim).then(res => {

            console.log(res.data)

            if (res.data.status == 200) {
                Alert.alert(MYAPP, res.data.message)


                setLoading(false);
                navigation.goBack();

            } else if (res.data.status == 404) {
                Alert.alert(MYAPP, res.data.message)
                setLoading(false);
            }


        })

    }



    useEffect(() => {
        requestCameraPermission();
        getData('user').then(u => {
            setKirim({
                ...kirim,
                alamat_jemput: u.alamat,
                telepon_jemput: '+62' + u.telepon,
                fid_user: u.id
            })
        })
    }, [])

    const getGallery = xyz => {


        launchCamera(options, response => {
            // console.log('All Response = ', response);

            // console.log('Ukuran = ', response.fileSize);
            if (response.didCancel) {
                // console.log('User cancelled image picker');
            } else if (response.error) {
                // console.log('Image Picker Error: ', response.error);
            } else {
                if (response.fileSize <= 2000000) {
                    let source = { uri: response.uri };
                    switch (xyz) {
                        case 1:
                            setKirim({
                                ...kirim,
                                foto_jemput: `data:${response.type};base64, ${response.base64}`,
                            });
                            break;
                    }
                } else {
                    showMessage({
                        message: 'Ukuran Foto Terlalu Besar Max 500 KB',
                        type: 'danger',
                    });
                }
            }
        });
    };

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>
            <View style={{
                flex: 1,
                padding: 10,
            }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <TouchableOpacity onPress={() => getGallery(1)} style={{
                        width: '100%',
                        height: 250,
                        padding: 10,
                        overflow: 'hidden',
                        borderWidth: 1,
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderColor: colors.border
                    }}>
                        {kirim.foto_jemput !== 'https://zavalabs.com/nogambar.jpg' && <Image source={{
                            uri: kirim.foto_jemput
                        }} style={{
                            width: '110%',
                            height: 250,
                        }} />}
                        {kirim.foto_jemput == 'https://zavalabs.com/nogambar.jpg' && <Image source={require('../../assets/camera.png')} style={{
                            width: 40,
                            height: 40,
                        }} />}
                    </TouchableOpacity>

                    <MyGap jarak={10} />
                    <MyPicker label={`Jadwal Penjemputan ( ${moment().format('dddd , DD MMMM YYYY')} )`} value={kirim.armada} data={[
                        { label: 'Pagi', value: 'Pagi' },
                        { label: 'Siang', value: 'Siang' },
                    ]} onValueChange={x => {
                        setKirim({
                            ...kirim,
                            waktu: x
                        })
                    }} />

                    <MyGap jarak={10} />
                    <MyPicker label="Armada" value={kirim.armada} data={[
                        { label: 'Truk', value: 'Truk' },
                        { label: 'VIAR', value: 'VIAR' },
                        { label: 'Motor', value: 'Motor' },
                    ]} onValueChange={x => {
                        setKirim({
                            ...kirim,
                            armada: x
                        })
                    }} />

                    <MyGap jarak={10} />


                    <MyInput label="Alamat Penjemputan" multiline value={kirim.alamat_jemput} onChangeText={x => {
                        setKirim({
                            ...kirim,
                            alamat_jemput: x
                        })
                    }} />

                    <MyGap jarak={10} />
                    <MyInput label="No. Handphone yang bisa dihubungi" keyboardType='phone-pad' value={kirim.telepon_jemput} onChangeText={x => {
                        setKirim({
                            ...kirim,
                            telepon_jemput: x
                        })
                    }} />

                </ScrollView>
            </View>
            {!loading && <TouchableOpacity onPress={sendServer} style={{
                padding: 15,
                backgroundColor: colors.secondary
            }}>
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: 20,
                    color: colors.white,
                    textAlign: 'center'
                }}>KIRIM</Text>
            </TouchableOpacity>}

            {loading && <View style={{
                padding: 10,
            }}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>}
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({})