import { Grid,Box } from '@mui/material';
import { useState } from 'react';
import MuiControlledTextInput from '../Atoms/MuiControlledTextInput';
import { UseGetAxiosSearcJiraList } from '../../Common/Axios';
import { GridRowType } from '../../Common/Types';

export default function DeleteProject(){
  const [targetProject, setTargetProject] = useState<GridRowType[]>();
  const handleDeleteTarget = (targetList:GridRowType[])=>{
    setTargetProject(targetList);
  }

  return (
    <Box sx={{ height : '80%' }}>
      <Box>
        <Grid container>
          <Grid item xs={8}>
              <MuiControlledTextInput handleSearchResult={handleDeleteTarget} requestSearchApi={UseGetAxiosSearcJiraList}/>
          </Grid>
          <Grid item xs={4}>
              4
          </Grid>
        </Grid>
      </Box>
      <Box>
        hi
      </Box>
    </Box>
  )
}
