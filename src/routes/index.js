import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  Splash,
  Home,
  Login,
  Register,
  SCek,
  STentang,
  SHasil,
  SDaftar,
  SAdd,
  GetStarted,
  Account,
  Riwayat,
  AccountEdit,
  Pengguna,
  PenggunaAdd,
  PenggunaEdit,
  SliderAdd,
  Slider,
  AktifitasAdd,
  Aktifitas,
  AAAtur,
  STentangApp,
  LoginAdmin,
  HomeAdmin,
  MasterMenu,
  MasterDaurulang,
  MasterBSU,
  MasterKategori,
  MasterProduk,
  MasterKategoriDetail,
  MasterKategoriEdit,
  MasterKategoriAdd,
  MasterProdukDetail,
  MasterProdukAdd,
  MasterProdukEdit,
  MasterBSUDetail,
  MasterBSUAdd,
  MasterBSUEdit,
  MasterBarang,
  MasterBarangDetail,
  MasterBarangEdit,
  MasterBarangAdd,
  Barang,
  BarangDetail,
  Cart,
  MenuTrx,
  MenuLaporan,
  Jemput,
  JemputDetail,
  JemputAdd,
  JemputEdit,
  Jual,
  JualDetail,
  HomeDetail,
  Beli,
  BeliAdd,
  BeliCart,
  BeliDetail,
  BeliAddDetail,
  LaporanBeli,
  LaporanJual,
  MasterAkun,
  MasterAkunDetail,
  MasterAkunAdd,
  MasterAkunEdit,
  LaporanBeliDetail
} from '../pages';
import { colors } from '../utils';
import { Icon } from 'react-native-elements';

const Stack = createStackNavigator();

