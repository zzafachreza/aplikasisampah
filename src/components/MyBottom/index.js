import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { colors, fonts, windowWidth } from '../../utils';
import { useNavigation } from '@react-navigation/native';
import { getData } from '../../utils/localStorage';


export default function MyBottom({ menu }) {

    const [user, setUser] = useState({});

    useEffect(() => {
        getData('user').then(u => {
            setUser(u);
        })
    }, [])

    const navigation = useNavigation();
    return (

        <View style={{
            padding: 10,
            backgroundColor: '#898F8A4D',
            height: 80,
            justifyContent: 'space-around',
            flexDirection: 'row'
        }}>
            <TouchableOpacity style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Image source={require('../../assets/shome.png')} style={{
                    width: 30,
                    height: 30,
                    resizeMode: 'contain'
                }} />
                <Text style={{
                    fontFamily: fonts.secondary[400],
                    color: colors.foourty,
                    fontSize: 12,
                }}>Beranda</Text>
            </TouchableOpacity>


            {user.level == 'Admin' && <TouchableOpacity onPress={() => navigation.navigate('MasterMenu')} style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Image source={require('../../assets/scart.png')} style={{
                    width: 30,
                    height: 30,
                    resizeMode: 'contain'
                }} />
                <Text style={{
                    fontFamily: fonts.secondary[400],
                    color: colors.foourty,
                    fontSize: 12,
                }}>Master</Text>
            </TouchableOpacity>}

            <TouchableOpacity onPress={() => navigation.navigate('MenuTrx')} style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Image source={require('../../assets/strx.png')} style={{
                    width: 30,
                    height: 30,
                    resizeMode: 'contain'
                }} />
                <Text style={{
                    fontFamily: fonts.secondary[400],
                    color: colors.foourty,
                    fontSize: 12,
                }}>Transaksi</Text>
            </TouchableOpacity>

            {user.level == 'Admin' && <TouchableOpacity onPress={() => navigation.navigate('MenuLaporan')} style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Image source={require('../../assets/slap.png')} style={{
                    width: 30,
                    height: 30,
                    resizeMode: 'contain'
                }} />
                <Text style={{
                    fontFamily: fonts.secondary[400],
                    color: colors.foourty,
                    fontSize: 12,
                }}>Laporan</Text>
            </TouchableOpacity>}



            <TouchableOpacity onPress={() => navigation.navigate('AAAtur')} style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Image source={require('../../assets/sakun.png')} style={{
                    width: 30,
                    height: 30,
                    resizeMode: 'contain'
                }} />
                <Text style={{
                    fontFamily: fonts.secondary[400],
                    color: colors.foourty,
                    fontSize: 12,
                }}>Akun</Text>
            </TouchableOpacity>
        </View>

    );
}

const styles = StyleSheet.create({});
