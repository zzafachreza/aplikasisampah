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


export default function MasterKategoriEdit({ navigation, route }) {
    const [kirim, setKirim] = useState(route.params);
    const [loading, setLoading] = useState(false);

    const sendServer = () => {
        console.log(kirim);
        setLoading(true)

        axios.post(apiURL + 'kategori_edit', kirim).then(res => {

            Alert.alert(MYAPP, res.data)

            setTimeout(() => {
                setLoading(false);
                navigation.goBack();
            }, 1000)
        })

    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>
            <View style={{
                flex: 1,
                padding: 10,
            }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <MyInput label="Kategori" value={kirim.nama_kategori} onChangeText={x => {
                        setKirim({
                            ...kirim,
                            nama_kategori: x
                        })
                    }} />
                </ScrollView>
            </View>
            {!loading && <TouchableOpacity onPress={sendServer} style={{
                padding: 15,
                backgroundColor: colors.secondary
            }}>
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: 20,
                    color: colors.white,
                    textAlign: 'center'
                }}>SIMPAN EDIT</Text>
            </TouchableOpacity>}

            {loading && <View style={{
                padding: 10,
            }}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>}
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({})