import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Dimensions, TextInput } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, MYAPP, storeData } from '../../utils/localStorage';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { showMessage } from 'react-native-flash-message';
import Sound from 'react-native-sound';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { MyButton, MyGap, MyInput } from '../../components';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { FloatingAction } from "react-native-floating-action";
import 'intl';
import 'intl/locale-data/jsonp/en';

export default function MasterProduk({ navigation }) {

    const [data, setData] = useState([]);
    const [tmp, setTmp] = useState([]);
    const [loading, setLoading] = useState(false);

    const isFocused = useIsFocused();
    useEffect(() => {
        if (isFocused) {
            getTransaction();
        }
    }, [isFocused]);


    const getTransaction = () => {
        axios.post(apiURL + 'produk').then(res => {
            setData(res.data);
            setTmp(res.data);
            console.log(res.data)
        });
    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white,

        }}>
            <View style={{
                flex: 1,
                padding: 10,
            }}>
                <View style={{
                    flexDirection: 'row',
                    backgroundColor: colors.zavalabs,
                    alignItems: 'center',
                    height: 40,
                    borderRadius: 5,
                    marginBottom: 20,
                }}>
                    <View style={{
                        flex: 1,
                    }}>
                        <TextInput onChangeText={x => {

                            if (x.length > 0) {
                                const filtered = data.filter(i => i.nama_produk.toLowerCase().indexOf(x.toLowerCase()) > -1);
                                setData(filtered)
                            } else if (x.length == 0) {

                                setData(tmp)
                            }

                        }} style={{
                            fontFamily: fonts.secondary[600],
                            fontSize: 14,
                            left: 10,
                        }} placeholder='Cari produk' />
                    </View>
                    <View style={{
                        paddingHorizontal: 10
                    }}>
                        <Icon type='ionicon' name='search' size={14} color={colors.border} />
                    </View>
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                    {data.map(i => {
                        return (
                            <TouchableOpacity onPress={() => navigation.navigate('MasterProdukDetail', i)} style={{
                                borderWidth: 1,
                                marginVertical: 5,
                                padding: 10,
                                borderRadius: 5,
                                borderColor: colors.border2,
                                flexDirection: 'row'
                            }}>
                                <View>
                                    <Image source={{
                                        uri: i.foto_produk
                                    }} style={{
                                        width: 80,
                                        height: 80,
                                        borderRadius: 5,
                                    }} />
                                </View>
                                <View style={{
                                    // flex: 1,
                                    paddingLeft: 10,
                                }}>
                                    <View style={{
                                        paddingHorizontal: 10,
                                        backgroundColor: colors.primary,
                                        borderRadius: 5,
                                    }}>
                                        <Text style={{
                                            fontFamily: fonts.secondary[600],
                                            fontSize: 14,
                                            textAlign: 'center',
                                            color: colors.white,
                                        }}>{i.nama_kategori}</Text>
                                    </View>

                                    <View>
                                        <Text style={{
                                            marginVertical: 3,
                                            fontFamily: fonts.secondary[600],
                                            fontSize: 14,
                                            color: colors.black,
                                        }}>{i.kode_produk} - {i.nama_produk}</Text>
                                        <Text style={{
                                            marginVertical: 3,
                                            fontFamily: fonts.secondary[200],
                                            fontSize: 14,
                                            color: colors.black,
                                        }}>{i.contoh}</Text>
                                        <Text style={{
                                            marginVertical: 3,
                                            fontFamily: fonts.secondary[600],
                                            fontSize: 14,
                                            color: colors.danger,
                                        }}>Rp. {new Intl.NumberFormat().format(i.harga)} / {i.satuan}</Text>
                                    </View>

                                </View>


                            </TouchableOpacity>
                        )
                    })}
                </ScrollView>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('MasterProdukAdd')} style={{
                padding: 15,
                backgroundColor: colors.primary
            }}>
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: 20,
                    color: colors.white,
                    textAlign: 'center'
                }}>TAMBAH</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})