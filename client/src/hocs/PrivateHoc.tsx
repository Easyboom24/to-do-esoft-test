import { FC, useContext, PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { Context } from "..";
import { LOGIN_ROUTE } from "../utils/consts";
import {observer} from 'mobx-react-lite';


const PrivateHoc: FC<PropsWithChildren> = observer(({children}) => {
    const {userStore} = useContext(Context);

    if(!userStore.isAuth) {
        return <Navigate to={LOGIN_ROUTE}/>
    }
    return <>{children}</>;
})
 
export default PrivateHoc;