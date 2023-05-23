import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, fonts } from '../../utils'
import { Icon } from 'react-native-elements'
import { getData } from '../../utils/localStorage'


const MyList = ({ l, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={{
            flexDirection: 'row',
            paddingHorizontal: 10,
            paddingVertical: 10,
            marginVertical: 5,
        }}>
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'flex-start'
            }}>
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: 14,
                    borderBottomWidth: l == "BSU" ? 1 : 0,
                }}>{l}</Text>
            </View>
            <View>
                <Icon type='ionicon' name='chevron-forward' size={14} color={colors.black} />
            </View>
        </TouchableOpacity >
    )
}

export default function MenuTrx({ navigation }) {


    const [user, setUser] = useState({});

    useEffect(() => {
        getData('user').then(u => {
            setUser(u);
        })
    }, [])
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white,
            padding: 10,
        }}>

            <MyList l="Penjemputan" onPress={() => navigation.navigate('Jemput')} />

            {user.level == 'Admin' && <>
                <MyList l="Pembelian" onPress={() => navigation.navigate('Beli')} />
                <MyList l="Penjualan" onPress={() => navigation.navigate('Jual')} />
            </>}



        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})