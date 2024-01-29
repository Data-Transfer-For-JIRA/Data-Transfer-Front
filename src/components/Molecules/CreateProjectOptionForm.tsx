import { Box, FormControl } from '@mui/material';
import { Control } from 'react-hook-form';
import { contractStatus, inspectionCycle, projectProgressStep, USER } from '../../Common/SelectValue';
import { PostCreateNewProjectJson } from '../../Common/Types';
import MuiDatePicker from '../Atoms/MuiDatePicker';
import MuiInputText from '../Atoms/MuiInputText';
import MuiSelectBox from '../Atoms/MuiSelectBox';

type CreateProjectOptionFormType = {
  projectFlag: string,
  control: Control<PostCreateNewProjectJson>;
}
export default function CreateProjectOptionForm({ projectFlag, control }: CreateProjectOptionFormType) {
  return (
    <Box >
      {
        projectFlag === 'P' ? (< ProjectOptionForm control={control} />) : (<MaintainceOptionForm control={control} />)
      }
    </Box >
  );
}

function ProjectOptionForm({ control }: { control: Control<PostCreateNewProjectJson> }) {
  return (
    <Box sx={{ width: '100%', display: 'flex', flexFlow: 'wrap', rowGap: "15px", marginTop: '15px' }}>
      <FormControl style={{ width: '100%' }}>
        <MuiDatePicker
          control={control}
          name="selected.projectAssignmentDate"
          datePickerProps={{
            label: "프로젝트 배정일",
            format: 'YYYY-MM-DD',
            sx: { width: '100%' }
          }} />
      </FormControl>

      <FormControl style={{ width: '100%' }}>
        <MuiSelectBox
          control={control}
          name="selected.projectProgressStep"
          item={projectProgressStep}
          selectBoxProps={{
            label: "프로젝트 진행 단계",
            style: { width: '100%' },
            size: "small",
            inputProps: {
              style: {
                width: '100%',
              }
            }
          }}
        />
      </FormControl>
    </Box>
  )
}

function MaintainceOptionForm({ control }: { control: Control<PostCreateNewProjectJson> }) {
  return (
    <Box sx={{ width: '100%', display: 'flex', flexFlow: 'wrap', rowGap: "15px", marginTop: '15px' }}>
      <FormControl style={{ width: '100%' }}>
        <MuiSelectBox
          control={control}
          name="selected.contractStatus"
          item={contractStatus}
          selectBoxProps={{
            label: "계약여부",
            style: { width: '100%' },
            size: "small",
            inputProps: {
              style: {
                width: '100%',
              }
            }
          }}
        />
      </FormControl>
      <FormControl style={{ width: '100%' }}>
        <MuiDatePicker
          control={control}
          name="selected.maintenanceStartDate"
          rules={{}}
          datePickerProps={{
            label: "유지보수 시작일",
            format: 'YYYY-MM-DD',
            sx: { width: '100%' }
          }} />
      </FormControl>

      <FormControl style={{ width: '100%' }}>
        <MuiDatePicker
          control={control}
          name="selected.maintenanceEndDate"
          datePickerProps={{
            label: "유지보수 종료일",
            format: 'YYYY-MM-DD',
            sx: { width: '100%' }
          }} />
      </FormControl>

      <FormControl style={{ width: '100%' }}>
        <MuiSelectBox
          control={control}
          name="selected.inspectionCycle"
          item={inspectionCycle}
          selectBoxProps={{
            label: "점검 주기",
            style: { width: '100%' },
            size: "small",
            inputProps: {
              style: {
                width: '100%',
              }
            }
          }}
        />
      </FormControl>

      <FormControl style={{ width: '100%' }}>
        <MuiSelectBox
          control={control}
          name="selected.inspectionMethod"
          item={contractStatus}
          selectBoxProps={{
            label: "점검 방법",
            style: { width: '100%' },
            size: "small",
            inputProps: {
              style: {
                width: '100%',
              }
            }
          }}
        />
      </FormControl>

      <FormControl style={{ width: '100%' }}>
        <MuiInputText
          control={control}
          name="selected.inspectionMethodEtc"
          textFieldProps={{
            label: "점검 방법(기타)",
            size: "small",
            multiline: true,
            style: { width: '100%' },
            inputProps: {
              style: {
                width: '100%', margin: 0
              }
            }
          }} />
      </FormControl>
    </Box>

  )
}
