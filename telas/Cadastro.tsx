// telas/Cadastro.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Cadastro'>;

export default function Cadastro({ navigation }: Props) {
  const [nome, setNome] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [fotoUri, setFotoUri] = useState<string | null>(null);
  const [statusMsg, setStatusMsg] = useState<string>('');

  // Solicita permissão e abre a câmera
  async function tirarFoto() {
    try {
      setStatusMsg('Pedindo permissão para câmera...');
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão negada', 'Permissão negada para acessar a câmera!');
        setStatusMsg('Permissão negada');
        return;
      }

      setStatusMsg('Abrindo câmera...');
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        allowsEditing: true,
      });

      if (result.canceled) {
        setStatusMsg('Câmera cancelada');
        return;
      }

      const uri = result.assets[0].uri;
      setFotoUri(uri);
      setStatusMsg('Foto capturada');
    } catch (error) {
      console.error('Erro ao abrir câmera', error);
      setStatusMsg('Erro ao abrir câmera');
    }
  }

  // Valida e navega para a tela Perfil passando parâmetros
  function verPerfil() {
    if (!nome.trim() || !email.trim()) {
      Alert.alert('Dados incompletos', 'Preencha nome e e-mail antes de ver o perfil.');
      return;
    }

    navigation.navigate('Perfil', { nome: nome.trim(), email: email.trim(), foto: fotoUri });
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.select({ ios: 'padding', android: undefined })}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Cadastro</Text>

        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu nome"
          value={nome}
          onChangeText={setNome}
          autoCapitalize="words"
        />

        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={styles.input}
          placeholder="seu@email.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TouchableOpacity style={styles.btnFoto} onPress={tirarFoto}>
          <Text style={styles.fotoBtnTxt}>Tirar Foto</Text>
        </TouchableOpacity>

        <Text style={styles.status}>{statusMsg}</Text>

        <View style={styles.preview}>
          {fotoUri ? (
            <Image source={{ uri: fotoUri }} style={styles.img} resizeMode="cover" />
          ) : (
            <Text style={styles.txtFoto}>Nenhuma foto capturada</Text>
          )}
        </View>

        <TouchableOpacity style={styles.btn} onPress={verPerfil}>
          <Text style={styles.btnTxt}>Ver Perfil</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 18,
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    marginTop: 8,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  btnFoto: {
    backgroundColor: '#1976d2',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
  },
  fotoBtnTxt: {
    color: '#fff',
    fontWeight: '600',
  },
  status: {
    marginTop: 8,
    textAlign: 'center',
    color: '#444',
  },
  preview: {
    height: 240,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fafafa',
  },
  img: {
    width: '100%',
    height: '100%',
  },
  txtFoto: {
    color: '#888',
  },
  btn: {
    backgroundColor: '#2e7d32',
    padding: 14,
    borderRadius: 8,
    marginTop: 18,
    alignItems: 'center',
  },
  btnTxt: {
    color: '#fff',
    fontWeight: '600',
  },
});
