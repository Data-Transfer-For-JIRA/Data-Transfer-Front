import App from '../App'
import CreateJiraProject from '../components/Organisms/CreateJiraProject';
import GetTableAndPostData from '../components/Organisms/GetTableAndPostData';
import InfoText from '../components/Organisms/InfoText';
import LinkJiraProject from '../components/Organisms/LinkJiraProject';
import ErrorPage from '../components/Pages/ErrorPage';
import JiraManageMentPage from '../components/Pages/JiraManageMentPage';
import LoginPage from '../components/Pages/LoginPage';

enum serviceList { transbefore = 'trans-before', transafter = 'trans-after', transend = 'trans-end' }
enum projectFlag { createProject = "P", createMaintenance = 'M' }

export const Router = [
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <InfoText /> },
      { path: "load-wsslist", element: <GetTableAndPostData serviceType={serviceList.transbefore} /> },
      { path: "transfer-state-list", element: <GetTableAndPostData serviceType={serviceList.transafter} /> },
      { path: "view-transfer-endlist", element: <GetTableAndPostData serviceType={serviceList.transend} /> },
      { path: "load-jira-list", element: <GetTableAndPostData serviceType={serviceList.transend} /> },
      {
        path: "/create-jira-project", element: <JiraManageMentPage />, children: [
          { path: "project", element: <CreateJiraProject projectFlag={projectFlag.createProject} /> },
          { path: "maintenance", element: <CreateJiraProject projectFlag={projectFlag.createMaintenance} /> },
        ]
      },
      { path: "/create-weblink", element: <LinkJiraProject /> },
      { path: "check-backup", element: <GetTableAndPostData serviceType={serviceList.transend} /> },
    ],
  },
  {
    path: '/Login',
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  // {
  //   path: '/testComponent',
  //   element: <CreateProjectForm projectFlag='M' />
  // }
];
