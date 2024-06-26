import { Box, IconButton, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { UseGetAxiosSearcJiraList } from '../../Common/Axios';

type SearchMainProjectKeyType = {
  handleJiraMainKey : (jiraMainKey:string)=>void
}
export default function SearchMainProjectKey({handleJiraMainKey}:SearchMainProjectKeyType){
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const handleOnChangedInput = (event :React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> )=>{
    setSearchKeyword(event.target.value);
  }
  const getMatchList = async ()=>{
    const result = await UseGetAxiosSearcJiraList(searchKeyword);
    if(result !==undefined&&result[0].key===searchKeyword){
      handleJiraMainKey(searchKeyword);
  }
  else {
    alert('검색어는 Jira 프로젝트 코드만 가능합니다.')
  }
 }
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement> )=>{
    if (event.key === 'Enter') {
      getMatchList();
    }
  }
  const handleSearchBtn = ()=>{
    getMatchList();
  }

  return (
    <Box>
      <InputBase
          sx={{flex: 1, width: '80%', border: '2px solid #ccc',borderRadius: '5px',}}
          type = {'text'}
          value = {searchKeyword}
          onChange = {handleOnChangedInput}
          onKeyDown = {handleKeyDown}
          placeholder=" 신규 프로젝트 검색"
        />
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick = {handleSearchBtn}>
          <SearchIcon />
        </IconButton> 
    </Box>
  )
}
