import { FC, useContext } from "react";
import { Box, Button } from "@mui/material";
import { OrderTasks } from "../types/types";
import { Context } from "..";
import { createButtonStyles, groupOrderButtonsStyles, topPanelStyles } from "../styles/CustomStyles";
import { observer } from "mobx-react-lite";

interface TopPanelProps {
  setIsPageOrOrderChanged: (bool:boolean) => void
  setVisible: (bool: boolean) => void;
  setOrder: (order: OrderTasks) => void;
  order: string | undefined;
  setMode: (str:'create'|'update') => void;
}

const TopPanel: FC<TopPanelProps> = observer((prors) => {
  const { setIsPageOrOrderChanged,setVisible, setOrder, order, setMode } = prors;
  const { userStore } = useContext(Context);
  return (
    <Box height={"70px"} sx={topPanelStyles}>
      <Box sx={groupOrderButtonsStyles}>
        <Button
          variant="outlined"
          disabled={order === "updated_at"}
          onClick={() => {
            setIsPageOrOrderChanged(true);
            setOrder("updated_at")
          }}
        >
          Без группировки
        </Button>
        <Button
          variant="outlined"
          disabled={order === "date_end"}
          onClick={() => {
            setIsPageOrOrderChanged(true);
            setOrder("date_end");
          }}
        >
          По дате окончания
        </Button>
        {userStore.user.isLead && (
          <Button
            variant="outlined"
            disabled={order === "responsible_id"}
            onClick={() => {
              setIsPageOrOrderChanged(true);
              setOrder("responsible_id");
            }}
          >
            По ответственным
          </Button>
        )}
      </Box>
      <Box sx={createButtonStyles}>
        <Button variant="outlined" onClick={() => {
          setVisible(true)
          setMode('create')
          }}>Новая задача</Button>
      </Box>
    </Box>
  );
});

export default TopPanel;
