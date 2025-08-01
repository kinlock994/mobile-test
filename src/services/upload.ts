import api from './api';

/**
 * Upload a local image file to GET /uploads  (server returns the public URL).
 * Accepts react-native-image-picker’s `assets[0]`.
 */
export async function uploadImage(asset: {
  uri?: string;
  type?: string;
  fileName?: string;
}) {
  if (!asset.uri) throw new Error('Invalid image asset');

  const data = new FormData();
  data.append('image', {
    // @ts-ignore  – RN FormData types are loose
    uri: asset.uri,
    type: asset.type || 'image/jpeg',
    name: asset.fileName || 'upload.jpg',
  });

  const res = await api({
    url: '/upload',
    method: 'POST',
    data,
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return res.data.url as string;
}
