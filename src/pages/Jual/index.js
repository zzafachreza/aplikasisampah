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
import moment from 'moment';

export default function Jual({ navigation }) {

    const [data, setData] = useState([]);
    const [tmp, setTmp] = useState([]);
    const [key, setKey] = useState('SEMUA');
    const [loading, setLoading] = useState(false);

    const isFocused = useIsFocused();
    useEffect(() => {
        if (isFocused) {
            getTransaction();
        }
    }, [isFocused]);


    const getTransaction = () => {
        axios.post(apiURL + 'jual').then(res => {
            setData(res.data);
            setTmp(res.data);
            console.log(res.data)
        });
    }

    const getFilter = (x) => {
        if (x !== 'SEMUA') {
            const filtered = tmp.filter(i => i.nama_lengkap.toLowerCase().indexOf(x.toLowerCase()) > -1);
            setData(filtered)
        } else if (x === 'SEMUA') {

            setData(tmp)
        }
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
                                const filtered = data.filter(i => i.kode_jemput.toLowerCase().indexOf(x.toLowerCase()) > -1);
                                setData(filtered)
                            } else if (x.length == 0) {

                                setData(tmp)
                            }

                        }} style={{
                            fontFamily: fonts.secondary[600],
                            fontSize: 14,
                            left: 10,
                        }} placeholder='Cari kode transaksi' />
                    </View>
                    <View style={{
                        paddingHorizontal: 10
                    }}>
                        <Icon type='ionicon' name='search' size={14} color={colors.border} />
                    </View>
                </View>


                <View style={{
                    flexDirection: 'row',
                    marginBottom: 10,
                    justifyContent: 'space-around'
                }}>
                    <TouchableOpacity onPress={() => {
                        setKey('SEMUA');
                        getFilter('SEMUA');
                    }} style={{
                        width: windowWidth / 4.5,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderWidth: 1, padding: 5, borderRadius: 5, borderColor: colors.primary,
                        backgroundColor: key == 'SEMUA' ? colors.primary : colors.white, marginHorizontal: 5,
                    }}>
                        <Text style={{ color: key == 'SEMUA' ? colors.white : colors.black }}>SEMUA</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        setKey('PENDING');
                        getFilter('PENDING');
                    }} style={{
                        width: windowWidth / 4.5,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderWidth: 1, padding: 5, borderRadius: 5, borderColor: colors.primary,
                        backgroundColor: key == 'PENDING' ? colors.primary : colors.white, marginHorizontal: 5,
                    }}>
                        <Text style={{ color: key == 'PENDING' ? colors.white : colors.black }}>PENDING</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        setKey('PROSES');
                        getFilter('PROSES');
                    }} style={{
                        width: windowWidth / 4.5,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderWidth: 1, padding: 5, borderRadius: 5, borderColor: colors.primary,
                        backgroundColor: key == 'PROSES' ? colors.primary : colors.white,
                        marginHorizontal: 5,
                    }}>
                        <Text style={{ color: key == 'PROSES' ? colors.white : colors.black }}>PROSES</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        setKey('SELESAI');
                        getFilter('SELESAI');
                    }} style={{
                        width: windowWidth / 4.5,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderWidth: 1, padding: 5, borderRadius: 5, borderColor: colors.primary,
                        backgroundColor: key == 'SELESAI' ? colors.primary : colors.white, marginHorizontal: 5,
                    }}>
                        <Text style={{ color: key == 'SELESAI' ? colors.white : colors.black }}>SELESAI</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                    {data.map(i => {
                        return (
                            <TouchableOpacity onPress={() => navigation.navigate('JualDetail', i)} style={{
                                borderWidth: 1,
                                marginVertical: 5,
                                padding: 10,
                                borderRadius: 5,
                                borderColor: colors.border2,
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <View style={{
                                    flex: 1,
                                }}>
                                    <Text style={{
                                        fontFamily: fonts.secondary[400],
                                        fontSize: 14,

                                        color: colors.black,
                                    }}>{i.kode}</Text>

                                    <Text style={{
                                        fontFamily: fonts.secondary[800],
                                        fontSize: 14,

                                        color: colors.black,
                                    }}>{i.nama_lengkap}</Text>


                                    <View>
                                        <Text style={{
                                            marginVertical: 3,
                                            fontFamily: fonts.secondary[600],
                                            fontSize: 14,
                                            color: colors.black,
                                        }}>{moment(i.tanggal).format('dddd, DD MMM YYYY')}</Text>

                                        <View style={{
                                            flexDirection: 'row'
                                        }}>
                                            <Text style={{

                                                fontFamily: fonts.secondary[600],
                                                fontSize: 16,
                                                color: colors.black,
                                            }}>Total : </Text>
                                            <Text style={{

                                                borderRadius: 5,
                                                textAlign: 'center',
                                                fontFamily: fonts.secondary[600],
                                                fontSize: 16,
                                                color: colors.danger,
                                            }}>Rp. {new Intl.NumberFormat().format(i.total)}</Text>
                                        </View>

                                    </View>

                                </View>

                                <View>
                                    <Icon type='ionicon' name='chevron-forward' />
                                </View>

                            </TouchableOpacity>
                        )
                    })}
                </ScrollView>
            </View>

        </SafeAreaView >
    )
}

const styles = StyleSheet.create({})