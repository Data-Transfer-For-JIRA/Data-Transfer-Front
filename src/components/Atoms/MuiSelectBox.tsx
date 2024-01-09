import { FormControl, InputLabel, MenuItem, Select, SelectProps } from '@mui/material';
import { useController, FieldValues, FieldPath, UseControllerProps } from 'react-hook-form';
import { USER } from '../../Common/User';


interface MuiProps {
  selectBoxProps?: SelectProps
  item: typeof USER.Sales;
}

export default function MuiSelectBox<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({ selectBoxProps, item, ...props }: MuiProps & UseControllerProps<TFieldValues, TName>) {

  const { field } = useController(props);
  return (
    <FormControl style={{ width: '50%' }}>
      <InputLabel id="assignee-select" htmlFor="assignee-select">{selectBoxProps?.label}</InputLabel>
      <Select
        {...selectBoxProps}
        {...field}
      >
        {
          item.map((value) => (
            <MenuItem key={value} value={value}>{value}</MenuItem>
          ))
        }
      </Select>
    </FormControl>
  );
}
