import { FC, PropsWithChildren, useContext } from "react";
import { Context } from "..";
import { Navigate } from 'react-router-dom';
import { TASKS_ROUTE } from "../utils/consts";
import {observer} from 'mobx-react-lite';


const AuthHoc: FC<PropsWithChildren> = observer(({children}) => {
    
    const {userStore} = useContext(Context);

    if(userStore.isAuth) {
        return <Navigate to={TASKS_ROUTE}/>
    }
    return <>{children}</>;
})
 
export default AuthHoc;