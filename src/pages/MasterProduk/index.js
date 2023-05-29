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
                    {data.map(item => {
                        return (
                            <TouchableOpacity onPress={() => navigation.navigate('MasterProdukDetail', item)} style={{
                                flex: 1,
                                margin: 5,
                                borderColor: colors.border2,
                                borderWidth: 1,
                                overflow: 'hidden',
                                borderRadius: 10,
                                flexDirection: 'row'
                            }}>
                                <View style={{
                                    // flex: 1,
                                    padding: 10,
                                }}>
                                    <Image style={{
                                        width: 80,
                                        height: 80,
                                        borderRadius: 10,
                                    }} source={{
                                        uri: item.foto_produk
                                    }} />
                                </View>
                                <View style={{
                                    flex: 1,
                                    justifyContent: 'center'
                                }}>
                                    <Text style={{
                                        fontSize: 12,
                                        fontFamily: fonts.secondary[600],
                                        color: colors.white,
                                        backgroundColor: colors.primary,
                                        width: 100,
                                        borderRadius: 5,
                                        textAlign: 'center'
                                    }}>{item.nama_kategori}</Text>
                                    <Text style={{
                                        fontSize: 13,
                                        fontFamily: fonts.secondary[600],
                                        color: colors.black
                                    }}>{item.kode_produk} - {item.nama_produk}</Text>
                                    <Text style={{
                                        fontSize: 12,
                                        marginBottom: 5,
                                        fontStyle: 'italic',
                                        fontFamily: fonts.secondary[200],
                                        color: colors.border
                                    }}>{item.contoh}</Text>
                                    <Text style={{
                                        fontSize: 15,
                                        fontFamily: fonts.primary[800],
                                        color: colors.secondary
                                    }}>Rp. {new Intl.NumberFormat().format(item.harga)} <Text style={{
                                        fontFamily: fonts.secondary[400],
                                        color: colors.border

                                    }}>/ {item.satuan}</Text></Text>

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