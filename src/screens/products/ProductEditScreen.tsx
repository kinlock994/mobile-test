/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from '@store/api/productApi';
import { ProductsStackParamList } from '@navigation/ProductsStack';
import { uploadImage } from '@services/upload';
import { Card, Input, Button } from '@components';

const schema = z.object({
  title: z.string().min(2, 'Title is required'),
  description: z.string().optional(),
});

type FormData = z.infer<typeof schema>;
type Route = RouteProp<ProductsStackParamList, 'ProductEdit'>;

export default function ProductEditScreen() {
  const { params } = useRoute<Route>();
  const navigation = useNavigation();

  /* fetch current product */
  const { data, isFetching, error } = useGetProductByIdQuery(params.id);
  const [updateProduct, { isLoading: updating }] = useUpdateProductMutation();

  /* form setup */
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { title: '', description: '' },
    mode: 'onTouched',
  });

  /* local image state */
  const [localImage, setLocalImage] = useState<any>(undefined);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [uploading, setUploading] = useState(false);

  /* populate once data arrives */
  useEffect(() => {
    if (data) {
      reset({ title: data.title, description: data.description ?? '' });
      setImageUrl(data.image);
    }
  }, [data, reset]);

  const pickImage = async () => {
    const res = await launchImageLibrary({ mediaType: 'photo', quality: 0.8 });
    if (res.didCancel || !res.assets?.length) return;
    setLocalImage(res.assets[0]);
  };

  const onSubmit = async (form: FormData) => {
    try {
      let finalUrl = imageUrl;

      if (localImage) {
        setUploading(true);
        finalUrl = await uploadImage(localImage);
        setUploading(false);
      }

      await updateProduct({
        id: params.id,
        title: form.title,
        description: form.description,
        image: finalUrl,
      }).unwrap();

      navigation.goBack();
    } catch (e: any) {
      Alert.alert('Error', e?.data?.message ?? 'Update failed');
    }
  };

  if (isFetching || !data) {
    return (
      <View style={styles.center}>
        {error ? (
          <Text style={styles.error}>Cannot load product.</Text>
        ) : (
          <ActivityIndicator size="large" />
        )}
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.container}>
        <Card>
          <Controller
            control={control}
            name="title"
            render={({ field: { onChange, value, onBlur } }) => (
              <Input
                label="Title"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.title?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, value, onBlur } }) => (
              <Input
                label="Description"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                multiline
                numberOfLines={4}
                style={{ height: 120, textAlignVertical: 'top' }}
              />
            )}
          />

          <Text style={styles.label}>Image</Text>
          {localImage ? (
            <Image source={{ uri: localImage.uri }} style={styles.preview} />
          ) : imageUrl ? (
            <Image source={{ uri: imageUrl }} style={styles.preview} />
          ) : (
            <Text style={{ color: '#999', marginBottom: 8 }}>No image</Text>
          )}
          <Button
            title="Change Image"
            onPress={pickImage}
            disabled={uploading || updating}
          />

          {uploading && (
            <View style={styles.row}>
              <ActivityIndicator size="small" />
              <Text style={styles.rowText}>Uploading…</Text>
            </View>
          )}

          <Button
            title={updating ? 'Saving…' : 'Save'}
            onPress={handleSubmit(onSubmit)}
            disabled={updating || uploading || !isDirty || !isValid}
          />
        </Card>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: { flex: 1, padding: 24 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  label: { marginBottom: 4, color: '#555', fontWeight: '500' },
  preview: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#eee',
  },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  rowText: { marginLeft: 8 },
  error: { color: '#ff4d4f' },
});
