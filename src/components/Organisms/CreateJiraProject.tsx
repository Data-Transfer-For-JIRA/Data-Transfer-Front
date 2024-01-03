import { makeStyles } from '@material-ui/styles';
import { Box, FormControl, Grid, Select, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { PostCreateNewProjectJson, defaultPostJson } from '../../Common/Types'
import { checkJSON } from '../../Common/UtilFunction';
import BtnSubmit from '../Atoms/BtnSubmit';
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
  textField: {
    marginTop: "15px !important",
  }
}));

export default function CreateJiraProject({ projectFlag }: Type) {
  const classes = useStyles();
  const [postJson, setPostJson] = useState<PostCreateNewProjectJson>(
    { ...defaultPostJson, essential: { ...defaultPostJson.essential, projectFlag: projectFlag } });

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

  const handlePostForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //유효성 검사
    let result = checkJSON(postJson);
    if (result === 1) { alert('여기 빈칸 에러 창띄움'); }
    else if (result === 2) { alert('여기에 프로젝트 코드 공란이라고 경고창띄움') }
    alert(JSON.stringify(postJson));
    //Axios 전송
    result = await UsePostCreateJiraProject(postJson);

    //결과에 따른 alert창 등장로직
  }

  return (
    <form noValidate autoComplete="off" onSubmit={handlePostForm}>
      <FormControl>
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
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={postJson.common.assignee}
                label="Age"
                onChange={handleInputChanged}
              ></Select>

            </Box>
          </Grid>
          <Grid item xs={8}>

          </Grid>
        </Grid>
        <BtnSubmit style={{ width: "200px", marginTop: "10px" }}>프로젝트 생성</BtnSubmit>
      </FormControl>

    </form >
  )
}
