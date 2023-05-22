import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Dimensions, TextInput } from 'react-native'
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



export default function Cart({ navigation }) {

    const [kirim, setKirim] = useState({
        jenis: 'DI ANTAR',
        alamat_kirim: '',
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
        axios.post(apiURL + 'jual_add', kirim).then(rs => {
            console.log(rs.data);

            Alert.alert(MYAPP, 'Transaksi Berhasil Disimpan !');
            Linking.openURL(rs.data)
            navigation.replace('Home')
        })
        // setTimeout(() => {

        //     setLoading(false);
        // }, 1000)
    }


    const __getTransaction = () => {
        setLoading(true);
        getData('user').then(res => {
            setUser(res);
            setKirim({
                ...kirim,
                fid_user: res.id
            })
            axios.post(apiURL + 'get_cart', {
                fid_user: res.id
            }).then(c => {
                setCart(c.data);

                console.log(c.data);
            })
            axios.post(apiURL + 'cart', {
                fid_user: res.id
            }).then(cc => {
                setTotal(cc.data.total);
                setData(cc.data.data);
                setKirim({
                    ...kirim,
                    fid_user: res.id,
                    total: cc.data.total
                })
                setLoading(false);
            })
        });



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
                            }}>Keranjang Belanja</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Cart', user)} style={{
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
                                            uri: i.foto_barang
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
                                        }}>{i.nama_barang}</Text>
                                        <View style={{
                                            flexDirection: 'row'
                                        }}>
                                            <Text style={{
                                                flex: 1,
                                                fontFamily: fonts.secondary[600],
                                                fontSize: 15,
                                            }}>{new Intl.NumberFormat().format(i.harga)} x {i.qty}</Text>
                                            <Text style={{
                                                fontFamily: fonts.secondary[800],
                                                fontSize: 15,
                                                color: colors.secondary
                                            }}>{new Intl.NumberFormat().format(i.total)}</Text>
                                        </View>

                                    </View>
                                    <TouchableOpacity onPress={() => {
                                        Alert.alert(MYAPP, 'Apakah kamu mau hapus ini ?', [
                                            { text: 'TIDAK' },
                                            {
                                                text: 'HAPUS', onPress: () => {
                                                    setLoading(true)
                                                    axios.post(apiURL + 'cart_hapus', {
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
                                        backgroundColor: colors.primary,
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
                    padding: 10,
                    backgroundColor: colors.white
                }}>
                    <MyPicker value={kirim.jenis} label="Jenis Pengiriman" data={[
                        { label: 'DI ANTAR', value: 'DI ANTAR' },
                        { label: 'AMBIL DITEMPAT', value: 'AMBIL DITEMPAT' },
                    ]} onValueChange={x => {
                        setKirim({
                            ...kirim,
                            jenis: x
                        })
                    }} />

                    <MyInput label="Alamat Pengiriman" multiline value={kirim.alamat_kirim} onChangeText={x => {
                        setKirim({
                            ...kirim,
                            alamat_kirim: x
                        })
                    }} />

                </View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: colors.white

                }}>
                    <Text style={{
                        flex: 1,
                        fontFamily: fonts.secondary[800],
                        fontSize: 22,
                        textAlign: 'center',
                        color: colors.secondary
                    }}>Rp. {new Intl.NumberFormat().format(total)}</Text>
                    <View style={{
                        backgroundColor: colors.primary,
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
                            }}>CHECKOUT</Text>
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