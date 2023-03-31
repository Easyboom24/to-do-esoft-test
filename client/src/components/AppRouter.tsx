import { observer } from 'mobx-react-lite';
import { FC, useContext } from 'react'
import { Routes, Route, Navigate} from 'react-router-dom'
import { Context } from '..';
import AuthHoc from '../hocs/AuthHoc';
import PrivateHoc from '../hocs/PrivateHoc';
import AuthPage from '../pages/AuthPage';
import TasksPage from '../pages/TasksPage';
import { LOGIN_ROUTE, TASKS_ROUTE } from '../utils/consts'



const AppRouter: FC = observer(() => {
    const {userStore} = useContext(Context);
  return (
    <Routes>
        <Route path={LOGIN_ROUTE} element={<AuthHoc><AuthPage/></AuthHoc>}/>
        <Route path={TASKS_ROUTE} element={<PrivateHoc><TasksPage/></PrivateHoc>}/>
        <Route path='*' element={<Navigate to={userStore.isAuth ? TASKS_ROUTE : LOGIN_ROUTE} replace/>}/>
    </Routes>
  )
})


export default AppRouter;