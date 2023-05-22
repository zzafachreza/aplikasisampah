import { Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors, fonts } from '../../utils';
import { MYAPP, apiURL } from '../../utils/localStorage';
import axios from 'axios';


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

export default function MasterProdukDetail({ navigation, route }) {

    const item = route.params;

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
                        }}>Foto Produk</Text>
                        <View style={{
                            borderWidth: 1,
                            borderColor: colors.primary,
                            padding: 10,
                            borderRadius: 5,
                        }}>
                            <Image source={{
                                uri: item.foto_produk
                            }} style={{
                                width: '100%',
                                height: 150,
                                resizeMode: 'contain'
                            }} />
                        </View>
                    </View>
                    <MyList l="Kode Produk" v={item.kode_produk} />
                    <MyList l="Nama Produk" v={item.nama_produk} />
                    <MyList l="Kategori" v={item.nama_kategori} />
                    <MyList l="Harga" v={item.harga} />
                    <MyList l="Satuan" v={item.satuan} />
                    <MyList l="Contoh Produk" v={item.contoh} />




                </View>
            </ScrollView>
            <View style={{
                flexDirection: 'row'
            }}>
                <TouchableOpacity onPress={() => navigation.replace('MasterProdukEdit', item)} style={{
                    flex: 1,
                    backgroundColor: colors.primary,
                    padding: 10,
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 20,
                        textAlign: 'center',
                        color: colors.white
                    }}>EDIT</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    Alert.alert(MYAPP, 'Apakah Kamu yakin akan hapus ' + item.nama_produk + ' ?', [
                        { text: 'TIDAK' },
                        {
                            text: 'HAPUS', onPress: () => {

                                axios.post(apiURL + 'produk_hapus', {
                                    id: item.id
                                }).then(res => {
                                    Alert.alert(MYAPP, res.data);
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
                    }}>HAPUS</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})