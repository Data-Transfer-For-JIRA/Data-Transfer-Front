import { Link } from 'react-router-dom';
import './BtnLink.css';

type LinkBtnpropsType = {
  btnValue: string;
  btnLink: string;
}
export default function BtnLink(props: LinkBtnpropsType) {
  return (
    <Link to={props.btnLink}>
      <div className='btn-link'> {props.btnValue}</div>
    </Link>
  )
}
