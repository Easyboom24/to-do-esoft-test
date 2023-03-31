/* eslint-disable react-hooks/exhaustive-deps */
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './components/AppRouter';
import {observer} from 'mobx-react-lite';
import { useContext, useState, useEffect } from 'react';
import { Context } from '.';
import { checkAuth } from './services/userService';
import { ErrorType, IUser } from './types/types';
import { CircularProgress, Box } from '@mui/material';
import { checkErrorType } from './utils/checkErrorType';
import { fetchPriorities, fetchStatuses } from './services/taskService';


const App = observer(() => {
  const {userStore,taskStore} = useContext(Context);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<ErrorType>();

  useEffect(() => {
      checkAuth()
      .then(data => {
        if(checkErrorType(data)){
          setError(data as ErrorType);
          throw error
        }
        userStore.setAuth(true);
        userStore.setUser(data as IUser);
        fetchPriorities().then(data => {
          taskStore.setPriorities(data);
        })
        fetchStatuses().then(data => {
          taskStore.setStatuses(data)
        })
      })
      .finally(() => setLoading(false))
      .catch(() => console.error(error));
  }, [])

  if(loading) {
    return (
      <Box sx={{height:'100vh'}} display='flex' alignItems='center' justifyContent='center'>
          <CircularProgress/>
      </Box>
    );
  }
  
  return (
    <BrowserRouter>
      <AppRouter/>
    </BrowserRouter>
  );
})

export default App;
