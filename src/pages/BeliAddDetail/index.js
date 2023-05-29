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

export default function BeliAddDetail({ navigation, route }) {
    const item = route.params;
    const [jumlah, setJumlah] = useState(1)

    const addCart = () => {

        getData('user').then(u => {


            if (!u) {
                Alert.alert(MYAPP, 'Harap login terlebih dahulu !');
                navigation.navigate('GetStarted')
            } else {
                const kirim = {
                    fid_user: u.id,
                    fid_barang: item.id,
                    qty: jumlah,
                    harga: item.harga,
                    total: item.harga * jumlah,
                }

                console.log(kirim);
                axios.post(apiURL + 'bcart_add', kirim).then(res => {
                    console.log(res.data);
                    showMessage({
                        type: 'success',
                        message: 'Berhasil ditambahkan ke keranjang beli'
                    })
                })
            }

        });
    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>
            <View style={{
                flexDirection: 'row',
                paddingHorizontal: 10,
                height: 50,
                backgroundColor: colors.primary,
                alignItems: 'center'
            }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon type='ionicon' name='arrow-back-outline' color={colors.white} />
                </TouchableOpacity>
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    color: colors.white,
                    fontSize: 15,
                    flex: 1,
                    textAlign: 'center'
                }}>{item.nama_produk}</Text>

            </View>

            <View style={{
                flex: 1,
                margin: 10,
                borderWidth: 1,
                borderColor: colors.border,
                elevation: 1,
                borderRadius: 10,
                overflow: 'hidden'
            }}>
                <Image source={{
                    uri: item.foto_produk
                }} style={{
                    height: 200,
                    width: '100%'
                }} />

                <View style={{
                    flexDirection: 'row',
                    padding: 10,

                }}>
                    <View style={{
                        flex: 1,
                        paddingBottom: 10,
                        borderBottomWidth: 1,
                        marginBottom: 10,
                    }}>


                        <Text style={{
                            fontFamily: fonts.secondary[800],
                            color: colors.black,
                            fontSize: 25,
                        }}>Rp. {new Intl.NumberFormat().format(item.harga)} / {item.satuan}</Text>

                    </View>

                </View>
                {/* deskripsi */}
                <View style={{
                    padding: 10
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[800],
                        color: colors.secondary,
                        fontSize: 20,
                    }}>{item.kode_produk}</Text>
                    <Text style={{
                        fontFamily: fonts.secondary[800],
                        color: colors.text,
                        fontSize: 15,
                    }}>{item.nama_produk}</Text>
                    <Text style={{
                        fontFamily: fonts.secondary[800],
                        color: colors.text,
                        fontSize: 15,
                    }}>{item.nama_kategori}</Text>
                    <Text style={{
                        fontFamily: fonts.secondary[400],
                        color: colors.text,
                        fontSize: 15,
                    }}>{item.contoh}</Text>
                </View>
            </View>

            <View style={{
                flexDirection: 'row',
                paddingHorizontal: 10,
                justifyContent: 'space-around',
                marginVertical: 10,
            }}>
                <TouchableOpacity onPress={() => {
                    if (jumlah == 1) {
                        showMessage({
                            message: 'Minimal Pembelian 1',
                            type: 'info'
                        })
                    } else {
                        setJumlah(jumlah - 1)
                    }
                }} style={{
                    backgroundColor: colors.border,
                    width: 100,
                    height: 50,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Icon type='ionicon' name='remove' size={30} color={colors.white} />
                </TouchableOpacity>
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',

                    width: 100,
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[800],
                        fontSize: 25,
                    }}>{jumlah} {item.satuan}</Text>
                </View>
                <TouchableOpacity onPress={() => {
                    setJumlah(jumlah + 1)
                }} style={{
                    backgroundColor: colors.secondary,
                    width: 100,
                    height: 50,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Icon type='ionicon' name='add' size={30} color={colors.white} />
                </TouchableOpacity>
            </View>
            <MyButton title="TAMBAH KERANJANG BELI" radius={0} onPress={addCart} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})