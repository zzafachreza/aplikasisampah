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
import DatePicker from 'react-native-datepicker'


export default function LaporanBeliDetail({ navigation, route }) {

    const [data, setData] = useState({});
    const [kategori, setKategori] = useState([]);
    const [key, setKey] = useState('SEMUA');
    const [loading, setLoading] = useState(true);

    const isFocused = useIsFocused();
    useEffect(() => {
        if (isFocused) {
            getTransaction();
        }
    }, [isFocused]);


    const filterData = () => {
        setLoading(true)
        axios.post(apiURL + 'laporan_beli', {
            awal: tanggal.awal,
            akhir: tanggal.akhir
        }).then(res => {

            setData(res.data);
            setTimeout(() => {
                setLoading(false)
            }, 1000)
        });
    }

    const getTransaction = () => {
        axios.post(apiURL + 'laporan_beli').then(res => {

            setData(res.data);
            setTimeout(() => {
                setLoading(false)
            }, 1000)

            console.log(res.data.kategori)
        });
    }


    const [tanggal, setTanggal] = useState({
        awal: moment().format('YYYY-MM-DD'),
        akhir: moment().format('YYYY-MM-DD'),
    });


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
                    marginBottom: 10,
                }}>
                    <View style={{
                        flex: 1,
                        paddingRight: 5,
                    }}>
                        <DatePicker
                            style={{ width: '100%', }}
                            date={tanggal.awal}
                            mode="date"
                            placeholder="select date"
                            format="YYYY-MM-DD"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    borderColor: colors.primary,
                                    borderRadius: 5,
                                    marginLeft: 0
                                }
                                // ... You can check the source to find the other keys.
                            }}
                            onDateChange={(date) => { setTanggal({ ...tanggal, awal: date }) }}
                        />
                    </View>
                    <View style={{
                        flex: 1,
                        paddingLeft: 5,
                    }}>
                        <DatePicker
                            style={{ width: '100%' }}
                            date={tanggal.akhir}
                            mode="date"
                            placeholder="select date"
                            format="YYYY-MM-DD"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    borderColor: colors.primary,
                                    borderRadius: 5,
                                    marginLeft: 0
                                }
                                // ... You can check the source to find the other keys.
                            }}
                            onDateChange={(date) => { setTanggal({ ...tanggal, akhir: date }) }}
                        />
                    </View>
                    <View style={{
                        marginLeft: 10,
                        backgroundColor: colors.primary,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 5,
                    }}>
                        <TouchableOpacity onPress={filterData} style={{
                            flexDirection: 'row',
                            paddingHorizontal: 15,
                            alignItems: 'center'


                        }}>
                            <Icon type='ionicon' name='filter' size={15} color={colors.white} />
                            <Text style={{
                                left: 2,
                                fontFamily: fonts.secondary[600],
                                color: colors.white
                            }}>Filter</Text>
                        </TouchableOpacity>
                    </View>
                </View>


                {loading && <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <ActivityIndicator color={colors.primary} size="large" />
                </View>}


                {!loading && <ScrollView showsVerticalScrollIndicator={false}>

                    {/* Kategori */}

                    <View style={{
                        marginBottom: 10,
                        borderWidth: 1,
                        // padding: 10,
                        borderRadius: 10,
                        overflow: 'hidden',
                        borderColor: colors.border2
                    }}>
                        <Text style={{
                            backgroundColor: colors.secondary,
                            padding: 5,
                            color: colors.white,
                            fontFamily: fonts.secondary[600],
                            fontSize: 15
                        }}>Kategori Sampah</Text>

                        {data.kategori.map(i => {
                            return (
                                <TouchableOpacity style={{
                                    borderBottomWidth: 1,
                                    marginVertical: 2,
                                    padding: 10,
                                    borderRadius: 5,
                                    borderBottomColor: colors.border2,
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}>
                                    <View style={{
                                        flex: 1,
                                    }}>
                                        <Text style={{
                                            marginVertical: 3,
                                            fontFamily: fonts.secondary[600],
                                            fontSize: 12,
                                            color: colors.black,
                                        }}>{i.nama_kategori}</Text>
                                        <Text style={{
                                            fontFamily: fonts.secondary[600],
                                            fontSize: 14,
                                            color: colors.black,
                                        }}>{i.qty}</Text>






                                    </View>

                                    <View>
                                        <Text style={{

                                            borderRadius: 5,
                                            textAlign: 'center',
                                            fontFamily: fonts.secondary[600],
                                            fontSize: 16,
                                            color: colors.danger,
                                        }}>Rp. {new Intl.NumberFormat().format(i.total)}</Text>
                                    </View>

                                </TouchableOpacity>
                            )
                        })}
                    </View>

                    {/* Transaksi */}

                    <View style={{
                        marginBottom: 10,
                        borderWidth: 1,
                        // padding: 10,
                        borderRadius: 10,
                        overflow: 'hidden',
                        borderColor: colors.border2
                    }}>
                        <Text style={{
                            backgroundColor: colors.primary,
                            padding: 5,
                            color: colors.white,
                            fontFamily: fonts.secondary[600],
                            fontSize: 15
                        }}>Transaksi</Text>

                        {data.data.map(i => {
                            return (
                                <TouchableOpacity onPress={() => navigation.navigate('BeliDetail', i)} style={{
                                    borderBottomWidth: 1,
                                    marginVertical: 2,
                                    padding: 10,
                                    borderRadius: 5,
                                    borderBottomColor: colors.border2,
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}>
                                    <View style={{
                                        flex: 1,
                                    }}>
                                        <Text style={{
                                            marginVertical: 3,
                                            fontFamily: fonts.secondary[400],
                                            fontSize: 12,
                                            color: colors.black,
                                        }}>{moment(i.tanggal).format('dddd, DD MMM YYYY')} {i.jam}</Text>
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




                                    </View>

                                    <View>
                                        <Text style={{

                                            borderRadius: 5,
                                            textAlign: 'center',
                                            fontFamily: fonts.secondary[600],
                                            fontSize: 16,
                                            color: colors.danger,
                                        }}>Rp. {new Intl.NumberFormat().format(i.total)}</Text>
                                    </View>

                                </TouchableOpacity>
                            )
                        })}
                    </View>

                    <View style={{
                        padding: 10,
                    }}>
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            fontSize: 15,
                            color: colors.black,
                        }}>Pembelian</Text>
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            fontSize: 20,
                            color: colors.danger,
                        }}>Rp. {new Intl.NumberFormat().format(data.total)}</Text>
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            fontSize: 15,
                            color: colors.black,
                        }}>{data.data.length} Transaksi</Text>
                    </View>
                </ScrollView>}
            </View>

        </SafeAreaView >
    )
}

const styles = StyleSheet.create({})