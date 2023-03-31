import { FC, ReactNode, useContext } from "react";
import Portal from "./Portal";
import { Box, Button } from '@mui/material';
import { modalContent, modalStyles } from "../styles/CustomStyles";
import { TaskTypeForUpdate } from "../types/types";
import { Context } from "..";
import { observer } from "mobx-react-lite";


interface ModalProps {
    visible: boolean,
    setVisible: (bool: boolean) => void,
    setFinished: (bool: boolean) => void,
    setTaskForUpdate: (task: TaskTypeForUpdate) => void
    children: ReactNode
    
}
 
const Modal: FC<ModalProps> = observer(({visible, setVisible, setFinished,setTaskForUpdate,children}) => {
    const {taskStore} = useContext(Context)
    if(!visible) {
        return null;
    }

    const closeModal = () => {
        setVisible(false);
        setFinished(false);
        setTaskForUpdate({task_id:taskStore.oneTask.task_id})
    }

    return ( 
        <Portal>
            <Box position={'fixed'}  sx={modalStyles}
             onClick={closeModal}>
                <Box onClick={e => {e.stopPropagation()}} sx={modalContent}>
                    <Box sx={{display:'flex',justifyContent:'flex-end'}}>
                    <Button sx={{minWidth:0,position:'relative',left:10}} onClick={closeModal}>X</Button>
                    </Box>
                    {children}
                </Box>
                
            </Box>
        </Portal>

     );
})
 
export default Modal;