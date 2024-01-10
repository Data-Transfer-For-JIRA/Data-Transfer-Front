import { makeStyles } from '@material-ui/styles';
import { useState } from 'react';
import { PostCreateNewProjectJson, defaultPostJson, PostResponseCreatPorjectJira } from '../../Common/Types'
import BtnSubmit from '../Atoms/BtnSubmit';
import { SubmitHandler, useForm } from 'react-hook-form';

// import { checkJSON } from '../../Common/UtilFunction';
import { UsePostCreateJiraProject } from '../../Common/Axios';
import { ModalTypeList, ModalState } from '../../Common/Types';
import { Box, Grid } from '@mui/material';
import CreateProjectForm from '../Molecules/CreateProjectForm';
import ModalPopupMui from '../Molecules/ModalPopupMui';

type CreateProjectFormType = {
  projectFlag: string;
}
const useStyles = makeStyles(() => ({
  DataFieldBox: {
    width: "100%",
    padding: '10px',
    border: '1px dashed black'
  },
  textField: {
    marginTop: "15px !important",
  },
}));

export default function CreateJiraProject({ projectFlag }: CreateProjectFormType) {
  const classes = useStyles();
  const [modalState, setModaltState] = useState<ModalState>({
    isOpen: false,
    modalType: ModalTypeList.NoneState,
    postData: undefined,
    responseData: undefined
  });

  const [apiResponse, setApiResponse] = useState<PostResponseCreatPorjectJira>(
    { result: "", jiraProjectCode: "", jiraProjectName: "" });

  const { control, handleSubmit } = useForm<PostCreateNewProjectJson>({
    defaultValues: { ...defaultPostJson, essential: { ...defaultPostJson.essential, projectFlag: projectFlag } }
  });

  const handlePostForm: SubmitHandler<PostCreateNewProjectJson> = async (data) => {
    // 240109 : input이 다 채워지지 않아서 일단 보류.
    // const result = checkJSON(data);
    // if (result === 1) { alert('여기에 프로젝트 코드 공란이라고 경고창띄움'); }
    setModaltState({ isOpen: true, modalType: ModalTypeList.CreateInfo, postData: data, responseData: undefined });
    //Axios 전송
    setApiResponse(await UsePostCreateJiraProject(data));
    if (!apiResponse) {
      setModaltState({ isOpen: true, modalType: ModalTypeList.CreateInfo, responseData: apiResponse, postData: undefined });
    }

  }

  //결과에 따른 alert창 등장로직

  return (
    <form autoComplete="off" onSubmit={handleSubmit(handlePostForm)}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Box className={classes.DataFieldBox}>
            <CreateProjectForm control={control} />
          </Box>
        </Grid>
        <Grid item xs={8}>
          {/*여기에는 Jira에서 쓸 에디터를 추가할예정 */}
        </Grid>
      </Grid>
      <BtnSubmit style={{ width: "200px", marginTop: "10px" }}>프로젝트 생성</BtnSubmit>
      {modalState.isOpen === true ?
        (<ModalPopupMui
          isOpen={modalState.isOpen}
          modalType={modalState.modalType}
          postData={modalState.postData}
          responseData={modalState.responseData}
          handleModalState={setModaltState} />)
        : <></>}
    </form >
  )
}
