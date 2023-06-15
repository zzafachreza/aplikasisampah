import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Dimensions, TextInput, TouchableNativeFeedback } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, MYAPP, storeData } from '../../utils/localStorage';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { showMessage } from 'react-native-flash-message';
import Sound from 'react-native-sound';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { MyButton, MyCarouser, MyGap, MyHeader, MyInput } from '../../components';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { FloatingAction } from "react-native-floating-action";
import 'intl';
import 'intl/locale-data/jsonp/en';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import { color } from 'react-native-elements/dist/helpers';
import MyBottom from '../../components/MyBottom';





export default function HomeAdmin({ navigation }) {


  const [data, setData] = useState([]);
  const [user, setUser] = useState({});
  const [info, setInfo] = useState({});
  const isFocused = useIsFocused();
  useEffect(() => {


    if (isFocused) {
      __getTransaction();
    }

  }, [isFocused]);

  const __getTransaction = () => {
    getData('user').then(res => {
      setUser(res);
      axios.post(apiURL + 'get_informasi', {
        fid_user: res.id,
        level: res.level
      }).then(info => {
        console.log(info.data);
        setInfo(info.data);
      })
    });




  }




  return (






    <SafeAreaView style={{
      flex: 1,
      backgroundColor: colors.myback,
    }}>

      {/* menu utama */}
      <View style={{
        flex: 1,
        backgroundColor: colors.white
      }}>
        {/* header */}
        <View style={{
          padding: 10,
        }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center'
          }}>
            <Text style={{
              flex: 1,
              fontSize: 15,
              fontFamily: fonts.secondary[600]
            }}>Halo, <Text style={{
              fontSize: 15,
              fontFamily: fonts.secondary[400]
            }}>{user.nama_lengkap}</Text></Text>

          </View>

        </View>


        <TouchableOpacity>
          <View style={{
            borderRadius: 10,
            marginHorizontal: 10,
            marginVertical: 10,
            padding: 10,
            backgroundColor: '#1AB4E4',
            flexDirection: 'row'
          }}>
            <View style={{
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Image source={require('../../assets/sdb.png')} style={{
                width: 40,
                height: 40,
                resizeMode: 'contain'
              }} />
            </View>
            <View style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'flex-end'
            }}>
              <Text style={{
                fontFamily: fonts.secondary[600],
                fontSize: 20,
                color: colors.white
              }}>Penjemputan</Text>
              <Text style={{
                fontFamily: fonts.secondary[800],
                fontSize: 40,
                color: colors.white
              }}>{info.jemput}</Text>
            </View>
          </View>
        </TouchableOpacity>

        {user.level == 'Admin' && <>

          <TouchableOpacity>
            <View style={{
              borderRadius: 10,
              marginHorizontal: 10,
              marginVertical: 10,
              padding: 10,
              backgroundColor: '#9747FF',
              flexDirection: 'row'
            }}>
              <View style={{
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Image source={require('../../assets/sdeks.png')} style={{
                  width: 40,
                  height: 40,
                  resizeMode: 'contain'
                }} />
              </View>
              <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'flex-end'
              }}>
                <Text style={{
                  fontFamily: fonts.secondary[600],
                  fontSize: 20,
                  color: colors.white
                }}>Pembelian</Text>
                <Text style={{
                  fontFamily: fonts.secondary[800],
                  fontSize: 40,
                  color: colors.white
                }}>{info.timbang}</Text>
              </View>
            </View>
          </TouchableOpacity>


          <View style={{
            flexDirection: 'row',
            marginHorizontal: 10,
          }}>
            <TouchableNativeFeedback>
              <View style={{
                flex: 1,
                marginRight: 10,
                backgroundColor: '#1AB4E4',
                padding: 10,
                alignItems: 'flex-end',
                justifyContent: 'center',
                borderRadius: 10,
              }}>
                <Text style={{
                  fontFamily: fonts.secondary[600],
                  fontSize: 20,
                  color: colors.white
                }}>Produk Daur Ulang</Text>
                <Text style={{
                  fontFamily: fonts.secondary[800],
                  fontSize: 40,
                  color: colors.white
                }}>{info.barang}</Text>
              </View>
            </TouchableNativeFeedback>

            <TouchableNativeFeedback>
              <View style={{
                flex: 1,
                marginLeft: 10,
                backgroundColor: '#CC4B42',
                padding: 10,
                alignItems: 'flex-end',
                justifyContent: 'center',
                borderRadius: 10,
              }}>
                <Text style={{
                  fontFamily: fonts.secondary[600],
                  fontSize: 20,
                  color: colors.white
                }}>BSU</Text>
                <Text style={{
                  fontFamily: fonts.secondary[800],
                  fontSize: 40,
                  color: colors.white
                }}>{info.bsu}</Text>
              </View>
            </TouchableNativeFeedback>
          </View>

          <View style={{
            marginTop: 10,
            flexDirection: 'row',
            marginHorizontal: 10,
          }}>
            <TouchableNativeFeedback>
              <View style={{
                flex: 1,
                marginRight: 10,
                backgroundColor: '#E47B1A',
                padding: 10,
                alignItems: 'flex-end',
                justifyContent: 'center',
                borderRadius: 10,
              }}>
                <Text style={{
                  fontFamily: fonts.secondary[600],
                  fontSize: 20,
                  color: colors.white,
                  textAlign: 'right',
                }}>Produk Bank Sampah</Text>
                <Text style={{
                  fontFamily: fonts.secondary[800],
                  fontSize: 40,
                  color: colors.white
                }}>{info.produk}</Text>
              </View>
            </TouchableNativeFeedback>

            <TouchableNativeFeedback>
              <View style={{
                flex: 1,
                marginLeft: 10,
                backgroundColor: '#54C05F',
                padding: 10,
                alignItems: 'flex-end',
                justifyContent: 'center',
                borderRadius: 10,
              }}>
                <Text style={{
                  fontFamily: fonts.secondary[600],
                  fontSize: 20,
                  color: colors.white,
                  textAlign: 'right',
                }}>Kategori Bank
                  Sampah</Text>
                <Text style={{
                  fontFamily: fonts.secondary[800],
                  fontSize: 40,
                  color: colors.white
                }}>{info.kategori}</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </>}


      </View>


      {/* bottom navigation */}

      <MyBottom />

    </SafeAreaView>




  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    width: windowHeight,
    height: windowWidth / 2,
  },
  imageContainer: {
    flex: 1,
    marginBottom: 1, // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
});