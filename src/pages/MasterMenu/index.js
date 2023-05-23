import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors, fonts } from '../../utils'
import { Icon } from 'react-native-elements'


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

export default function MasterMenu({ navigation }) {
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white,
            padding: 10,
        }}>

            <MyList l="Produk Daur Ulang" onPress={() => navigation.navigate('MasterBarang')} />
            <MyList l="BSU" onPress={() => navigation.navigate('MasterBSU')} />
            <MyList l="Produk Bank Sampah" onPress={() => navigation.navigate('MasterProduk')} />
            <MyList l="Kategori Bank Sampah" onPress={() => navigation.navigate('MasterKategori')} />
            <MyList l="Akun" onPress={() => navigation.navigate('MasterAkun')} />


        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})