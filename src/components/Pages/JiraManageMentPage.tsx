import { Box, Container, Tabs } from '@mui/material';
import { Location, Outlet, useLocation } from 'react-router-dom';
import { makeStyles } from "@material-ui/styles";
import LinkTab from '../Molecules/LinkTab';

const useStyles = makeStyles(() => ({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  }
}));

const setTabValue = (location: Location<unknown>): number => {
  if (location.pathname === '/create-jira-project/project') return 0;
  else if (location.pathname === '/create-jira-project/maintenance') return 1;
  else return 3;
}

export default function JiraManageMentPage() {
  const classes = useStyles();
  const location = useLocation();
  const tabValue = setTabValue(location);

  return (
    <Container maxWidth={false} className={classes.container}>
      <Box sx={{ borderColor: '#9e9e9e' }}>
        <Tabs value={tabValue} role="navigation">
          <LinkTab label="프로젝트" link="/create-jira-project/project" />
          <LinkTab label="유지보수" link="/create-jira-project/maintenance" />
        </Tabs>
      </Box>
      <Outlet />
    </Container>
  )
}
