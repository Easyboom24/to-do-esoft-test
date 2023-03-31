/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useContext, useState, MouseEvent, useEffect} from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { fetchResponsiblesList } from "../services/userService";
import { Context } from "..";
import Select from 'react-select';
import { PriorityType, ResponsibleUser, StatusType, TaskTypeForCreate, TaskTypeForUpdate } from "../types/types";
import { createTask, fetchOneTask, updateTask } from "../services/taskService";
import { getDateForDatePickerValue } from "../utils/getDateToString";
import TextArea from "./TextArea";
import AsyncSelectResponsible from "./AsyncSelectResponsible";
import DatePickerField from "./DatePickerField";
import Loader from "./Loader";
import { observer } from "mobx-react-lite";

interface TaskFormProps {
  taskForUpdate: TaskTypeForUpdate,
  setVisible: (bool:boolean) => void,
  finished: boolean,
  setFinished: (bool:boolean) => void
  mode: 'create' | 'update'
}

const TaskForm: FC<TaskFormProps> = observer(({taskForUpdate, setVisible, finished, setFinished, mode}) => {
    const {userStore, taskStore} = useContext(Context);
    const [inputValueResponsible, setInputValueResponsible] = useState<string>('');
    const [selectedResponsible, setSelectedResponsible] = useState<ResponsibleUser>();
    const [header, setHeader] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [dateEnd, setDateEnd] = useState<string>(getDateForDatePickerValue(new Date()));
    const [status, setStatus] = useState<StatusType | undefined>(taskStore.statuses[0]);
    const [priority, setPriority] = useState<PriorityType | undefined>(taskStore.priorities[0]);
    const [loading,setLoading] = useState<boolean>(() => mode==='create' ? false : true);

    const disabledField = () => {
      return mode==='update' && 
      userStore.user.id !== Number(taskForUpdate?.creator_id); 
    }
    
    const disabledButton = () => {
      if (mode === "create") {
        return !Boolean(header && description &&
          dateEnd && status && priority && selectedResponsible);
      } else {
        const task1: Omit<TaskTypeForUpdate, "task_id"> = {
          header: taskForUpdate.header,
          description: taskForUpdate.description,
          date_end: taskForUpdate.date_end,
          creator_id: taskForUpdate.creator_id,
          responsible_id: taskForUpdate.responsible_id,
          priority_id: taskForUpdate.priority_id,
          status_id: taskForUpdate.status_id,
        };
        let task2 = getTaskFromFileds();
        if (taskForUpdate.creator_id) {
          try { task2!.creator_id = taskForUpdate.creator_id;}
          catch { return true}
        }
        return JSON.stringify(task1) === JSON.stringify(task2);
      }
    };
    

    useEffect(() => {
      if(mode==='update') {
        getTaskForUpdate()
      }
    }, [])

    const getTaskForUpdate = () => {
      const taskId = taskForUpdate.task_id;
      
        fetchOneTask(taskId,userStore.user.id).then(
          data => {
            setHeader(data.header);
            setDescription(data.description);
            taskForUpdate.description = data.description;
            taskForUpdate.responsible_id = data.responsible_id;
            setDateEnd(getDateForDatePickerValue(data.date_end));
            setStatus(taskStore.statuses.filter((elem) => data.status_id==elem.status_id)[0]);
            setPriority(taskStore.priorities.filter((elem) => data.priority_id==elem.priority_id)[0]);
            setInputValueResponsible(`${data.responsible_surname} 
            ${data.responsible_firstname} 
            ${data.responsible_patronymic}`)
            const responsible = {  id: data.responsible_id,
              surname: data.responsible_surname,
              firstname: data.responsible_firstname,
              patronymic: data.responsible_patronymic,}
            setSelectedResponsible(responsible)
          }
        ).finally(() => setLoading(false))
    }

    const getTaskFromFileds = () => {
      if(header && description && dateEnd && status && priority && selectedResponsible) { 
        let newTask: TaskTypeForCreate = {
          header, description,date_end: new Date(dateEnd), creator_id: userStore.user.id,
          responsible_id: selectedResponsible.id, priority_id: priority.priority_id,
          status_id: status.status_id
        };
        return newTask;
      }
      return null;
    }

    const getUpdateTask = () => {
      const task = {...getTaskFromFileds(),task_id: taskForUpdate.task_id,userId:userStore.user.id};
      if(userStore.user.id === Number(taskForUpdate?.creator_id)) {
        return updateTask(task).then(data => {
          if(data.task_id) {
            setFinished(true);
          }
        })
      }
      else {
        const task = {
          userId: userStore.user.id,
          task_id: taskForUpdate.task_id,
          status_id:status?.status_id}
        return updateTask(task).then(data =>{
          console.log(data)
          if(data.task_id) {
            setFinished(true);
          }
        })
      }
    }

    const getCreateTask = () => {
      const taskForCreate = getTaskFromFileds();
      if(taskForCreate) {
        return createTask(taskForCreate).then(data =>{
          if(data.task_id) {
            setFinished(true);
          }
        });
      }
    }
  
    const getResponsibleList = (inputValue: string) => {
      if(inputValue.length > 3)
        return fetchResponsiblesList(userStore.user.id,inputValue);
    }

    const buttonClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
        if(mode==='create') {
          getCreateTask()
        }
        else {
         
            getUpdateTask()
        }
    }

    if(finished) {
      return (
        <Box sx={{display: "flex",flex:1,alignItems:'center',justifyContent:'center'}}>
          <Typography variant="h5">Задача успешно {mode==='update' ?'обновлена' : 'создана'}</Typography>
        </Box>)
    }

  return (
    <>
    {loading ? <Loader/> :
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
      <Box>
        <Typography align="center" variant="h5">
          {mode==='create' ? 'Создание задачи' : 'Просмотр задачи'}
        </Typography>
      </Box>
      <Box sx={{ m: 1 }}>
        <TextField
        disabled={disabledField()} 
        size="small"
        value={header}
        onChange={e => setHeader(e.target.value)}
        sx={{ width: 400 }}
        label="Заголовок" />
      </Box>
      <TextArea disabled={disabledField()} description={description} setDescription={setDescription}/>
      <DatePickerField disabled={disabledField()} dateEnd={dateEnd} setDateEnd={setDateEnd}/>
      <AsyncSelectResponsible
        disabled={disabledField()} 
        getResponsibleList={getResponsibleList}
        selectedResponsible={selectedResponsible}
        setInputValueResponsible={setInputValueResponsible}
        setSelectedResponsible={setSelectedResponsible}/>
      <Box sx={{ m: 1}}>
      <Typography fontSize={14} left={5} color='gray' position='relative'>Статус</Typography>
      <Select
        isSearchable={false}
        getOptionLabel={e => e.status_name}
        getOptionValue={e => String(e.status_id)}
        defaultValue={status ? status : taskStore.statuses[0]}
        options={taskStore.statuses}
        onChange={e => {setStatus(e as StatusType)}}
      />
      </Box>
      <Box sx={{ m: 1}}>
      <Typography fontSize={14} left={5} color='gray' position='relative'>Приоритет</Typography>
      <Select
        isDisabled={disabledField()}
        isSearchable={false}
        getOptionLabel={e => e.priority_name}
        getOptionValue={e => String(e.priority_id)}
        defaultValue={priority ? priority : taskStore.priorities[2]}
        options={taskStore.priorities}
        onChange={e => {setPriority(e as PriorityType)}}
      />
      </Box>
      <Box sx={{ m: 1 }}>
        <Button 
          variant="contained"
         disabled={disabledButton()}
         onClick={buttonClickHandler}
         sx={{width:400}}>
          Сохранить
        </Button>
      </Box>
    </Box>
    }
    </>
  );
});

export default TaskForm;