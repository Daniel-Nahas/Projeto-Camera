// telas/Perfil.tsx
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type PerfilRouteProp = RouteProp<RootStackParamList, 'Perfil'>;
type PerfilNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Perfil'>;

export default function Perfil() {
  const route = useRoute<PerfilRouteProp>();
  const navigation = useNavigation<PerfilNavigationProp>();
  const { nome, email, foto } = route.params;

  // Caso os parâmetros não existam por algum motivo, evita crash
  if (!nome || !email) {
    Alert.alert('Erro', 'Dados do perfil não encontrados.');
    navigation.goBack();
    return null;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Perfil</Text>

      <View style={styles.fotoContainer}>
        {foto ? (
          <Image source={{ uri: foto }} style={styles.foto} resizeMode="cover" />
        ) : (
          <View style={styles.fotoBox}>
            <Text style={styles.txtFoto}>Sem foto</Text>
          </View>
        )}
      </View>

      <View style={styles.boxInfo}>
        <Text style={styles.label}>Nome</Text>
        <Text style={styles.value}>{nome}</Text>

        <Text style={[styles.label, { marginTop: 12 }]}>E-mail</Text>
        <Text style={styles.value}>{email}</Text>
      </View>

      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Text style={styles.backBtnTxt}>Voltar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'stretch',
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 18,
    textAlign: 'center',
  },
  fotoContainer: {
    height: 280,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fafafa',
  },
  foto: {
    width: '100%',
    height: '100%',
  },
  fotoBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtFoto: {
    color: '#888',
  },
  boxInfo: {
    marginTop: 18,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#eee',
  },
  label: {
    fontSize: 13,
    color: '#666',
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 4,
  },
  backBtn: {
    marginTop: 20,
    backgroundColor: '#b71c1c',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  backBtnTxt: {
    color: '#fff',
    fontWeight: '600',
  },
});