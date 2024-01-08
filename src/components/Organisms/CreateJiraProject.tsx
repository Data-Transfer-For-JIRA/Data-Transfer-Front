import { makeStyles } from '@material-ui/styles';
import { Box, Grid } from '@mui/material';
import { useState } from 'react';
import { PostCreateNewProjectJson, defaultPostJson } from '../../Common/Types'
import BtnSubmit from '../Atoms/BtnSubmit';
import ModalPopupMui from '../Molecules/ModalPopupMui';
import { SubmitHandler, useForm } from 'react-hook-form';

import './CreateJiraProject.css'
import CreateProjectForm from '../Molecules/CreateProjectForm';

type CreateProjectFormType = {
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

export default function CreateJiraProject({ projectFlag }: CreateProjectFormType) {
  const classes = useStyles();
  const [modalOpen, setModalOpen] = useState(false);
  const [apiResponse, setApiResponse] = useState<PostResponseCreatPorjectJira | undefined>();

  const { control, handleSubmit } = useForm<PostCreateNewProjectJson>({
    defaultValues: { ...defaultPostJson, essential: { ...defaultPostJson.essential, projectFlag: projectFlag } }
  });
  const handlePostForm: SubmitHandler<PostCreateNewProjectJson> = (data) => {
    console.log(data);
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit(handlePostForm)}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Box className={classes.CommonBox}>
            <CreateProjectForm control={control} />
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
