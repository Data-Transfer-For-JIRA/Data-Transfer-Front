import { FormControl, InputLabel, ListSubheader, MenuItem, Select, SelectProps } from '@mui/material';
import { useController, FieldValues, FieldPath, UseControllerProps } from 'react-hook-form';
import { PRODUCT } from '../../Common/SelectValue';


interface MuiProps {
  selectBoxProps?: SelectProps
  item: typeof PRODUCT;
}

export default function MuiMultiSelected<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({ selectBoxProps, ...props }: MuiProps & UseControllerProps<TFieldValues, TName>) {

  const { field } = useController(props);
  const Type = PRODUCT.Type;
  const Interlock = PRODUCT.Interlock;
  const Option = PRODUCT.Option;
  return (
    <FormControl style={{ width: '100%' }}>
      <InputLabel id="productInfo1-select" htmlFor="productInfo1-select">{selectBoxProps?.label}</InputLabel>
      <Select
        {...selectBoxProps}
        {...field}
      >
        <MenuItem value="" />
        <ListSubheader >제품</ListSubheader>
        {
          Type.map((value) => (
            <MenuItem key={value} value={value}>{value}</MenuItem >
          ))
        }
        <ListSubheader >연동</ListSubheader>
        {
          Interlock.map((value) => (
            <MenuItem key={value} value={value}>{value}</MenuItem >
          ))
        }
        <ListSubheader >옵션</ListSubheader>
        {
          Option.map((value) => (
            <MenuItem key={value} value={value}>{value}</MenuItem >
          ))
        }
      </Select>
    </FormControl>
  );
}



