import { FC } from "react";
import { ResponsibleUser } from "../types/types";
import AsyncSelect from 'react-select/async';
import { Box, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";



interface AsyncSelectResponsibleProps {
    selectedResponsible: ResponsibleUser | undefined,
    getResponsibleList: (str:string) => Promise<ResponsibleUser[]> | undefined,
    setInputValueResponsible:(str:string) => void,
    setSelectedResponsible: (res:ResponsibleUser) => void,
    disabled: boolean
}
 
const AsyncSelectResponsible: FC<AsyncSelectResponsibleProps> = observer((props) => {
    const {
        disabled,
        selectedResponsible,
        getResponsibleList,
        setInputValueResponsible,
        setSelectedResponsible } = props;
    return (   <Box sx={{ m: 1 }}>
        <Typography fontSize={14} left={5} color='gray' position='relative'>Ответственный</Typography>
          <AsyncSelect
          isDisabled={disabled}
          cacheOptions 
          defaultOptions
          isClearable
          value={selectedResponsible}
          getOptionLabel={e => e.surname + ' ' + e.firstname + ' ' + e.patronymic}
          getOptionValue={e => e.id.toString()}
          loadOptions={getResponsibleList}
          onInputChange={value => setInputValueResponsible(value)}
          onChange={e => {setSelectedResponsible(e as ResponsibleUser)}}
           />
        </Box> );
})
 
export default AsyncSelectResponsible;