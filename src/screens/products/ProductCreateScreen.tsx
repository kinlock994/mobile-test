/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ActivityIndicator,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
// import { zodResolver } from '@hookform/resolvers/zod';

import { useCreateProductMutation } from '@store/api/productApi';
import { Card, Input, Button } from '@components';
import { uploadImage } from '@services/upload';

const schema = z.object({
  title: z.string().min(2, 'Title is required'),
  description: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function ProductCreateScreen() {
  const navigation = useNavigation();
  const [createProduct, { isLoading: creating }] = useCreateProductMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    // resolver: zodResolver(schema),
    // mode: 'onTouched',
  });

  const [localImage, setLocalImage] = useState<
    { uri?: string; fileName?: string; type?: string } | undefined
  >(undefined);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [imgError, setImgError] = useState<string | undefined>(undefined);

  const pickImage = async () => {
    const res = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.8,
    });

    if (res.didCancel || !res.assets?.length) return;

    setLocalImage(res.assets[0]);
    setImgError(undefined);
  };

  const onSubmit = async (data: FormData) => {
    try {
      let finalUrl = imageUrl;
      if (localImage && !finalUrl) {
        setUploading(true);
        finalUrl = await uploadImage(localImage);
        setUploading(false);
        setImageUrl(finalUrl);
      }
      await createProduct({ ...data, image: finalUrl }).unwrap();
      navigation.goBack();
    } catch (e: any) {
      console.warn('Create product failed');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.flex}
    >
      <View style={styles.container}>
        <Card>
          {/* title */}
          <Controller
            control={control}
            name="title"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Title"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.title?.message}
              />
            )}
          />

          {/* description */}
          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Description"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                multiline
                numberOfLines={4}
                style={{ height: 120, textAlignVertical: 'top' }}
                error={errors.description?.message}
              />
            )}
          />

          {/* image picker */}
          <View style={{ marginBottom: 16 }}>
            <Text style={styles.label}>Image</Text>

            {localImage ? (
              <Image source={{ uri: localImage.uri }} style={styles.preview} />
            ) : imageUrl ? (
              <Image source={{ uri: imageUrl }} style={styles.preview} />
            ) : (
              <Text style={{ color: '#999', marginBottom: 8 }}>
                No image selected
              </Text>
            )}

            {imgError && <Text style={styles.error}>{imgError}</Text>}

            <Button
              title="Choose Image"
              onPress={pickImage}
              disabled={uploading || creating}
            />
          </View>

          {/* alerts */}
          {uploading && (
            <View style={styles.row}>
              <ActivityIndicator size="small" />
              <Text style={styles.rowText}>Uploading…</Text>
            </View>
          )}

          {/* submit */}
          <Button
            title={creating ? 'Saving…' : 'Create'}
            onPress={handleSubmit(onSubmit)}
            // disabled={creating || uploading || !isDirty || !isValid}
          />
        </Card>
      </View>
    </KeyboardAvoidingView>
  );
}

/* ---------------- styles ---------------- */
const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: { flex: 1, padding: 24 },
  label: { marginBottom: 4, color: '#555', fontWeight: '500' },
  error: { color: '#ff4d4f', marginBottom: 8 },
  preview: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#eee',
  },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  rowText: { marginLeft: 8 },
});
