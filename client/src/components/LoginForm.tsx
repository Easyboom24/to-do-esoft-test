import {Box, TextField, Typography, Button, Alert} from "@mui/material";
import { observer } from "mobx-react-lite";
import { FC, MouseEvent } from "react";
import { alertStyles, boxStyles, headerForAuthStyles } from "../styles/CustomStyles";

interface LoginFormProps {
    login: string,
    password: string,
    error: string,
    setLogin: (log:string) => void,
    setPassword: (pass:string) => void,
    signIn: (e: MouseEvent<HTMLButtonElement>) => Promise<void>
    
}

const LoginForm: FC<LoginFormProps> = observer((props) => {
    const {signIn, error, login, setLogin, password, setPassword} = props;
    return ( 
    <Box sx={boxStyles} width="500px">
        <Typography sx={headerForAuthStyles} component='h3'>Авторизация</Typography>
        <Box sx={{m:2}}>
            <TextField size="small" value={login} onChange={e => setLogin(e.target.value)}
             sx={{width:400}} label="Логин"/>
        </Box>
        <Box sx={{m:2}}>
            <TextField size="small" value={password} onChange={e => setPassword(e.target.value)}
             sx={{width:400}} type="password" label="Пароль"/>
        </Box>
        <Box sx={{m:2}}>
            <Button sx={{width:400}} onClick={signIn} variant="contained">Войти</Button>
        </Box> 
        {error && <Alert sx={alertStyles} severity="error">{error}</Alert>}  
    </Box>    
    );
})
 
export default LoginForm;