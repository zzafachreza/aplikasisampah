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

export default function Jemput({ navigation }) {

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
        getData('user').then(uu => {
            axios.post(apiURL + 'jemput', {
                fid_user: uu.id,
                level: uu.level
            }).then(res => {
                setData(res.data);
                setTmp(res.data);
                console.log(res.data)
            });
        })
    }

    const getFilter = (x) => {
        if (x !== 'SEMUA') {
            const filtered = tmp.filter(i => i.status_jemput.toLowerCase().indexOf(x.toLowerCase()) > -1);
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
                            <View style={{
                                borderWidth: 1,
                                marginVertical: 5,
                                padding: 10,
                                borderRadius: 5,
                                borderColor: colors.border2,
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <View>
                                    <Image source={{
                                        uri: i.foto_jemput
                                    }} style={{
                                        width: 80,
                                        height: 80,
                                        borderRadius: 5,
                                    }} />
                                </View>
                                <View style={{
                                    flex: 1,
                                    paddingLeft: 10,
                                }}>
                                    <View style={{
                                        // paddingHorizontal: 10,
                                        backgroundColor: colors.white,
                                        borderRadius: 5,
                                    }}>
                                        <Text style={{
                                            fontFamily: fonts.secondary[800],
                                            fontSize: 14,

                                            color: colors.secondary,
                                        }}>STATUS : {i.status_jemput}</Text>
                                    </View>
                                    <View style={{
                                        // paddingHorizontal: 10,
                                        backgroundColor: colors.white,
                                        borderRadius: 5,
                                    }}>
                                        <Text style={{
                                            fontFamily: fonts.secondary[600],
                                            fontSize: 14,

                                            color: colors.black,
                                        }}>{i.kode_jemput}</Text>
                                    </View>
                                    <View style={{
                                        // paddingHorizontal: 10,
                                        backgroundColor: colors.white,
                                        borderRadius: 5,
                                    }}>
                                        <Text style={{
                                            fontFamily: fonts.secondary[800],
                                            fontSize: 14,

                                            color: colors.tertiary,
                                        }}>{i.nama_lengkap}</Text>
                                    </View>

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
                                                fontSize: 14,
                                                color: colors.black,
                                            }}>Penjemputan : </Text>
                                            <Text style={{
                                                backgroundColor: colors.primary,
                                                borderRadius: 5,
                                                width: 60,
                                                textAlign: 'center',
                                                fontFamily: fonts.secondary[600],
                                                fontSize: 14,
                                                color: colors.white,
                                            }}>{i.waktu}</Text>
                                        </View>

                                    </View>

                                </View>

                                <TouchableOpacity onPress={() => navigation.navigate('JemputDetail', i)}>
                                    <Icon type='ionicon' name='search' />
                                </TouchableOpacity>

                                <TouchableOpacity style={{
                                    marginLeft: 20,
                                }} onPress={() => Alert.alert(MYAPP, `Apakah kamu yakin akan hapus transaksi ${i.kode_jemput} ini ?`, [
                                    { text: 'TIDAK' },
                                    {
                                        text: 'HAPUS',
                                        onPress: () => {
                                            axios.post(apiURL + 'jemput_delete', {
                                                kode_jemput: i.kode_jemput,
                                                foto_jemput: i.foto_jemput
                                            }).then(res => {
                                                console.log(res.data)
                                                showMessage({
                                                    message: 'Berhasil di hapus !',
                                                    type: 'success'
                                                })
                                                getTransaction();
                                            })
                                        }
                                    }
                                ])} >
                                    <Icon type='ionicon' name='trash' color={colors.danger} />
                                </TouchableOpacity>


                            </View>
                        )
                    })}
                </ScrollView>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('JemputAdd')} style={{
                padding: 15,
                backgroundColor: colors.primary
            }}>
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: 20,
                    color: colors.white,
                    textAlign: 'center'
                }}>TAMBAH TRANSAKSI</Text>
            </TouchableOpacity>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({})