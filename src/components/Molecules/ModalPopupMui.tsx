import { Box, Dialog, DialogContent, DialogTitle, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { PostResponseCreatPorjectJira } from '../../Common/Types';

type TypeModalPopupMui = {
  responseData: PostResponseCreatPorjectJira | undefined;
}

export default function ModalPopupMui({ responseData }: TypeModalPopupMui) {
  const [open, setOpen] = useState(true);
  const handleClose = () => setOpen(false);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      {
        responseData === undefined ? (<LoadingModalContents />) : (<FormAlertModalContents responseData={responseData} />)
        // responseData === undefined ? (<FormAlertModalContents responseData={responseData} />) : (<FormAlertModalContents responseData={responseData} />)
      }
    </Dialog>
  )
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

function FormAlertModalContents({ responseData }: TypeModalPopupMui) {
  return (
    <Box>
      <DialogTitle id="alert-dialog-title">
        {responseData?.result}
      </DialogTitle>
      <DialogContent>
        <React.Fragment key={responseData?.jiraProjectCode}>
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
                  <TableCell align="left">{responseData?.jiraProjectCode}</TableCell>
                  <TableCell align="left">{responseData?.jiraProjectName}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </React.Fragment>
      </DialogContent>
    </Box>
  )
}

