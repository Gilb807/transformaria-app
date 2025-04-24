import React, { useState } from 'react';
import { View, Button, Image, Platform, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

export default function App() {
  const [imageUri, setImageUri] = useState(null);

  // Função para escolher a imagem
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.cancelled) {
      setImageUri(result.uri);
    }
  };

  // Função para enviar a imagem para o backend
  const transformImage = async () => {
    if (!imageUri) {
      Alert.alert('Selecione uma imagem primeiro!');
      return;
    }

    const formData = new FormData();
    formData.append('image', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'image.jpg',
    });

    try {
      const response = await axios.post('http://<SERVER_URL>/api/transform', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const resultImage = response.data.result;
      Alert.alert('Imagem transformada', resultImage);
    } catch (error) {
      console.error(error);
      Alert.alert('Erro ao transformar imagem');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Escolher Imagem" onPress={pickImage} />
      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={{ width: 200, height: 200, marginVertical: 20 }}
        />
      )}
      <Button title="Transformar Imagem" onPress={transformImage} />
    </View>
  );
}