export default function Router() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{
          headerShown: false,
        }}
      />





      <Stack.Screen
        name="AAAtur"
        component={AAAtur}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="MasterMenu"
        component={MasterMenu}
        options={{
          headerShown: true,
          headerTitle: 'Master',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />

      <Stack.Screen
        name="MasterDaurulang"
        component={MasterDaurulang}
        options={{
          headerShown: true,
          headerTitle: 'Produk Daur Ulang',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />







      {/* CRUD KATEGORI */}
      <Stack.Screen
        name="MasterKategori"
        component={MasterKategori}
        options={{
          headerShown: true,
          headerTitle: 'Kategori Bank Sampah',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />

      <Stack.Screen
        name="MasterKategoriDetail"
        component={MasterKategoriDetail}
        options={{
          headerShown: true,
          headerTitle: 'Detail Kategori',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />

      <Stack.Screen
        name="MasterKategoriEdit"
        component={MasterKategoriEdit}
        options={{
          headerShown: true,
          headerTitle: 'Edit Kategori',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />

      <Stack.Screen
        name="MasterKategoriAdd"
        component={MasterKategoriAdd}
        options={{
          headerShown: true,
          headerTitle: 'Tambah Kategori',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />

      {/* CRUD PRODUK */}
      <Stack.Screen
        name="MasterProduk"
        component={MasterProduk}
        options={{
          headerShown: true,
          headerTitle: 'Produk Bank Sampah',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />

      <Stack.Screen
        name="MasterProdukDetail"
        component={MasterProdukDetail}
        options={{
          headerShown: true,
          headerTitle: 'Detail Produk Bank Sampah',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />

      <Stack.Screen
        name="MasterProdukAdd"
        component={MasterProdukAdd}
        options={{
          headerShown: true,
          headerTitle: 'Tambah Produk Bank Sampah',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />

      <Stack.Screen
        name="MasterProdukEdit"
        component={MasterProdukEdit}
        options={{
          headerShown: true,
          headerTitle: 'Edit Produk Bank Sampah',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />


      {/* CRUD BSU */}
      <Stack.Screen
        name="MasterBSU"
        component={MasterBSU}
        options={{
          headerShown: true,
          headerTitle: 'BSU',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />

      <Stack.Screen
        name="MasterBSUDetail"
        component={MasterBSUDetail}
        options={{
          headerShown: true,
          headerTitle: 'Detail BSU',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />

      <Stack.Screen
        name="MasterBSUAdd"
        component={MasterBSUAdd}
        options={{
          headerShown: true,
          headerTitle: 'Tambah BSU',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />

      <Stack.Screen
        name="MasterBSUEdit"
        component={MasterBSUEdit}
        options={{
          headerShown: true,
          headerTitle: 'Edit BSU',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />

      {/* CRUD AKUN */}
      <Stack.Screen
        name="MasterAkun"
        component={MasterAkun}
        options={{
          headerShown: true,
          headerTitle: 'Akun',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />

      <Stack.Screen
        name="MasterAkunDetail"
        component={MasterAkunDetail}
        options={{
          headerShown: true,
          headerTitle: 'Detail Akun',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />

      <Stack.Screen
        name="MasterAkunAdd"
        component={MasterAkunAdd}
        options={{
          headerShown: true,
          headerTitle: 'Tambah Akun',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />

      <Stack.Screen
        name="MasterAkunEdit"
        component={MasterAkunEdit}
        options={{
          headerShown: true,
          headerTitle: 'Edit Akun',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />

      {/* CRUD BARANG */}
      <Stack.Screen
        name="MasterBarang"
        component={MasterBarang}
        options={{
          headerShown: true,
          headerTitle: 'Produk Daur Ulang',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />

      <Stack.Screen
        name="MasterBarangDetail"
        component={MasterBarangDetail}
        options={{
          headerShown: true,
          headerTitle: 'Detail Produk Daur Ulang',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />

      <Stack.Screen
        name="MasterBarangAdd"
        component={MasterBarangAdd}
        options={{
          headerShown: true,
          headerTitle: 'Tambah Produk Daur Ulang',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />

      <Stack.Screen
        name="MasterBarangEdit"
        component={MasterBarangEdit}
        options={{
          headerShown: true,
          headerTitle: 'Edit Produk Daur Ulang',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />

      {/* CRUD JEMPUT */}
      <Stack.Screen
        name="Jemput"
        component={Jemput}
        options={{
          headerShown: true,
          headerTitle: 'Daftar Penjemputan',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />

      <Stack.Screen
        name="JemputDetail"
        component={JemputDetail}
        options={{
          headerShown: true,
          headerTitle: 'Detail Penjemputan',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />

      <Stack.Screen
        name="JemputAdd"
        component={JemputAdd}
        options={{
          headerShown: true,
          headerTitle: 'Tambah Penjemputan',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />

      <Stack.Screen
        name="JemputEdit"
        component={JemputEdit}
        options={{
          headerShown: true,
          headerTitle: 'Batal Penjemputan',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />
      {/* PENJUALAN */}

      <Stack.Screen
        name="Jual"
        component={Jual}
        options={{
          headerShown: true,
          headerTitle: 'Daftar Penjualan',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />


      <Stack.Screen
        name="JualDetail"
        component={JualDetail}
        options={{
          headerShown: true,
          headerTitle: 'Detail Penjualan',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />


      {/* BELI */}

      <Stack.Screen
        name="Beli"
        component={Beli}
        options={{
          headerShown: true,
          headerTitle: 'Daftar Pembelian',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />


      <Stack.Screen
        name="BeliAdd"
        component={BeliAdd}
        options={{
          headerShown: true,
          headerTitle: 'Tambah Pembelian',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />



      <Stack.Screen
        name="BeliCart"
        component={BeliCart}
        options={{
          headerShown: false,
          headerTitle: 'Selesaikan Pembelian',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />


      <Stack.Screen
        name="BeliDetail"
        component={BeliDetail}
        options={{
          headerShown: true,
          headerTitle: 'Detail Pembelian',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />

      <Stack.Screen
        name="BeliAddDetail"
        component={BeliAddDetail}
        options={{
          headerShown: false,
          headerTitle: 'Detail Pembelian',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />

      {/* LAPORAN */}

      <Stack.Screen
        name="LaporanJual"
        component={LaporanJual}
        options={{
          headerShown: true,
          headerTitle: 'Laporan Produk Daur Ulang',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />


      <Stack.Screen
        name="LaporanBeli"
        component={LaporanBeli}
        options={{
          headerShown: true,
          headerTitle: 'Laporan Pembelian',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />

      <Stack.Screen
        name="LaporanBeliDetail"
        component={LaporanBeliDetail}
        options={{
          headerShown: false,
          headerTitle: 'Laporan Pembelian',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />

      {/* END USER */}


      <Stack.Screen
        name="HomeDetail"
        component={HomeDetail}
        options={{
          headerShown: false,
          headerTitle: 'Detail Penjualan',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />

      <Stack.Screen
        name="BarangDetail"
        component={BarangDetail}
        options={{
          headerShown: false,
          headerTitle: 'Barang',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />

      <Stack.Screen
        name="Barang"
        component={Barang}
        options={{
          headerShown: false,
          headerTitle: 'Barang',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />

      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{
          headerShown: false,
          headerTitle: 'Keranjang Belanja',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />


      <Stack.Screen
        name="MenuTrx"
        component={MenuTrx}
        options={{
          headerShown: true,
          headerTitle: 'Transaksi',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />

      <Stack.Screen
        name="MenuLaporan"
        component={MenuLaporan}
        options={{
          headerShown: true,
          headerTitle: 'Laporan',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />

      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: true,
          headerTitle: 'Login Aplikasi',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />

      <Stack.Screen
        name="LoginAdmin"
        component={LoginAdmin}
        options={{
          headerShown: true,
          headerTitle: 'Login Administrator',
          headerStyle: {
            backgroundColor: colors.tertiary,
          },
          headerTintColor: '#fff',
        }}
      />

      <Stack.Screen
        name="SAdd"
        component={SAdd}
        options={{
          headerShown: false,
          headerTitle: 'SCAN BARCODE',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />

      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: true,
          headerTitle: 'Registrasi',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />

      <Stack.Screen
        name="STentang"
        component={STentang}
        options={{
          headerShown: false,
          headerTitle: 'Tentang',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />

      <Stack.Screen
        name="STentangApp"
        component={STentangApp}
        options={{
          headerShown: false,
          headerTitle: 'Tentang',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />

      <Stack.Screen
        name="Account"
        component={Account}
        options={{
          headerShown: false,

        }}
      />
      <Stack.Screen
        name="AccountEdit"
        component={AccountEdit}
        options={{
          headerShown: true,
          headerTitle: 'Edit Profile',
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerTintColor: '#000',
        }}
      />
      <Stack.Screen
        name="Riwayat"
        component={Riwayat}
        options={{
          headerShown: true,
          headerTitle: 'Riwayat',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />




      <Stack.Screen
        name="Pengguna"
        component={Pengguna}
        options={({ route, navigation }) => ({
          title: 'Daftar Pengguna',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0, // remove shadow on Android
          },
          headerRight: () => (
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 10,
              }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('PenggunaAdd')}
                style={{
                  position: 'relative',
                  padding: 5,
                  marginHorizontal: 5,
                }}>
                <Icon name="create" type="ionicon" color="white" size={20} />
              </TouchableOpacity>
            </View>
          ),
        })}
      />



      <Stack.Screen
        name="PenggunaAdd"
        component={PenggunaAdd}
        options={{
          headerShown: true,
          headerTitle: 'Tambah Pengguna',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />





      <Stack.Screen
        name="PenggunaEdit"
        component={PenggunaEdit}
        options={{
          headerShown: true,
          headerTitle: 'Edit Pengguna',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />


      <Stack.Screen
        name="Slider"
        component={Slider}
        options={({ route, navigation }) => ({
          title: 'Daftar Slider',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0, // remove shadow on Android
          },
          headerRight: () => (
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 10,
              }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('SliderAdd')}
                style={{
                  position: 'relative',
                  padding: 5,
                  marginHorizontal: 5,
                }}>
                <Icon name="create" type="ionicon" color="white" size={20} />
              </TouchableOpacity>
            </View>
          ),
        })}
      />



      <Stack.Screen
        name="SliderAdd"
        component={SliderAdd}
        options={{
          headerShown: true,
          headerTitle: 'Tambah Slider',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />


      <Stack.Screen
        name="AktifitasAdd"
        component={AktifitasAdd}
        options={{
          headerShown: true,
          headerTitle: 'Checkin Loker',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />

      <Stack.Screen
        name="Aktifitas"
        component={Aktifitas}
        options={{
          headerShown: true,
          headerTitle: 'Daftar POS',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />



      <Stack.Screen
        name="GetStarted"
        component={GetStarted}
        options={{
          headerShown: false,
        }}
      />







      <Stack.Screen
        name="SDaftar"
        component={SDaftar}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen
        name="SHasil"
        component={SHasil}
        options={{
          headerShown: false,
          headerTitle: 'Hasil Analisa',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />


      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />


      <Stack.Screen
        name="HomeAdmin"
        component={HomeAdmin}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SCek"
        component={SCek}
        options={{
          headerShown: false,
          headerTitle: 'CEK HARGA DAN STOCK',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />




    </Stack.Navigator>
  );
}
