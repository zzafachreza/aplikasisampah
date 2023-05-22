import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Dimensions, TextInput } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, MYAPP, storeData } from '../../utils/localStorage';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { showMessage } from 'react-native-flash-message';
import Sound from 'react-native-sound';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { MyButton, MyGap, MyInput, MyPicker } from '../../components';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { FloatingAction } from "react-native-floating-action";
import 'intl';
import 'intl/locale-data/jsonp/en';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';


export default function JemputEdit({ navigation, route }) {
    const options = {
        includeBase64: true,
        quality: 1,
    };

    const [kirim, setKirim] = useState(route.params);
    const [loading, setLoading] = useState(false);

    const sendServer = () => {
        // console.log(kirim);
        setLoading(true)

        axios.post(apiURL + 'jemput_edit', kirim).then(res => {
            navigation.goBack();
            Alert.alert(MYAPP, 'Penjemputan berhasil dibatalkan !')


        })

    }



    useEffect(() => {

    }, [])



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

                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 20,
                    }}>{kirim.kode_jemput}</Text>
                    <MyInput label="Alasan Pembatalan" multiline value={kirim.alasan} onChangeText={x => {
                        setKirim({
                            ...kirim,
                            alasan: x
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
                }}>KIRIM</Text>
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