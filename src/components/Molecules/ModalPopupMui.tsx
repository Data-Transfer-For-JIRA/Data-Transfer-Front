import { Box, Dialog, DialogContent, DialogTitle, Grid, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
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
      <Dialog open={isOpen} onClose={handleClose} fullScreen={false}>
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

//씨발 이건 진짜 처음보는 모습인데
function ShowCreateInfoCheck({ checkPostData }: { checkPostData: PostCreateNewProjectJson }) {
  const renderKeyValue = (obj: object) => {
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
                width: '50%'
              }}
              InputProps={{
                width: '50%'
              }}
            />
          </Box>
        );
      }
    });
  };
  return (
    <Paper elevation={3}>
      <Typography variant="h5" gutterBottom>입력된 데이터 확인</Typography>
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
              renderKeyValue(checkPostData)
            }
          </Box>
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
