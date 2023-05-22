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


export default function MasterProdukEdit({ navigation, route }) {
    const options = {
        includeBase64: true,
        quality: 1,
    };

    const [kirim, setKirim] = useState(route.params);
    const [loading, setLoading] = useState(false);

    const sendServer = () => {
        console.log(kirim);
        setLoading(true)

        axios.post(apiURL + 'produk_edit', kirim).then(res => {

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
                newfoto_produk: null,
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
                                newfoto_produk: `data:${response.type};base64, ${response.base64}`,
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
                        {kirim.newfoto_produk !== 'https://zavalabs.com/nogambar.jpg' && <Image source={{
                            uri: kirim.newfoto_produk !== null ? kirim.newfoto_produk : kirim.foto_produk
                        }} style={{
                            width: '110%',
                            height: 250,
                        }} />}
                        {kirim.newfoto_produk == 'https://zavalabs.com/nogambar.jpg' && <Image source={require('../../assets/camera.png')} style={{
                            width: 40,
                            height: 40,
                        }} />}
                    </TouchableOpacity>
                    <MyGap jarak={10} />
                    <MyInput label="Kode Produk" value={kirim.kode_produk} onChangeText={x => {
                        setKirim({
                            ...kirim,
                            kode_produk: x
                        })
                    }} />
                    <MyInput label="Nama Produk" value={kirim.nama_produk} onChangeText={x => {
                        setKirim({
                            ...kirim,
                            nama_produk: x
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
                    <MyPicker label="Satuan" value={kirim.satuan} data={[
                        { label: 'Kg', value: 'Kg' },
                        { label: 'Pcs', value: 'Pcs' },
                    ]} onValueChange={x => {
                        setKirim({
                            ...kirim,
                            satuan: x
                        })
                    }} />
                    <MyGap jarak={10} />
                    <MyInput label="Contoh Produk" value={kirim.contoh} onChangeText={x => {
                        setKirim({
                            ...kirim,
                            contoh: x
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