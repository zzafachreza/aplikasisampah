import { Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { colors, fonts } from '../../utils';
import { MYAPP, apiURL, getData } from '../../utils/localStorage';
import axios from 'axios';
import moment from 'moment';
import { useState } from 'react';
import { showMessage } from 'react-native-flash-message';


const MyList = ({ l, v }) => {
    return (
        <View style={{
            marginVertical: 5,
        }}>
            <Text style={{
                marginVertical: 5,
                fontFamily: fonts.secondary[600],
                fontSize: 15
            }}>{l}</Text>
            <View style={{
                borderWidth: 1,
                borderColor: colors.primary,
                padding: 10,
                borderRadius: 5,
            }}>
                <Text style={{
                    fontFamily: fonts.secondary[400],
                    fontSize: 15
                }}>{v}</Text>
            </View>
        </View>
    )
}

export default function JemputDetail({ navigation, route }) {

    const item = route.params;

    const [user, setUser] = useState({});

    useEffect(() => {
        getData('user').then(u => {
            setUser(u)
        })
    }, [])

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{
                    flex: 1,
                    padding: 10,
                }}>
                    <View style={{
                        marginVertical: 5,
                    }}>
                        <Text style={{
                            marginVertical: 5,
                            fontFamily: fonts.secondary[600],
                            fontSize: 15
                        }}>Foto Penjemputan</Text>
                        <View style={{
                            borderWidth: 1,
                            borderColor: colors.primary,
                            padding: 10,
                            borderRadius: 5,
                        }}>
                            <Image source={{
                                uri: item.foto_jemput
                            }} style={{
                                width: '100%',
                                height: 150,
                                resizeMode: 'contain'
                            }} />
                        </View>
                    </View>

                    <MyList l="Tanggal" v={moment(item.tanggal).format('dddd, DD MMM YYYY')} />
                    <MyList l="Waktu" v={item.waktu} />
                    <MyList l="Armada" v={item.armada} />
                    <MyList l="Alamat Penjemputan" v={item.alamat_jemput} />
                    <MyList l="No. Handphone yang bisa dihubungi" v={item.telepon_jemput} />





                </View>
            </ScrollView>


            {item.status_jemput == 'PROSES' && <Text style={{
                fontFamily: fonts.secondary[600],
                fontSize: 15,
                fontStyle: 'italic',
                textAlign: 'center',
                marginBottom: 10,
            }}>Tekan tombol “sampai di bsp” jika sampah dari BSU Telah sampai di BSP</Text>
            }
            <View style={{
                height: 50,
            }}>

                {user.level == 'BSU' && item.status_jemput !== 'SELESAI' && item.status_jemput !== 'BATAL' && <TouchableOpacity onPress={() => {
                    Alert.alert(MYAPP, 'Apakah Kamu yakin akan batalkan ini  ' + item.kode_jemput + ' ?', [
                        { text: 'TIDAK' },
                        {
                            text: 'INPUT ALASAN', onPress: () => {

                                navigation.navigate('JemputEdit', item);

                            }
                        }
                    ])
                }} style={{
                    flex: 1,
                    backgroundColor: colors.secondary,
                    padding: 10,
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 20,
                        textAlign: 'center',
                        color: colors.white
                    }}>BATALKAN</Text>
                </TouchableOpacity>}

                {user.level == 'Admin' && item.status_jemput == 'PENDING' && <TouchableOpacity onPress={() => {
                    Alert.alert(MYAPP, 'Apakah Kamu yakin akan proses ini  ' + item.kode_jemput + ' ?', [
                        { text: 'TIDAK' },
                        {
                            text: 'PROSES', onPress: () => {

                                axios.post(apiURL + 'jemput_update', {
                                    id: item.id,
                                    status_jemput: 'PROSES'
                                }).then(res => {
                                    showMessage({
                                        message: 'Penjemputan Berhasil diproses !',
                                        type: 'success'
                                    });
                                    navigation.goBack();
                                })

                            }
                        }
                    ])
                }} style={{
                    flex: 1,
                    backgroundColor: colors.secondary,
                    padding: 10,
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 20,
                        textAlign: 'center',
                        color: colors.white
                    }}>PROSES</Text>
                </TouchableOpacity>}


                {user.level == 'Admin' && item.status_jemput == 'PROSES' &&



                    <TouchableOpacity onPress={() => {
                        Alert.alert(MYAPP, 'Apakah Kamu yakin akan proses ini  ' + item.kode_jemput + ' ?', [
                            { text: 'TIDAK' },
                            {
                                text: 'SELESAI', onPress: () => {

                                    axios.post(apiURL + 'jemput_update', {
                                        id: item.id,
                                        status_jemput: 'SELESAI'
                                    }).then(res => {
                                        showMessage({
                                            message: 'Penjemputan Berhasil diproses !',
                                            type: 'success'
                                        });
                                        navigation.goBack();
                                    })

                                }
                            }
                        ])
                    }} style={{
                        flex: 1,
                        backgroundColor: colors.tertiary,
                        padding: 10,
                    }}>
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            fontSize: 20,
                            textAlign: 'center',
                            color: colors.white
                        }}>SAMPAI DI BSP</Text>
                    </TouchableOpacity>

                }


            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})