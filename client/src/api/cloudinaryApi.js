import axios from 'axios';

const cloudName = 'dn27bg6qw';
const unsignedUploadPreset = 'bcybyevo';
const baseUrl = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;

export const postImage = async file => {
  const formData = new FormData();
  formData.append('upload_preset', unsignedUploadPreset);
  formData.append('tags', `sunmait blogpost`);
  formData.append('file', file);

  const config = {
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'content-type': 'multipart/form-data',
    },
  };
  const response = await axios.post(baseUrl, formData, config);

  const result = {
    status: response.status,
    data: '',
  };

  if (!response.status === 200) {
    return result;
  }

  result.data = response.data.secure_url;

  return result;
};
