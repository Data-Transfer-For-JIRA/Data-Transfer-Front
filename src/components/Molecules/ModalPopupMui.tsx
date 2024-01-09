// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Box, Dialog, DialogContent, DialogTitle, Grid, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import { ModalState, PostCreateNewProjectJson, PostResponseCreatPorjectJira } from '../../Common/Types';

interface handleModalType {
  handleModalState: React.Dispatch<React.SetStateAction<ModalState>>;
}
type TypeModalPopupMui = ModalState & handleModalType;
export default function ModalPopupMui({ isOpen, modalType, postData, responseData, handleModalState }: TypeModalPopupMui) {
  const handleClose = () => handleModalState((prev: ModalState) => {
    return { ...prev, isOpen: false }
  });

  if (postData === undefined && responseData === undefined) {
    return (
      <Dialog open={isOpen} onClose={handleClose}>
        <LoadingModalContents />
      </Dialog>
    )
  }

  if (postData !== undefined && responseData === undefined) {
    return (
      <Dialog open={isOpen} onClose={handleClose}>
        <ShowCreateInfoCheck checkPostData={postData} />
      </Dialog>
    );
  }

  if (postData === undefined && responseData !== undefined) {
    return (
      <Dialog open={isOpen} onClose={handleClose}>
        <FormAlertModalContents responseData={responseData} />
      </Dialog>
    );
  }

  return (
    <></>
  )
}


function ShowCreateInfoCheck2({ checkPostData }: { checkPostData: PostCreateNewProjectJson }) {
  return (
    <Paper elevation={3} style={{ padding: 20, margin: 20 }}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <TextField
            disabled
            value={checkPostData.essential.projectFlag}
          />
        </Grid>
        <Grid item xs={8}>

        </Grid>
      </Grid>
    </Paper>
  );
}
//씨발 이건 진짜 처음보는 모습인데
function ShowCreateInfoCheck({ checkPostData }: { checkPostData: PostCreateNewProjectJson }) {
  return (
    <Paper elevation={3} style={{ padding: 20, margin: 20 }}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <TextField
            disabled
            value={checkPostData.essential.projectFlag}
          />
        </Grid>
        <Grid item xs={8}>
          {/* 추가적인 컴포넌트 또는 내용을 넣으세요 */}
        </Grid>
      </Grid>
    </Paper>
  );
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


function FormAlertModalContents({ responseData }: { responseData: PostResponseCreatPorjectJira }) {
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
                <TableCell align="left">지라프로젝트 코드</TableCell>
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
}
