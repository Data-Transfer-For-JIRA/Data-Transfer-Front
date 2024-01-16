import { Box, Button, Dialog, DialogContent, DialogTitle, Grid, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { ReactNode } from 'react';
import { UsePostCreateJiraProject } from '../../Common/Axios';
import { ModalTypeList, PostCreateNewProjectJson, PostResponseCreatPorjectJira } from '../../Common/Types';
import { useModalState } from '../Context/ModalContentsProvider';


export default function MuiModalPopup() {
  const { state } = useModalState();

  return (
    <ModalBase modalOpen={state.isOpen}>
      {state.modalType === ModalTypeList.CreateInfo && (<ShowCreateInfoCheck checkPostData={state.postData} />)}
      {state.modalType === ModalTypeList.Loading && (<LoadingModalContents />)}
      {state.modalType === ModalTypeList.CreateResultSuccess && (<FormAlertModalContents responseData={state.responseData} />)}
      {state.modalType === ModalTypeList.ErrApiCall && (<Typography variant="h5" gutterBottom>통신실패</Typography>)}
    </ModalBase>
  )
}


type ModalBaseType = {
  children: ReactNode;
  modalOpen: boolean;
}
function ModalBase({ children, modalOpen }: ModalBaseType) {
  return (
    <Dialog open={modalOpen} sx={{ p: 3 }}>
      {children}
    </Dialog>
  )
}



function ShowCreateInfoCheck({ checkPostData }: { checkPostData?: PostCreateNewProjectJson }) {
  const { modalDispatch } = useModalState();
  const renderKeyValue = (obj: PostCreateNewProjectJson) => {
    return Object.entries(obj).map(([key, value]) => {
      if (typeof value === 'object') {
        // 객체인 경우 재귀 호출
        return (
          <Box key={key}>
            {renderKeyValue(value)}
          </Box>
        );
      } else {
        // 값인 경우 그대로 렌더링
        return (
          <Box key={key} sx={{ marginTop: '15px' }}>
            <TextField
              disabled
              value={value === "" ? "설정안함" : value}
              style={{ width: '50%' }}
              size="small"
              label={key}
              InputLabelProps={{
                color: 'success',
              }}
              InputProps={{

              }}
            />
          </Box>
        );
      }
    });
  };
  if (checkPostData !== undefined) {
    const handleConfirm = async () => {
      modalDispatch({ type: 'LOADING' })

      const result = await UsePostCreateJiraProject(checkPostData);
      if (result !== undefined) {
        modalDispatch({ type: 'RESULT_CREATE_SUCCESS', result: result })
      }
      else {
        modalDispatch({ type: 'ERR_API_CALL' });
      }

    }
    return (
      <Paper elevation={3}>
        <Typography variant="h5" gutterBottom>입력된 데이터 확인</Typography>
        <Button variant="contained" color='primary' onClick={handleConfirm}>확인완료</Button>
        <Button variant="contained" color='error' onClick={() => modalDispatch({ type: 'NONE_STATE' })} >취소</Button>
        <Grid container style={{ width: '100%' }}>
          <Grid item xs={6}>
            <Box sx={{ width: '100%', display: 'flex', flexFlow: 'wrap' }}>
              {
                renderKeyValue(checkPostData)
              }
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ width: '100%', display: 'flex', flexFlow: 'wrap' }}>
              {

              }
            </Box>
          </Grid>
        </Grid>
      </Paper>
    );
  }
  else {
    return <></>;
  }
}

function LoadingModalContents() {
  return (
    <Box>
      <DialogTitle id="alert-dialog-title">
        {"프로젝트 생성 중 입니다."}
      </DialogTitle>
      <DialogContent>
        <LinearProgress sx={{ display: 'flex', margin: 'auto' }} />
      </DialogContent>
    </Box>
  )
}


function FormAlertModalContents({ responseData }: { responseData?: PostResponseCreatPorjectJira }) {
  if (responseData !== undefined) {
    // const jiraProjectURL = `https://markany.atlassian.net/jira/core/projects/${responseData.jiraProjectCode}/board`;
    return (
      <Box>
        <DialogTitle id="alert-dialog-title">
          {responseData.result}
        </DialogTitle>
        <DialogContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left">지라 프로젝트 코드</TableCell>
                  <TableCell align="left">지라 프로젝트명</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="left">{responseData.jiraProjectCode}</TableCell>
                  <TableCell align="left">{responseData.jiraProjectName}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
      </Box>
    )
  } else {
    return <></>
  }
}
