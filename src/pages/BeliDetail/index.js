import { Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { colors, fonts, windowWidth } from '../../utils';
import { MYAPP, apiURL, getData } from '../../utils/localStorage';
import axios from 'axios';
import moment from 'moment';
import { useState } from 'react';
import { showMessage } from 'react-native-flash-message';


const MyList = ({ l, v }) => {
    return (
        <View style={{
            marginVertical: 2,
        }}>
            <Text style={{
                marginVertical: 2,
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

export default function BeliDetail({ navigation, route }) {

    const item = route.params;

    const [data, setData] = useState([]);

    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getData('user').then(u => {
            setUser(u)
        });

        axios.post(apiURL + 'beli_detail', {
            kode: route.params.kode
        }).then(res => {
            setLoading(false);
            console.log(res.data);
            setData(res.data.data);
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

                    <Text style={{
                        fontFamily: fonts.secondary[800],
                        textAlign: 'center',
                        color: colors.secondary,
                        fontSize: 20,
                        marginBottom: 10,
                    }}>{item.kode}</Text>

                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 15,
                    }}>Foto Barang Pembelian</Text>

                    <Image style={{
                        width: '100%',
                        borderRadius: 10,
                        height: 200,
                    }} source={{
                        uri: item.foto_beli
                    }} />

                    <View style={{

                        justifyContent: 'space-between'
                    }}>

                        <MyList l="Tanggal Penjualan" v={moment(item.tanggal).format('dddd, DD MMM YYYY') + ' ' + item.jam} />

                        <MyList l="Bank Sampah Unit (BSU)" v={item.nama_lengkap} />


                    </View>

                    <Text style={{
                        marginVertical: 5,
                        fontFamily: fonts.secondary[600],
                        fontSize: 15,
                        borderBottomWidth: 1,
                        borderBottomColor: colors.border2,
                        paddingBottom: 5,
                    }}>Produk Sampah Terpilih</Text>

                    <ScrollView style={{
                    }}>



                        {data.map(i => {
                            return (
                                <View style={{
                                    overflow: 'hidden',
                                    flexDirection: 'row',
                                    borderRadius: 10,
                                    marginVertical: 2,

                                    borderBottomWidth: 1,
                                    borderBottomColor: colors.border2

                                }}>
                                    <View style={{
                                        padding: 5,
                                    }}>
                                        <Image source={{
                                            uri: i.foto_barang
                                        }} style={{
                                            width: 50,
                                            height: 50,
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

                                </View>
                            )
                        })}

                    </ScrollView>



                </View>
            </ScrollView>



            <View style={{
                padding: 10,

            }}>
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    color: colors.black,
                    fontSize: 15,
                }}>Estimasi Total</Text>
                <Text style={{
                    fontFamily: fonts.secondary[800],
                    color: colors.secondary,
                    fontSize: 20,
                }}>Rp. {new Intl.NumberFormat().format(item.total)} <Text style={{
                    fontSize: 14,
                    color: colors.black
                }}>/ {data.length} Jenis</Text></Text>
            </View>


        </SafeAreaView >
    )
}

const styles = StyleSheet.create({})