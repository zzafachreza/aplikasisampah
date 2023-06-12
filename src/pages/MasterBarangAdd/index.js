import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Dimensions, TextInput } from 'react-native'
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


export default function MasterBarangAdd({ navigation, route }) {
    const options = {
        includeBase64: true,
        quality: 1,
    };

    const [kirim, setKirim] = useState({
        fid_kategori: '',
        foto_barang: 'https://zavalabs.com/nogambar.jpg',
        nama_barang: '',
        harga: '',
        keterangan: '',
        terjual: '',
    });
    const [loading, setLoading] = useState(false);

    const sendServer = () => {
        console.log(kirim);
        setLoading(true)

        axios.post(apiURL + 'barang_add', kirim).then(res => {

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

    const [kategori, setKategori] = useState([]);

    useEffect(() => {
        axios.post(apiURL + 'get_kategori').then(res => {
            console.log(res.data);
            setKategori(res.data);
            setKirim({
                ...kirim,
                fid_kategori: res.data[0].value
            })
        })
    }, [])

    const getGallery = xyz => {
        launchImageLibrary(options, response => {
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
                                foto_barang: `data:${response.type};base64, ${response.base64}`,
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
                        {kirim.foto_barang !== 'https://zavalabs.com/nogambar.jpg' && <Image source={{
                            uri: kirim.foto_barang
                        }} style={{
                            width: '110%',
                            height: 250,
                        }} />}
                        {kirim.foto_barang == 'https://zavalabs.com/nogambar.jpg' && <Image source={require('../../assets/camera.png')} style={{
                            width: 40,
                            height: 40,
                        }} />}
                    </TouchableOpacity>
                    <MyGap jarak={10} />

                    <MyInput label="Nama Barang" value={kirim.nama_barang} onChangeText={x => {
                        setKirim({
                            ...kirim,
                            nama_barang: x
                        })
                    }} />
                    <MyGap jarak={10} />
                    <MyPicker label="Kategori" value={kirim.fid_kategori} data={kategori} onValueChange={x => {
                        setKirim({
                            ...kirim,
                            fid_kategori: x
                        })
                    }} />
                    <MyGap jarak={10} />
                    <MyInput label="Harga" keyboardType='number-pad' value={kirim.harga} onChangeText={x => {
                        setKirim({
                            ...kirim,
                            harga: x
                        })
                    }} />
                    <MyGap jarak={10} />


                    <MyInput height={100} label="Detail Produk" multiline value={kirim.keterangan} onChangeText={x => {
                        setKirim({
                            ...kirim,
                            keterangan: x
                        })
                    }} />

                    <MyGap jarak={10} />
                    <MyInput label="Terjual" keyboardType='number-pad' value={kirim.terjual} onChangeText={x => {
                        setKirim({
                            ...kirim,
                            terjual: x
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