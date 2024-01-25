import { Box, IconButton, InputBase } from '@mui/material';
import { GridSearchIcon } from '@mui/x-data-grid';
import { ChangeEventHandler, useState } from 'react';
import { UseGetAxiosSearcJiraList } from '../../Common/Axios';
import { GridRowType } from '../../Common/Types';

type MuiSearchInputType = {
  setGridData: React.Dispatch<React.SetStateAction<GridRowType[]>>
}
export default function MuiSearchInput({ setGridData }: MuiSearchInputType) {
  const [searhKeyword, setSearchKeyword] = useState<string>("");

  const handleSearchBtn = async () => {
    //AXIOS 하고 SET 하는 로직 작성
    const result = await UseGetAxiosSearcJiraList(searhKeyword);
    console.log(result);
    if (result !== undefined) { setGridData(result); }
  }
  const handleChangeKeyword = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setSearchKeyword(event.target.value);
  }

  return (
    <Box sx={{ width: "95%", margin: 'auto' }}>
      <InputBase
        sx={{ flex: 1, width: '95%', height: "100%", border: '2px solid #ccc', borderRadius: '5px', }}
        placeholder="연결 프로젝트 선택"
        type={'text'}
        value={searhKeyword}
        onChange={(event) => handleChangeKeyword(event)}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleSearchBtn}>
        <GridSearchIcon />
      </IconButton>
    </Box>
  )
}


