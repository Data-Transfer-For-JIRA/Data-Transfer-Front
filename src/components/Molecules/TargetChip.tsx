import { Box, Button } from '@mui/material';
import { useEffect } from 'react';
import { SelectedProjectType } from '../../Common/Types';
import SecondaryTextList from '../Atoms/SecondaryTextList';

type TargetChipType<T> = {
  itemList : SelectedProjectType[]
  handleTargetDelete : (deleteCode : string)=>void
  requestApiFunction : (deleteCode:string[])=>Promise<T>
}
export default function TargetChip<T>({itemList,handleTargetDelete, requestApiFunction}:TargetChipType<T> ){
  useEffect(()=>{
  },[])
  return (
    <Box sx={{height :'100%' ,padding :'5px',paddingTop:'30px' , display : 'flex'}}>
      <Box sx={{width : '100%', height :'100%'}} style={{ overflowY:'scroll'}}>
      <Button
        variant="contained"
        color='primary'
        onClick={()=>requestApiFunction}
        sx={{float : 'right'}}
      >삭제
      </Button >
        <SecondaryTextList itemList={itemList} handleTargetDelete={handleTargetDelete}/>
      </Box>
    </Box>
  )
}
