import { Box, Button } from '@mui/material';
import { useEffect } from 'react';
import { SelectedProjectType } from '../../Common/Types';
import SecondaryTextList from '../Atoms/SecondaryTextList';

type TargetChipType = {
  itemList : SelectedProjectType[]
  handleTargetDelete : (deleteCode : string)=>void
}
export default function TargetChip({itemList,handleTargetDelete}:TargetChipType){
  useEffect(()=>{
  },[])
  return (
    <Box sx={{height :'100%' ,padding :'5px',paddingTop:'30px' , display : 'flex'}}>
      <Box sx={{height :'100%'}} style={{ overflowY:'scroll'}}>
      <Button
        variant="contained"
        color='primary'
        sx={{float : 'right'}}
      >삭제
      </Button >
        <SecondaryTextList itemList={itemList} handleTargetDelete={handleTargetDelete}/>
      </Box>
    </Box>
  )
}
