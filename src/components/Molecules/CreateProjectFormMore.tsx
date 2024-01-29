import { Box } from '@mui/system';
import { Control } from 'react-hook-form/dist/types';
import { PostCreateNewProjectJson } from '../../Common/Types';
import MuiSelectBox from '../Atoms/MuiSelectBox';
import { MULTIOSSUPPORT, PRINTSUPPORTRANGE, PRODUCT } from '../../Common/SelectValue';
import MuiMultiSelected from '../Atoms/MuiMultiSelected';
import { Typography } from '@mui/material';


type CreateProjectFormType = {
  control: Control<PostCreateNewProjectJson>;
}

export default function CreateProjectFormMore({ control }: CreateProjectFormType) {
  return (
    <Box sx={{ width: '100%', display: 'flex', flexFlow: 'wrap', rowGap: "15px", marginTop: '20px', border: 1 }}>
      <MuiMultiSelected
        control={control}
        name="common.productInfo2"
        item={PRODUCT}
        selectBoxProps={{
          label: "2.제품정보",
          id: "productInfo1-select",
          style: { width: '100%' },
          size: "small",
          defaultValue: "",
          multiple: true,
          inputProps: {
            style: {
              width: '100%'
            }
          }
        }} />
      <MuiMultiSelected
        control={control}
        name="common.productInfo3"
        item={PRODUCT}
        selectBoxProps={{
          label: "3.제품정보",
          id: "productInfo1-select",
          style: { width: '100%' },
          size: "small",
          defaultValue: "",
          multiple: true,
          inputProps: {
            style: {
              width: '100%'
            }
          }
        }} />
      <MuiMultiSelected
        control={control}
        name="common.productInfo4"
        item={PRODUCT}
        selectBoxProps={{
          label: "4.제품정보",
          id: "productInfo1-select",
          style: { width: '100%' },
          size: "small",
          defaultValue: "",
          multiple: true,
          inputProps: {
            style: {
              width: '100%'
            }
          }
        }} />
      <MuiMultiSelected
        control={control}
        name="common.productInfo5"
        item={PRODUCT}
        selectBoxProps={{
          label: "5.제품정보",
          id: "productInfo1-select",
          style: { width: '100%' },
          size: "small",
          defaultValue: "",
          multiple: true,
          inputProps: {
            style: {
              width: '100%'
            }
          }
        }} />
      {/* 미지원 할거면 미지원 체크도 하게해줘라! */}
      <Box sx={{ width: '50%' }}>
        <MuiSelectBox
          control={control}
          name="common.multiOsSupport"
          item={MULTIOSSUPPORT}
          selectBoxProps={{
            label: "멀티OS지원여부",
            id: "assignee-select",
            style: { width: '100%' },
            size: "small",
            inputProps: {
              style: {
                width: '100%'
              }
            }
          }}
        />
      </Box>
      <Box sx={{ width: '50%' }}>
        <MuiSelectBox
          control={control}
          name="common.printerSupportRange"
          item={PRINTSUPPORTRANGE}
          selectBoxProps={{
            label: "프린터 지원 범위",
            id: "assignee-select",
            style: { width: '100%' },
            size: "small",
            inputProps: {
              style: {
                width: '100%'
              }
            }
          }}
        />
      </Box>
    </Box>
  );
}
