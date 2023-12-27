import { makeStyles } from '@material-ui/styles';
import { Box, FormControl, Grid, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { PostCreateNewProjectJson, PostCreateNewMaintenance } from '../../Common/Types'
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
  const [postJson, setPostJson] = useState<PostCreateNewProjectJson | PostCreateNewMaintenance>({ projectFlag: projectFlag, projectName: "", projectCode: "" });

  const handleInputChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPostJson({ ...postJson, [name]: value })
  }

  const handlePostForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //유효성 검사

    //Axios 전송
    const result = await UsePostCreateJiraProject(postJson);

    //결과에 따른 alert창 등장로직
  }

  useEffect(() => {
    console.log(postJson)
  }, [postJson])
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
                name='projectFlag'
                label="타입"
                value={projectFlag}
                size="small"
                sx={{ width: "20%" }}
              />
              <TextField
                className={classes.textField}
                id="projectCode"
                name='projectCode'
                label="PMS 프로젝트 코드"
                size="small"
                sx={{ width: "80%" }}
                onChange={handleInputChanged}
              />
              <TextField
                className={classes.textField}
                id="projectName"
                name='projectName'
                label="Jira 프로젝트 이름"
                size="small"
                sx={{ width: "100%" }}
                onChange={handleInputChanged}
              />
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
