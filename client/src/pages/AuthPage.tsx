import React, { FC, useContext, useState, MouseEvent} from 'react'
import { observer } from 'mobx-react-lite';
import LoginForm from '../components/LoginForm';
import {Box} from "@mui/material";
import { Context } from '..';
import { authorization } from '../services/userService';
import { ErrorType, IUser } from '../types/types';
import { useNavigate } from 'react-router-dom';
import { TASKS_ROUTE } from '../utils/consts';
import { checkErrorType } from '../utils/checkErrorType';
import { boxStyles } from '../styles/CustomStyles';

const AuthPage: FC = observer(() => {
  const navigate = useNavigate();
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const {userStore} = useContext(Context);

  const signIn = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setError('')
    if(!login.length) {
      setError('Логин не может быть пустым');
      return;
    }
      
    if(!password.length) {
      setError('Пароль не может быть пустым');
      return;
    }
    const data = await authorization(login,password);
    if(checkErrorType(data)) {
      const err = (data as ErrorType);
      if(err.status===403)
        setError(err.error_message);
      return;
    } 
    userStore.setAuth(true);
    userStore.setUser(data as IUser);
    navigate(TASKS_ROUTE);
  }

  return (
    <Box sx={boxStyles} height="100vh">
        <LoginForm login={login} 
          password={password} 
          setLogin={setLogin}
          error={error} 
          setPassword={setPassword}
          signIn={signIn} />
    </Box>
  )
})

export default AuthPage;

