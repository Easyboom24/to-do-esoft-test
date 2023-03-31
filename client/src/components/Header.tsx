import { AppBar, Button, Box } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import { observer } from 'mobx-react-lite';
import {FC} from 'react';

interface HeaderProps {
    logOut: () => void
}
 
const Header:  FC<HeaderProps> = observer(({logOut}) => {
    return (
        <Box>
            <AppBar style={{display:'flex', alignItems:'flex-end', zIndex:0}}>
            <Toolbar>
                <Button onClick={logOut} color="inherit">Выход</Button>            
            </Toolbar>
        </AppBar>   
        </Box> 
        
       
     );
})
 
export default Header;