import { FC } from "react";
import { Box, TextField } from "@mui/material";
import { observer } from "mobx-react-lite";


interface TextAreaProps {
    description: string,
    setDescription: (str:string) => void,
    disabled: boolean
}
 
const TextArea: FC<TextAreaProps> = observer(({description,disabled, setDescription}) => {
    return ( 
        <Box sx={{ m: 1 }}>
        <TextField
          disabled={disabled}
          value={description}
          onChange={e => setDescription(e.target.value)}
          size="small"
          sx={{ width: 400 }}
          multiline
          minRows={5}
          maxRows={5}
          label="Описание"
        />
      </Box>
     );
})
 
export default TextArea;