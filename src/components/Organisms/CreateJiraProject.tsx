import { makeStyles } from '@material-ui/styles';
import { Box, FormControl, Grid, Select, TextField, InputLabel, SelectChangeEvent, MenuItem } from '@mui/material';
import { useState } from 'react';
import { UsePostCreateJiraProject } from '../../Common/Axios';
import { PostCreateNewProjectJson, defaultPostJson, PostResponseCreatPorjectJira } from '../../Common/Types'
import { USER } from '../../Common/User';
import { checkJSON } from '../../Common/UtilFunction';
import BtnSubmit from '../Atoms/BtnSubmit';
import ModalPopupMui from '../Molecules/ModalPopupMui';
import './CreateJiraProject.css'
type Type = {
  projectFlag: string;
}

const useStyles = makeStyles(() => ({
  EssentialBox: {
    width: "100%",
    marginTop: "20px",
    border: '1px dashed black'
  },
  CommonBox: {
    width: "100%",
    marginTop: "10px",
    border: '1px dashed black'
  },
  textField: {
    marginTop: "15px !important",
  },
}));

export default function CreateJiraProject({ projectFlag }: Type) {
  const classes = useStyles();
  const [modalOpen, setModalOpen] = useState(false);
  const [postJson, setPostJson] = useState<PostCreateNewProjectJson>(
    { ...defaultPostJson, essential: { ...defaultPostJson.essential, projectFlag: projectFlag } });
  const [apiResponse, setApiResponse] = useState<PostResponseCreatPorjectJira | undefined>();

  const handleInputChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const [subkey, key] = name.split('.');
    if (subkey === 'essential') {
      setPostJson((prev) => {
        return { ...prev, essential: { ...prev.essential, [key]: value } };
      })
    }
    else if (subkey === 'common') {
      setPostJson((prev) => {
        return { ...prev, common: { ...prev.common, [key]: value } }
      })
    }
    else if (subkey === 'selected') {
      setPostJson((prev) => {
        return { ...prev, selected: { ...prev.selected, [key]: value } }
      })
    }
  }

  const handleSelectChanged = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    const [subkey, key] = name.split('.');
    if (subkey === 'common') {
      setPostJson((prev) => {
        return { ...prev, common: { ...prev.common, [key]: value } }
      })
    }
    else if (subkey === 'selected') {
      setPostJson((prev) => {
        return { ...prev, selected: { ...prev.selected, [key]: value } }
      })
    }
  }

  const handlePostForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = checkJSON(postJson);
    if (result === 1) {
      alert('여기 빈칸 에러 창띄움');
      return;
    }
    else if (result === 2) { alert('여기에 프로젝트 코드 공란이라고 경고창띄움'); }
    setModalOpen(true);
    //Axios 전송
    setApiResponse(await UsePostCreateJiraProject(postJson));

    //결과에 따른 alert창 등장로직
  }

  return (
    <form noValidate autoComplete="off" onSubmit={handlePostForm}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Box className={classes.EssentialBox}>
            <TextField
              className={classes.textField}
              disabled
              id="projectFlag"
              name='essential.projectFlag'
              label="타입"
              value={projectFlag}
              size="small"
              sx={{ width: "20%" }}
            />
            <TextField
              className={classes.textField}
              id="projectCode"
              name='common.projectCode'
              label="PMS 프로젝트 코드"
              size="small"
              sx={{ width: "80%" }}
              onChange={handleInputChanged}
            />
            <TextField
              className={classes.textField}
              id="projectName"
              name='essential.projectName'
              label="Jira 프로젝트 이름"
              size="small"
              sx={{ width: "100%" }}
              inputProps={{
                style: {
                  // backgroundColor: 'red',
                  // width: "130px"
                }
              }}
              onChange={handleInputChanged}
            />
          </Box>
          <Box className={classes.CommonBox}>
            <FormControl sx={{ width: "50%" }}>
              <InputLabel id="select-assignee-label">담당자</InputLabel>
              <Select
                labelId="select-assignee-label"
                name='common.assignee'
                value={postJson.common.assignee}
                label="select-assignee-label"
                onChange={handleSelectChanged}
              >
                {
                  USER.Engineer.map((item, index) => (
                    <MenuItem value={item} key={index}>{item}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
            <FormControl sx={{ width: "50%" }}>
              <InputLabel id="select-subAssignee-label">부 담당자</InputLabel>
              <Select
                labelId="select-subAssignee-label"
                name='common.subAssignee'
                value={postJson.common.subAssignee}
                label="select-subAssignee-label"
                onChange={handleSelectChanged}
              >
                {
                  USER.Engineer.map((item, index) => (
                    <MenuItem value={item} key={index}>{item}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={8}>

        </Grid>
      </Grid>
      <BtnSubmit style={{ width: "200px", marginTop: "10px" }}>프로젝트 생성</BtnSubmit>
      {modalOpen === true ? (<ModalPopupMui responseData={apiResponse} />) : ""}
    </form >
  )
}
