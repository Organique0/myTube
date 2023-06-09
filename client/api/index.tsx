import axios from "axios";

const base = process.env.NEXT_PUBLIC_API_ENDPOINT;

const userBase = `${base}/api/users`;
const authBase = `${base}/api/auth`;
const videosBase = `${base}/api/videos`;

export function registerUser(payload: {
  username: string;
  password: string;
  email: string;
  confirmPassword: string;
}) {
  return axios.post(userBase, payload).then((response) => response.data);
}

export function login(payload: { email: string; password: string }) {
  return axios
    .post(authBase, payload, {
      withCredentials: true
    })
    .then((response) => response.data);
}

export function getMe() {
  return axios
    .get(userBase, {
      withCredentials: true
    })
    .then((response) => response.data)
    .catch(() => null);
}

export function uploadVideo({
  formData,
  config
}: {
  formData: FormData;
  config: { onUploadProgress: (progressEvent: any) => void };
}) {
  return axios
    .post(videosBase, formData, {
      withCredentials: true,
      ...config,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then((response) => response.data);
}

export function updateVideo({
  videoId,
  ...payload
}: {
  videoId: string;
  title: string;
  description: string;
  published: boolean;
}) {
  return axios.patch(`${videosBase}/${videoId}`, payload, {
    withCredentials: true
  });
}

export function getVideos() {
  return axios.get(videosBase).then((response) => response.data);
}
