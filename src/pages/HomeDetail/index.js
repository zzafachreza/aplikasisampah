import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Dimensions, TextInput } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, MYAPP, storeData } from '../../utils/localStorage';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { showMessage } from 'react-native-flash-message';
import Sound from 'react-native-sound';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { MyButton, MyCarouser, MyGap, MyHeader, MyInput } from '../../components';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { FloatingAction } from "react-native-floating-action";
import 'intl';
import 'intl/locale-data/jsonp/en';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import { color } from 'react-native-elements/dist/helpers';


const MyUnggulan = ({ img, nama, harga, terjual }) => {
    return (
        <TouchableOpacity style={{
            marginRight: 5,
            width: windowWidth / 4.3,
            borderColor: colors.border2,
            borderWidth: 1,
            overflow: 'hidden',
            borderRadius: 10,
        }}>
            <Image style={{
                width: '100%',
                height: windowWidth / 5
            }} source={{
                uri: img
            }} />
            <View>
                <Text style={{
                    fontSize: 10,
                    textAlign: 'center',
                    fontFamily: fonts.secondary[400],
                    color: colors.black
                }}>{nama}</Text>
                <Text style={{
                    fontSize: 13,
                    textAlign: 'center',
                    fontFamily: fonts.primary[600],
                    color: colors.black
                }}>Rp. {new Intl.NumberFormat().format(harga)}</Text>
                <Text style={{
                    fontSize: 9,
                    marginBottom: 5,
                    fontStyle: 'italic',
                    textAlign: 'center',
                    fontFamily: fonts.secondary[200],
                    color: colors.border
                }}>Terjual {terjual}</Text>
            </View>
        </TouchableOpacity>
    )
}


export default function HomeDetail({ navigation }) {

    const [produk, setProduk] = useState([])
    const [tmp, setTmp] = useState([]);
    const [cart, setCart] = useState(0);

    const __renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('BarangDetail', item)} style={{
                flex: 1,
                width: windowWidth / 2.2,
                margin: 5,
                borderColor: colors.border2,
                borderWidth: 1,
                overflow: 'hidden',
                borderRadius: 10,
            }}>
                <Image style={{
                    height: windowWidth / 2.5
                }} source={{
                    uri: item.foto_barang
                }} />
                <View>
                    <Text style={{
                        fontSize: 13,
                        textAlign: 'center',
                        fontFamily: fonts.secondary[400],
                        color: colors.black
                    }}>{item.nama_barang}</Text>
                    <Text style={{
                        fontSize: 15,
                        textAlign: 'center',
                        fontFamily: fonts.primary[600],
                        color: colors.black
                    }}>Rp. {new Intl.NumberFormat().format(item.harga)}</Text>
                    <Text style={{
                        fontSize: 11,
                        marginBottom: 5,
                        fontStyle: 'italic',
                        textAlign: 'center',
                        fontFamily: fonts.secondary[200],
                        color: colors.border
                    }}>Terjual {item.terjual}</Text>
                </View>
            </TouchableOpacity>
        )
    }


    const __renderItemHorizonal = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('BarangDetail', item)} style={{
                flex: 1,
                margin: 2,

                width: windowWidth / 3,
                borderColor: colors.border2,
                borderWidth: 1,
                overflow: 'hidden',
                borderRadius: 10,
            }}>
                <Image style={{
                    height: windowWidth / 3,
                    width: windowWidth / 3,
                }} source={{
                    uri: item.foto_barang
                }} />
                <View>
                    <Text style={{
                        fontSize: 13,
                        textAlign: 'center',
                        fontFamily: fonts.secondary[400],
                        color: colors.black
                    }}>{item.nama_barang}</Text>
                    <Text style={{
                        fontSize: 15,
                        textAlign: 'center',
                        fontFamily: fonts.primary[600],
                        color: colors.black
                    }}>Rp. {new Intl.NumberFormat().format(item.harga)}</Text>
                    <Text style={{
                        fontSize: 11,
                        marginBottom: 5,
                        fontStyle: 'italic',
                        textAlign: 'center',
                        fontFamily: fonts.secondary[200],
                        color: colors.border
                    }}>Terjual {item.terjual}</Text>
                </View>
            </TouchableOpacity>
        )
    }


    const [data, setData] = useState([]);
    const [user, setUser] = useState({
        id: 0,
        nama_lengkap: 'Eman'
    });
    const isFocused = useIsFocused();
    useEffect(() => {


        if (isFocused) {
            __getTransaction();
        }

    }, [isFocused]);

    const __getTransaction = () => {
        getData('user').then(res => {
            if (!res) {

            } else {
                setUser(res);
                axios.post(apiURL + 'get_cart', {
                    fid_user: res.id
                }).then(c => {
                    setCart(c.data)
                    console.log(c.data);
                })
            }
        });

        axios.post(apiURL + 'barang').then(res => {
            setProduk(res.data);
            setTmp(res.data);
        })


    }




    return (






        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.myback,
        }}>

            {/* menu utama */}
            <View style={{
                flex: 1,
                backgroundColor: colors.white
            }}>
                {/* header */}
                <View style={{
                    padding: 10,
                }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            flex: 1,
                            fontSize: 15,
                            fontFamily: fonts.secondary[600]
                        }}>Halo, <Text style={{
                            fontSize: 15,
                            fontFamily: fonts.secondary[400]
                        }}>{user.nama_lengkap}</Text></Text>
                        <TouchableOpacity onPress={() => {
                            if (user.id == 0) {
                                Alert.alert(MYAPP, 'Harap login terlebih dahulu')
                            } else {
                                navigation.navigate('Cart', user)
                            }
                        }} style={{
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
                                backgroundColor: colors.primary
                            }}>
                                <Text style={{
                                    fontFamily: fonts.secondary[600],
                                    color: colors.white,
                                    fontSize: 10,
                                }}>{cart}</Text>
                            </View>
                            <Icon type='ionicon' size={25} name='cart-outline' color={colors.primary} />
                        </TouchableOpacity>
                    </View>

                    <View style={{
                        borderRadius: 5,
                        position: 'relative',
                        backgroundColor: colors.zavalabs
                    }}>
                        <TextInput onChangeText={x => {
                            if (x.length > 0) {
                                const filtered = produk.filter(i => i.nama_barang.toLowerCase().indexOf(x.toLowerCase()) > -1);
                                setProduk(filtered)
                            } else if (x.length == 0) {

                                setProduk(tmp)
                            }
                        }} placeholder='Masukkan Kata Kunci' style={{
                            left: 10,
                            fontFamily: fonts.secondary[400],
                            fontSize: 14
                        }} />
                        <View style={{
                            position: 'absolute',
                            right: 10,
                            top: 10,
                        }}>
                            <Icon type='ionicon' name='search-outline' color={colors.foourty} />
                        </View>
                    </View>

                </View>
                <ScrollView style={{
                    padding: 10,
                }}>


                    <Text style={{
                        margin: 10,
                        fontFamily: fonts.secondary[600],
                        color: colors.foourty
                    }}>Semua Produk</Text>


                    <FlatList data={produk} renderItem={__renderItem} numColumns={2} />
                    <MyGap jarak={10} />
                </ScrollView>

            </View>


        </SafeAreaView>




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