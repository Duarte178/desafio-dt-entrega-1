
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

export default function ConfigScreen({ navigation, route }) {
  const { apiUrl, setApiUrl } = route.params;
  const [url, setUrl] = useState(apiUrl);

  const save = () => {
    setApiUrl(url);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} value={url} onChangeText={setUrl} placeholder="API URL" />
      <Button title="Salvar" onPress={save} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: { borderWidth: 1, padding: 8, marginBottom: 16 }
});
