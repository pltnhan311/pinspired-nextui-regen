import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthApi } from '~/api/auth-api';
import { FormData } from '~/schema';

export const useCreateAccount = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (body: FormData) => AuthApi.registerAccount(body),
    onSuccess() {
      toast.success('Create account successfully');
      navigate('/login');
    }
    // onError(error) {
    //   // toast.error(
    //   //   getError(error, {
    //   //     message: 'Create account failed'
    //   //   })
    //   // );
    //   toast.error(error.response.data.message);
    //   console.log(error.response.data.message);
    // }
  });
};
