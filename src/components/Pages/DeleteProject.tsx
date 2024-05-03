import { useEffect, useState } from 'react';
import { Grid,Box, Paper } from '@mui/material';
import MuiControlledTextInput from '../Atoms/MuiControlledTextInput';
import { UseGetAxiosSearcJiraList } from '../../Common/Axios';
import { GridRowType } from '../../Common/Types';
import MuiDataMoreViewTable from '../Molecules/MuiDataMoreViewTable';
import SecondaryTextList from '../Atoms/SecondaryTextList';

export default function DeleteProject(){
  const [searchResult, setSearchResult] = useState<GridRowType[]>([]);
  const [targetProject, setTargetProject] = useState<string[]>([]);
  const handleTargetProject = (targetList:GridRowType[])=>{
    setSearchResult(targetList);
  }
  const handleTargetDelete = ()=>{

  }

  useEffect(()=>{
    const requestDefaultApi = async ()=>{
      const result = await UseGetAxiosSearcJiraList("");
      if(result){
        handleTargetProject(result);
      }
    }
    if(searchResult.length <1){
      requestDefaultApi();
    } 
  },[]);

  return (
    <Box sx={{ height : '100%' }}>
      <Paper sx={{ height : '100%' }}>
      <Grid container >
        <Grid item xs={9}>
            <MuiControlledTextInput handleSearchResult={handleTargetProject} requestSearchApi={UseGetAxiosSearcJiraList}/>
            <MuiDataMoreViewTable gridData={searchResult} setSubJiraKey={setTargetProject}/>      
        </Grid>
        <Grid item xs={3}>
          <SecondaryTextList/>      
        </Grid> 
      </Grid>
      </Paper>
    </Box>
  )
}
