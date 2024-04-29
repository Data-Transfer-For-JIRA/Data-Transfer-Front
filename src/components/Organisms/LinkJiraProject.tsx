import { Grid, IconButton, Paper, Button, Table, TableHead, TableRow, TableCell, TableBody, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'
import ClearIcon from '@mui/icons-material/Clear';
import MuiDataMoreViewTable from '../Molecules/MuiDataMoreViewTable';
import MuiSearchInput from '../Atoms/MuiSerchInput';
import * as Types from '../../Common/Types';
import { useModalState } from '../Context/ModalContentsProvider';
import MuiModalPopup from '../Molecules/MuiModalPopup';
import SearchMainProjectKey from '../Molecules/SearchMainProjectKey';


export default function LinkJiraProject() {
  const location = useLocation();
  const [mainJiraKey, setMainJiraKey] = useState("");
  useEffect(() => { if (location.state !== null) { setMainJiraKey(location.state.jiraPorjectCode) } }, [location.state])

  const [subJiraKey, setSubJiraKey] = useState<string[]>([]);
  const [gridData, setGridData] = useState<Types.GridRowType[]>([]);

  const handleDeleteSubProject = (target: number) => {
    setSubJiraKey((prev) => [...prev].filter((_item, index) => index !== target))
  }

  const { state, modalDispatch } = useModalState();

  const handleCallAxios = () => {
    if (mainJiraKey === "" || mainJiraKey === undefined) {
      alert('Not Selected MainJiraKey')
      return;
    }
    if (subJiraKey.length < 1) {
      alert('Not Selected SubJiraKey')
      return;
    }
    modalDispatch({ type: 'LINK_INFO_CHECK', putLinkData: { mainJiraKey: mainJiraKey, subJiraKey: subJiraKey } })
  }
  const handleJiraMainKey = (searchKeyword : string)=>{
    setMainJiraKey(searchKeyword);
  }
  return (
    <Box>
      <Grid container spacing={1} marginLeft={"px"}>
        <Grid item xs={9}>
          <Paper sx={{ width: '100%', height: '90vh' }} elevation={5}>
            <MuiSearchInput setGridData={setGridData} />
            <MuiDataMoreViewTable gridData={gridData} setSubJiraKey={setSubJiraKey} />
          </Paper>
        </Grid>
        {/* 신규 프로젝트 검색 컴포넌트 */}
        <Grid item xs={3}>
          <Paper sx={{ width: '100%', height: '90vh' }} elevation={5}>
            <Box sx={{ width: "80%", margin: 'auto', paddingTop : '20px' }}>
              <SearchMainProjectKey handleJiraMainKey={handleJiraMainKey}/>
              <p style={{ marginLeft: "2" }}>신규 프로젝트: {mainJiraKey === null ? "" : mainJiraKey}</p>
            </Box>
            <Box sx={{ marginTop: '30px' }}>
              <Typography variant="h6">연결대상 리스트</Typography>
              <Box sx={{ minHeight: '450px' }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">Jira 코드</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {subJiraKey.map((item, index) => (
                      <TableRow key={`${item}${index}`} sx={{ width: '100%' }}>
                        <TableCell sx={{ display: "flex" }}>
                          <p style={{ width: '90%', alignSelf: "center" }}>{item}</p>
                          <IconButton type='button' sx={{ width: '10%' }} onClick={() => handleDeleteSubProject(index)}><ClearIcon /></IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
              <Button
                variant="contained"
                color='primary'
                sx={{ marginTop: '20px', marginLeft: "80%" }}
                onClick={handleCallAxios}>연결</Button>
            </Box>
          </Paper>
        </Grid>

      </Grid >
      {state.isOpen === true && (<MuiModalPopup />)}
    </Box>
  )
}



