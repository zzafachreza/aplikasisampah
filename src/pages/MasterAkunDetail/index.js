import { Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
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
                    fontFamily: fonts.secondary[600],
                    fontSize: 15
                }}>{v}</Text>
            </View>
        </View>
    )
}

export default function MasterAkunDetail({ navigation, route }) {

    const item = route.params;

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>
            <View style={{
                flex: 1,
                padding: 10,
            }}>
                <MyList l="Level" v={item.level} />
                <MyList l="Nama" v={item.nama_lengkap} />
                <MyList l="No. Handphone" v={item.telepon} />
                <MyList l="Alamat" v={item.alamat} />
            </View>
            <View style={{
                flexDirection: 'row'
            }}>
                <TouchableOpacity onPress={() => navigation.replace('MasterAkunEdit', item)} style={{
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
                    Alert.alert(MYAPP, 'Apakah Kamu yakin akan hapus ' + item.nama_lengkap + ' ?', [
                        { text: 'TIDAK' },
                        {
                            text: 'HAPUS', onPress: () => {

                                axios.post(apiURL + 'akun_hapus', {
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