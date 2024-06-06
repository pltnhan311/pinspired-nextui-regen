import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthApi } from '~/api/auth-api';
import { FormData } from '~/schema';

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (body: FormData) => AuthApi.loginAccount(body),
    onSuccess() {
      toast.success('Login successfully');
      navigate('/');
    }
  });
};
