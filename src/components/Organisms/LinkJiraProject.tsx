import { Grid, IconButton, InputBase, Paper, Button, Table, TableHead, TableRow, TableCell, TableBody, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search';
import MuiSelectedTable from '../Atoms/MuiSelectedTable';
import MuiNomalTable from '../Atoms/MuiNomalTable';

export default function LinkJiraProject() {
  const { state } = useLocation();
  const [mainJiraKey, setMainJiraKey] = useState();
  const [subJiraKey, setSubJiraKey] = useState<string>("");

  useEffect(() => { if (state !== null) { setMainJiraKey(state.jiraPorjectCode) } }, [state])
  const handleBtnOnClick = () => {

  }
  return (
    <Grid container spacing={1} margin={"10px"}>
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
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left">PMS 코드</TableCell>
                  <TableCell align="left">담당자</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="left">{subJiraKey}</TableCell>
                  <TableCell align="left">{'엄준식'}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={8.8}>
        <Paper sx={{ width: '100%', height: '85vh' }} elevation={5}>
          <Box sx={{ width: "95%", margin: 'auto' }}>
            <InputBase
              sx={{ flex: 1, width: '95%', height: "100%" }}
              placeholder="연결 프로젝트 선택"
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
            <p style={{ marginLeft: "2" }}>대상 프로젝트: {subJiraKey === null ? "" : subJiraKey}</p>
          </Box>
          <Box sx={{ width: "100%", marginTop: '30px' }}>
            <MuiSelectedTable setSubJiraKey={setSubJiraKey} />
          </Box>
          <Box sx={{ width: '100%', margin: "auto", marginTop: '30px' }}>
            <p>추가정보</p>
            <MuiNomalTable subJiraKey={subJiraKey} />
          </Box>
          <Button variant="contained"
            color='primary'
            sx={{ marginTop: '10px', marginLeft: "95%" }}
            onClick={handleBtnOnClick}>선택</Button>
        </Paper>
      </Grid>
    </Grid >
  )
}
