import { FC } from "react";
import {
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  TableContainer,
} from "@mui/material";
import { TaskTypeForUpdate, TaskView } from "../types/types";
import TaskItem from "./TaskItem";
import {
  taskTableBodyStyles,
  taskTableCellStyles,
  taskTableHeadStyles,
} from "../styles/CustomStyles";
import { observer } from "mobx-react-lite";

interface TasksListProps {
  tasks: TaskView[];
  setModal: (bool: boolean) => void;
  setMode: (str: "create" | "update") => void;
  setTaskForUpdate: (task: TaskTypeForUpdate) => void;
}

const TasksList: FC<TasksListProps> = observer((props) => {
  const { tasks, setModal, setMode, setTaskForUpdate} = props;
  return (
    <TableContainer>
      <Table stickyHeader sx={{ height: "100%", "::-webkit-scrollbar":{width:0} }}>
        <TableHead>
          <TableRow sx={taskTableHeadStyles}>
            <TableCell sx={taskTableCellStyles}>Заголовок</TableCell>
            <TableCell sx={taskTableCellStyles}>Приоритет</TableCell>
            <TableCell sx={taskTableCellStyles}>Дата окончания</TableCell>
            <TableCell sx={taskTableCellStyles}>Ответственный</TableCell>
            <TableCell sx={taskTableCellStyles}>Статус</TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={taskTableBodyStyles}>
          {tasks.map((task) => 
            <TaskItem
              setMode={setMode}
              setTaskForUpdate={setTaskForUpdate}
              setModal={setModal}
              key={task.task_id}
              task={task}
            />
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
});

export default TasksList;
