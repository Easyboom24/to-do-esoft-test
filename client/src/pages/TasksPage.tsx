/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { observer } from "mobx-react-lite";
import { FC, useContext, useEffect, useState } from "react";
import { Box, Pagination } from "@mui/material";
import { Context } from "..";
import { fetchTasks, getPagesCount } from "../services/taskService";
import { checkErrorType } from "../utils/checkErrorType";
import { ErrorType, IUser, OrderTasks, TaskView, TaskTypeForUpdate} from "../types/types";
import Header from "../components/Header";
import TasksList from "../components/TasksList";
import Modal from "../components/Modal";
import TaskForm from "../components/TaskForm";
import Loader from "../components/Loader";
import { boxForTaskListStyles, boxStyles, paginationStyles } from "../styles/CustomStyles";
import TopPanel from "../components/TopPanel";

const TasksPage: FC = observer(() => {
  const { taskStore, userStore } = useContext(Context);
  const [error, setError] = useState<string>("");
  const [modal, setModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pagesCount, setPagesCount] = useState<number>(1);
  const [limit, setLimit] = useState<number>(15);
  const [isPageOrOrderChanged,setIsPageOrOrderChanged] = useState<boolean>(false);
  const [order, setOrder] = useState<OrderTasks>("updated_at");
  const [taskForUpdate, setTaskForUpdate] = useState<TaskTypeForUpdate>({
    task_id: taskStore.oneTask.task_id,
  });
  const [finished, setFinished] = useState<boolean>(false);
  const [mode, setMode] = useState<"create" | "update">("create");

  const getPages = () => {
    return getPagesCount(userStore.user.id, limit).then((data) => {
      if (checkErrorType(data)) {
        setError((data as ErrorType).error_message);
        throw error;
      }
      setPagesCount((data as { countPages: number }).countPages);
    });
  };

  const getTasks = () => {
    setLoading(true);
    return fetchTasks(userStore.user.id, currentPage, limit, order)
      .then((data) => {
        if (checkErrorType(data)) {
          setError((data as ErrorType).error_message);
          throw error;
        }
        taskStore.setTasks(data as TaskView[]);
      })
      .finally(() => {
        setLoading(false);
      })
      .catch(() => {
        console.log(error);
      });
  };

  useEffect(() => {
    if(isPageOrOrderChanged) {
      getTasks();
      setIsPageOrOrderChanged(false);
    }
    else {
      Promise.all([getPages(), getTasks()]);
    }
  }, [currentPage,order]);

  useEffect(() => {
    if(finished) {
      Promise.all([getPages(), getTasks()]);
    }
  }, [finished,currentPage]);

  const logOut = () => {
    localStorage.removeItem("token");
    userStore.setAuth(false);
    userStore.setUser({} as IUser);
    taskStore.setTasks([]);
    taskStore.setStatuses([]);
    taskStore.setPriorities([]);
    taskStore.setOneTask({} as TaskView);
  };

  return (
    <>
      <Modal
        setVisible={setModal}
        setTaskForUpdate={setTaskForUpdate}
        setFinished={setFinished}
        visible={modal}
      >
        <TaskForm
          mode={mode}
          finished={finished}
          setFinished={setFinished}
          setVisible={setModal}
          taskForUpdate={taskForUpdate}
        />
      </Modal>
      <Box sx={boxStyles} height="100%">
        <Header logOut={logOut} />
        <Box sx={{...boxForTaskListStyles}}>
          {loading 
            ? <Loader />
            : <TasksList
              setTaskForUpdate={setTaskForUpdate}
              setMode={setMode}
              setModal={setModal}
              tasks={taskStore.tasks}
            />
          }
        </Box>
        <TopPanel
          setIsPageOrOrderChanged={setIsPageOrOrderChanged}
          setVisible={setModal}
          setMode={setMode}
          order={order}
          setOrder={setOrder}
        />
        <Pagination
          sx={paginationStyles}
          color="primary"
          count={pagesCount}
          page={currentPage}
          onChange={(event, value) => {
            setCurrentPage(value);
            setIsPageOrOrderChanged(true);
          }}
        />
      </Box>
    </>
  );
});

export default TasksPage;