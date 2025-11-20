import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function App() {

const [status, setStatus] = useState<string>('');
const [imageUri, setImageUri] = useState<string | null> (null);

async function abrirCamera() {
  try{
    setStatus("Pedindo permissão...");

    const{status} = await ImagePicker.requestCameraPermissionsAsync();

    if(status !== 'granted'){
      setStatus("Permissão negada! assim não pode usar a câmera!");
      return;
    }

    setStatus("Abrindo a câmera...");

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality:1
    })

  }catch(error){
    setStatus("Erro ao abrir");
  }
  
}


  return (
    <View style={styles.container}>

      <Text style={styles.titulo}>Câmera</Text>
      
      <TouchableOpacity style={styles.btn}>
        <Text  style={styles.txtBtn}>Abrir câmera</Text>  
      </TouchableOpacity>

      <Text>{status}</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo:{},
  btn:{},
  txtBtn:{}
});
