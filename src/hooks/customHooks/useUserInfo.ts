import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { UserApi } from '~/api/user-api';
import { RootState } from '~/store/store';
import { IUserData } from '~/types/types';

export const useUserInfo = () => {
  const [userInfo, setUserInfo] = useState<IUserData>();
  const email = useSelector((state: RootState) => state.Auth?.data?.Email);
  console.log(email);

  useEffect(() => {
    try {
      const getUserInfo = async () => {
        const { data } = await UserApi.getUserInformation(email as string);
        if (!isEmpty(data)) {
          setUserInfo(data);
        }
      };
      getUserInfo();
    } catch (error) {
      console.log(error);
    }
  }, [email]);

  return userInfo;
};
