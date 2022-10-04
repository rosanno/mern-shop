import { publicRequest } from '../api/axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../features/authSlice';

const useRefreshToken = () => {
  const dispatch = useDispatch();

  const refresh = async () => {
    const response = await publicRequest.get('/refresh');
    localStorage.setItem('user', JSON.stringify(response.data.user));
    dispatch(setUser(response.data));
    return response.data.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
