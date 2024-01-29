import { Box, Container, Tabs } from '@mui/material';
import { Location, Outlet, useLocation } from 'react-router-dom';
import { makeStyles } from "@material-ui/styles";
import MuiLinkTab from '../Molecules/MuiLinkTab';
import ModalContentsProvider from '../Context/ModalContentsProvider';

const useStyles = makeStyles(() => ({
  container: {
    width: "100%",
    height: "100%",
  }
}));

const setTabValue = (location: Location<unknown>): number | undefined => {
  if (location.pathname === '/create-jira-project/project') return 0;
  else if (location.pathname === '/create-jira-project/maintenance') return 1;
  else return 0;
}

export default function JiraCreateProjectPage() {
  const classes = useStyles();
  const location = useLocation();
  const tabValue = setTabValue(location);

  return (
    <ModalContentsProvider>
      <Container maxWidth={false} className={classes.container}>
        <Box>
          <Tabs value={tabValue} role="navigation">
            <MuiLinkTab label="프로젝트" link="/create-jira-project/project" />
            <MuiLinkTab label="유지보수" link="/create-jira-project/maintenance" />
          </Tabs>
        </Box>
        <Outlet />
      </Container>
    </ModalContentsProvider>
  )
}
