import { Tab } from '@mui/material';
import { makeStyles } from "@material-ui/styles";
import { useNavigate } from 'react-router-dom';

type LinkTabType = {
  link: string;
  label?: string;
  selected?: string;
}

const useStyles = makeStyles({
  linkTab: {
    color: "GrayTextn !important",
    backgroundColor: ""
  },
});


export default function MuiLinkTab(props: LinkTabType) {
  const classes = useStyles();

  const navigator = useNavigate();

  const handleTabClick = () => {
    navigator(props.link);
  }
  return (
    <Tab className={classes.linkTab} label={props.label} onClick={() => handleTabClick()} />
  )
}
