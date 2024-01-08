import { FormControl } from '@mui/base';
import { Box } from '@mui/system';
import MuiInputText from '../Atoms/MuiInputText';
import { Control } from 'react-hook-form/dist/types';
import { PostCreateNewProjectJson } from '../../Common/Types';

type CreateProjectFormType = {
  control: Control<PostCreateNewProjectJson>;
}

export default function CreateProjectForm({ control }: CreateProjectFormType) {
  const inputCommonStyle = { marginTop: '15px' };
  return (
    <Box>
      <FormControl style={inputCommonStyle}>
        <MuiInputText
          control={control}
          name="essential.projectFlag"
          textFieldProps={{
            label: "프로젝트 유형",
            disabled: true,
            size: "small",
            style: { width: '20%' },
            inputProps: {
              style: {
                width: '100%'
              }
            }
          }} />
      </FormControl>

      <FormControl style={inputCommonStyle}>
        <MuiInputText
          control={control}
          name="common.projectCode"
          textFieldProps={{
            label: "프로젝트 코드",
            size: "small",
            style: { width: '80%' },
            inputProps: {
              style: {
                width: '100%'
              }
            }
          }} />
      </FormControl>

      <FormControl style={inputCommonStyle}>
        <MuiInputText
          control={control}
          name="essential.projectName"
          rules={{ required: "프로젝트 이름은 필수 입력 값입니다." }}
          textFieldProps={{
            label: "프로젝트 이름",
            size: "small",
            style: { width: '100%' },
            inputProps: {
              style: {
                width: '100%'
              }
            }
          }} />
      </FormControl>
    </Box>
  );
}
