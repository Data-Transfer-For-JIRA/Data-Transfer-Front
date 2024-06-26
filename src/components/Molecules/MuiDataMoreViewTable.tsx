import { Box, Button } from '@mui/material';
import { useState } from 'react';
import { defaultGridData, GridRowType } from '../../Common/Types';
import MuiNomalTable from '../Atoms/MuiNomalTable';
import MuiSelectedTable from '../Atoms/MuiSelectedTable';

type MuiDataMoreViewTableType = {
  gridData: GridRowType[]
  setSubJiraKey: React.Dispatch<React.SetStateAction<string[]>>
}
export default function MuiDataMoreViewTable({ gridData, setSubJiraKey }: MuiDataMoreViewTableType) {
  const [girdSelected, setGirdSelected] = useState<GridRowType>(defaultGridData);

  const handleOnClickSetSubKey = () => {
    if (girdSelected.key !== "") {
      const jiraCode = girdSelected.key;
      setSubJiraKey((prev) => {
        if (!prev.includes(jiraCode)) return [...prev, jiraCode]
        else { return prev }
      });
      setGirdSelected(defaultGridData);
    }
  }
  return (
    <Box>
      <Box sx={{ width: "95%", marginTop: '25px', minHeight: '520px', margin: 'auto', maxHeight: '65vh', overflow: 'auto'}}>
        <MuiSelectedTable setSubJiraKey={setGirdSelected} gridData={gridData} />
      </Box>
      <Button variant="contained"
        color='primary'
        sx={{ marginTop: '10px', marginLeft: "90%" }}
        onClick={handleOnClickSetSubKey}>선택</Button>
      <Box sx={{ width: '100%', margin: "auto" }}>
        <p style={{paddingLeft: '20px'}}>추가정보</p>
        <MuiNomalTable girdSelected={girdSelected} />
      </Box>
    </Box>
  )
}
