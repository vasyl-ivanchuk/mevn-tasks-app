import axios from 'axios';
import store from '@/store/store';

const apiHost = process.env.API_URL;
export default () => axios.create({
  baseURL: `${apiHost}/`,
  headers: {
    Authorization: `Bearer ${store.state.user && store.state.user.token}`,
  },
});
