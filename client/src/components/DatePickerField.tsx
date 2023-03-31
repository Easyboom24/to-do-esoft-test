import { FC } from "react";
import { Box, TextField, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";

interface DatePickerFieldProps {
  dateEnd: string;
  setDateEnd: (str: string) => void;
  disabled: boolean
}

const DatePickerField: FC<DatePickerFieldProps> = observer(({ dateEnd,disabled, setDateEnd }) => {
  return (
    <Box sx={{ m: 1 }}>
      <Typography fontSize={14} left={5} color="gray" position="relative">
        Дата окончания
      </Typography>
      <TextField
        disabled={disabled}
        type={"date"}
        sx={{ width: 400 }}
        value={dateEnd}
        onChange={(e) => {
          setDateEnd(e.target.value);
        }}
        size="small"
      />
    </Box>
  );
});

export default DatePickerField;
