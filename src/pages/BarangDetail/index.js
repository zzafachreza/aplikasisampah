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

export default function BarangDetail({ navigation, route }) {
    const item = route.params;


    const addCart = () => {

        getData('user').then(u => {


            if (!u) {
                Alert.alert(MYAPP, 'Harap login terlebih dahulu !');
                navigation.navigate('GetStarted')
            } else {
                const kirim = {
                    fid_user: u.id,
                    fid_barang: item.id,
                    qty: 1,
                    harga: item.harga,
                    total: item.harga,
                }

                console.log(kirim);
                axios.post(apiURL + 'cart_add', kirim).then(res => {
                    console.log(res.data);
                    showMessage({
                        type: 'success',
                        message: 'Berhasil ditambahkan ke keranjang'
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
                }}>{item.nama_barang}</Text>

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
                    uri: item.foto_barang
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
                        }}>Rp. {new Intl.NumberFormat().format(item.harga)}</Text>
                        <Text style={{
                            fontFamily: fonts.secondary[400],
                            color: colors.text,
                            fontStyle: 'italic',
                            fontSize: 15,
                        }}>Terjual {new Intl.NumberFormat().format(item.terjual)} Pcs</Text>
                    </View>
                    <View style={{
                        flex: 0.5,
                    }}>
                        <Text style={{
                            fontFamily: fonts.secondary[800],
                            color: colors.black,
                            fontSize: 15,
                        }}>RATING</Text>
                        <View style={{
                            flexDirection: 'row',
                        }}>
                            <View style={{
                                marginLeft: 0,
                            }}>
                                <Icon type='ionicon' name='star' size={15} color={colors.warning} />
                            </View>
                            <View style={{
                                marginLeft: 2,
                            }}>
                                <Icon type='ionicon' name='star' size={15} color={colors.warning} />
                            </View>
                            <View style={{
                                marginLeft: 2,
                            }}>
                                <Icon type='ionicon' name='star' size={15} color={colors.warning} />
                            </View>
                            <View style={{
                                marginLeft: 2,
                            }}>
                                <Icon type='ionicon' name='star' size={15} color={colors.warning} />
                            </View>
                            <View style={{
                                marginLeft: 2,
                            }}>
                                <Icon type='ionicon' name='star' size={15} color={colors.warning} />
                            </View>
                        </View>
                    </View>
                </View>
                {/* deskripsi */}
                <View style={{
                    padding: 10
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[800],
                        color: colors.text,
                        fontSize: 15,
                    }}>Deskripsi Produk</Text>
                    <Text style={{
                        fontFamily: fonts.secondary[400],
                        color: colors.text,
                        fontSize: 15,
                    }}>{item.keterangan}</Text>
                </View>
            </View>
            <MyButton title="TAMBAH KERANJANG" radius={0} onPress={addCart} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})