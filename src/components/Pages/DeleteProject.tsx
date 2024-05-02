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
  const handleTargetProject = (targetList)=>{
    setSearchResult(targetList);
  }
  const handleTargetDelete = ()=>{

  }

  useEffect(()=>{
    if(searchResult.length <1){
      async function getDefaultsApi(){
        const result = await UseGetAxiosSearcJiraList("");
        return result;
      }
      const result = getDefaultsApi();
      if(result!==undefined) handleTargetProject(result);
    }
  },[targetProject,searchResult]);

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
