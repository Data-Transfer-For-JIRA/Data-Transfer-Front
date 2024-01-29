import { FormControl, InputLabel, MenuItem, Select, SelectProps } from '@mui/material';
import { useController, FieldValues, FieldPath, UseControllerProps } from 'react-hook-form';


interface MuiProps {
  selectBoxProps?: SelectProps
  item: string[];
}

export default function MuiSelectBox<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({ selectBoxProps, item, ...props }: MuiProps & UseControllerProps<TFieldValues, TName>) {

  const { field } = useController(props);
  return (
    <FormControl style={{ width: '100%' }}>
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
