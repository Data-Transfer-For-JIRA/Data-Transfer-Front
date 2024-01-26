import { Grid, IconButton, InputBase, Paper, Button, Table, TableHead, TableRow, TableCell, TableBody, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import MuiDataMoreViewTable from '../Molecules/MuiDataMoreViewTable';
import MuiSearchInput from '../Atoms/MuiSerchInput';
import { GridRowType } from '../../Common/Types';


export default function LinkJiraProject() {
  const { state } = useLocation();
  const [mainJiraKey, setMainJiraKey] = useState();
  useEffect(() => { if (state !== null) { setMainJiraKey(state.jiraPorjectCode) } }, [state])

  const [subJiraKey, setSubJiraKey] = useState<string[]>([]);

  const [gridData, setGridData] = useState<GridRowType[]>([]);

  const handleDeleteSubProject = (target: number) => {
    setSubJiraKey((prev) => [...prev].filter((item, index) => index !== target))
  }

  const handleCallAxios = () => {
    console.log('hi')
  }
  return (
    <Grid container spacing={1} margin={"10px"}>
      <Grid item xs={8.8}>
        <Paper sx={{ width: '100%', height: '85vh' }} elevation={5}>
          <MuiSearchInput setGridData={setGridData} />
          <MuiDataMoreViewTable gridData={gridData} setSubJiraKey={setSubJiraKey} />
        </Paper>
      </Grid>
      <Grid item xs={3}>
        <Paper sx={{ width: '100%', height: '85vh' }} elevation={5}>
          <Box sx={{ width: "80%", margin: 'auto' }}>
            <InputBase
              sx={{
                flex: 1, width: '80%', border: '2px solid #ccc',
                borderRadius: '5px',
              }}
              placeholder=" 신규 프로젝트 검색"
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
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
  )
}
