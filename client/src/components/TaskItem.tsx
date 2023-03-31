import { FC } from "react";
import { TableCell, TableRow} from '@mui/material';
import { TaskView, TaskTypeForUpdate } from "../types/types";
import { getDateToString } from "../utils/getDateToString";
import { taskTableCellStyles, taskTableRowStyles } from "../styles/CustomStyles";
import { observer } from "mobx-react-lite";

interface TaskItemProps {
    task: TaskView
    setModal: (bool:boolean) => void,
    setMode: (str: 'create' | 'update') => void,
    setTaskForUpdate: (task: TaskTypeForUpdate) => void 
}
 
const TaskItem: FC<TaskItemProps> = observer(({task, setModal, setMode, setTaskForUpdate}) => {
    const getColor = (): string => {
        const currentDate = new Date();
        const dateDifference = Date.parse(task.date_end.toString()) - Date.parse(currentDate.toString())
        if(dateDifference < 0 && (task.status_id < 3))
            return 'red';
        else if(task.status_id === 3)
            return 'green';
        else 
            return 'gray';
    }

    const clickHandler = () => {
        setModal(true);
        setMode('update')
        setTaskForUpdate(task)
    }
    const responsible = `${task.responsible_surname} 
    ${task.responsible_firstname}${task.responsible_patronymic && ` ${task.responsible_patronymic}`}`;
    const color = getColor();
    return ( 
        <TableRow sx={taskTableRowStyles} 
        onClick={clickHandler}>
            <TableCell sx={{color:color,...taskTableCellStyles}}>{task.header}</TableCell>
            <TableCell sx={taskTableCellStyles}>{task.priority_name}</TableCell>
            <TableCell sx={taskTableCellStyles}>{getDateToString(task.date_end)}г.</TableCell>
            <TableCell sx={taskTableCellStyles}>{responsible}</TableCell>
            <TableCell sx={taskTableCellStyles}>{task.status_name}</TableCell>
        </TableRow>
     );
})
 
export default TaskItem;