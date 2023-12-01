import { ReactNode } from 'react';
import './BtnSubmit.css';
type propsType = {
  children?: ReactNode
  style?: React.CSSProperties
}
export default function BtnSubmit({ children = "제 출", style }: propsType) {
  return (
    <button type='submit' className='btnHover blueColor wss-submit' style={style}>{children}</button>
  )
}
