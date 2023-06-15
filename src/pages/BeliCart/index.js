import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Dimensions, TextInput, PermissionsAndroid } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, MYAPP, storeData } from '../../utils/localStorage';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { showMessage } from 'react-native-flash-message';
import Sound from 'react-native-sound';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { MyButton, MyCarouser, MyGap, MyHeader, MyInput, MyPicker } from '../../components';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { FloatingAction } from "react-native-floating-action";
import 'intl';
import 'intl/locale-data/jsonp/en';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import { color } from 'react-native-elements/dist/helpers';
import { Linking } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';



export default function BeliCart({ navigation }) {

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
                                foto_beli: `data:${response.type};base64, ${response.base64}`,
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

    const [kirim, setKirim] = useState({
        foto_beli: 'https://zavalabs.com/nogambar.jpg'
    })
    const [tmp, setTmp] = useState([]);
    const [cart, setCart] = useState(0);
    const [total, setTotal] = useState(0);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({
        nama_lengkap: 'Eman'
    });
    const isFocused = useIsFocused();
    useEffect(() => {


        if (isFocused) {
            __getTransaction();
        }

    }, [isFocused]);

    const sendServer = () => {
        // setLoading(true);
        console.log(kirim);
        axios.post(apiURL + 'beli_add', kirim).then(rs => {
            console.log(rs.data);

            Alert.alert(MYAPP, 'Transaksi Berhasil Disimpan !');

            navigation.replace('HomeAdmin')
        })
        // setTimeout(() => {

        //     setLoading(false);
        // }, 1000)
    }

    const [jemput, setJemput] = useState([]);
    const __getTransaction = () => {
        setLoading(true);

        axios.post(apiURL + 'get_jemput_beli').then(jp => {
            setJemput(jp.data);
            console.log(jp.data);
            getData('user').then(res => {
                setUser(res);
                setKirim({
                    ...kirim,
                    fid_user: res.id
                })
                axios.post(apiURL + 'get_bcart', {
                    fid_user: res.id
                }).then(c => {
                    setCart(c.data);

                    console.log(c.data);
                })
                axios.post(apiURL + 'bcart', {
                    fid_user: res.id
                }).then(cc => {
                    setTotal(cc.data.total);
                    setData(cc.data.data);
                    setKirim({
                        ...kirim,
                        kode_jemput: jp.data[0].value,
                        fid_user: res.id,
                        total: cc.data.total
                    })
                    setLoading(false);
                })
            });
        })





    }




    return (






        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.myback,
        }}>

            {loading && <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}><ActivityIndicator color={colors.primary} size="large" /></View>}

            {!loading && <>

                {/* menu utama */}
                <View style={{
                    flex: 1,
                    backgroundColor: colors.white
                }}>
                    {/* header */}
                    <View style={{
                        padding: 10,
                        backgroundColor: colors.primary,

                    }}>
                        <View style={{

                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <Text style={{
                                flex: 1,
                                textAlign: 'center',
                                color: colors.white,
                                fontSize: 15,
                                fontFamily: fonts.secondary[600]
                            }}>Detail Pembelian</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('BeliCart', user)} style={{
                                position: 'relative',
                                height: 50,
                                width: 50,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <View style={{
                                    top: 0,
                                    right: 10,
                                    position: 'absolute',
                                    width: 16,
                                    borderRadius: 10,
                                    height: 16,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: colors.white
                                }}>
                                    <Text style={{
                                        fontFamily: fonts.secondary[600],
                                        color: colors.primary,
                                        fontSize: 10,
                                    }}>{cart}</Text>
                                </View>
                                <Icon type='ionicon' size={25} name='cart-outline' color={colors.white} />
                            </TouchableOpacity>
                        </View>


                    </View>

                    <View style={{
                        padding: 10,
                        backgroundColor: colors.white
                    }}>

                        <TouchableOpacity onPress={() => getGallery(1)} style={{
                            width: '100%',
                            height: 150,
                            padding: 10,
                            overflow: 'hidden',
                            borderWidth: 1,
                            borderRadius: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderColor: colors.border
                        }}>
                            {kirim.foto_beli !== 'https://zavalabs.com/nogambar.jpg' && <Image source={{
                                uri: kirim.foto_beli
                            }} style={{
                                width: '110%',
                                height: 150,
                            }} />}
                            {kirim.foto_beli == 'https://zavalabs.com/nogambar.jpg' && <Image source={require('../../assets/camera.png')} style={{
                                width: 40,
                                height: 40,
                            }} />}
                        </TouchableOpacity>

                        <MyGap jarak={10} />


                        <MyPicker value={kirim.jenis} label="Bank Sampah Unit (BSU) / Penjemputan" data={jemput} onValueChange={x => {
                            setKirim({
                                ...kirim,
                                kode_jemput: x
                            })
                        }} />


                    </View>


                    <ScrollView style={{
                        padding: 10,
                    }}>



                        {data.map(i => {
                            return (
                                <View style={{
                                    overflow: 'hidden',
                                    flexDirection: 'row',
                                    borderRadius: 10,
                                    marginVertical: 5,
                                    borderWidth: 1,
                                    borderColor: colors.border,

                                }}>
                                    <View style={{
                                        padding: 10,
                                    }}>
                                        <Image source={{
                                            uri: i.foto_produk
                                        }} style={{
                                            width: 60,
                                            height: 60,
                                            borderRadius: 10,
                                        }} />
                                    </View>
                                    <View style={{
                                        flex: 1,
                                        paddingRight: 10,
                                        paddingLeft: 10,
                                    }}>
                                        <Text style={{
                                            fontFamily: fonts.secondary[400],
                                            fontSize: 15,
                                        }}>{i.nama_produk}</Text>
                                        <View style={{
                                            flexDirection: 'row'
                                        }}>
                                            <Text style={{
                                                flex: 1,
                                                fontFamily: fonts.secondary[600],
                                                fontSize: 15,
                                            }}>{new Intl.NumberFormat().format(i.harga)} x {i.qty} {i.satuan}</Text>
                                            <Text style={{
                                                fontFamily: fonts.secondary[800],
                                                fontSize: 15,
                                                color: colors.black
                                            }}>Rp. {new Intl.NumberFormat().format(i.total)}</Text>
                                        </View>

                                    </View>
                                    <TouchableOpacity onPress={() => {
                                        Alert.alert(MYAPP, 'Apakah kamu mau hapus ini ?', [
                                            { text: 'TIDAK' },
                                            {
                                                text: 'HAPUS', onPress: () => {
                                                    setLoading(true)
                                                    axios.post(apiURL + 'bcart_hapus', {
                                                        id: i.id
                                                    }).then(r => {
                                                        console.log(r.data);
                                                        __getTransaction();
                                                    })
                                                }
                                            }
                                        ])
                                    }} style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        flex: 1,
                                        backgroundColor: colors.secondary,
                                        padding: 5,
                                    }}>
                                        <Icon type='ionicon' name='trash' color={colors.white} />
                                    </TouchableOpacity>
                                </View>
                            )
                        })}

                    </ScrollView>



                </View>



                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: colors.white

                }}>
                    <View style={{
                        flex: 1,
                        paddingLeft: 10,
                    }}>

                        <Text style={{

                            fontFamily: fonts.secondary[600],
                            fontSize: 15,
                            color: colors.black
                        }}>Estimasi Total</Text>
                        <Text style={{

                            fontFamily: fonts.secondary[800],
                            fontSize: 22,

                            color: colors.secondary
                        }}>Rp. {new Intl.NumberFormat().format(total)} <Text style={{
                            fontSize: 14,
                            color: colors.black
                        }}>/ {data.length} Jenis</Text></Text>
                    </View>
                    <View style={{
                        backgroundColor: colors.secondary,
                        flex: 1,
                    }}>
                        <TouchableOpacity onPress={sendServer} style={{
                            paddingVertical: 15,
                        }} >
                            <Text style={{
                                textAlign: 'center',
                                fontFamily: fonts.secondary[800],
                                fontSize: 22,
                                color: colors.white
                            }}>PROSES</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </>}
        </SafeAreaView >




    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        width: windowHeight,
        height: windowWidth / 2,
    },
    imageContainer: {
        flex: 1,
        marginBottom: 1, // Prevent a random Android rendering issue
        backgroundColor: 'white',
        borderRadius: 8,
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
    },
});