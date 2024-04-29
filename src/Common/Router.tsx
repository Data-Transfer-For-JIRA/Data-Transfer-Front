import App from '../App'
import { FormAlertModalContents } from '../components/Molecules/MuiModalPopup';
import CreateJiraProject from '../components/Organisms/CreateJiraProject';
import GetTableAndPostData from '../components/Organisms/GetTableAndPostData';
import InfoText from '../components/Organisms/InfoText';
import DeleteProject from '../components/Pages/DeleteProject';
import ErrorPage from '../components/Pages/ErrorPage';
import JiraCreateProjectPage from '../components/Pages/JiraCreateProjectPage';
import JiraLinkProjectPage from '../components/Pages/JiraLinkProjectPage';
import LoginPage from '../components/Pages/LoginPage';

enum serviceList { transbefore = 'trans-before', transafter = 'trans-after', transend = 'trans-end' }
enum projectFlag { createProject = "P", createMaintenance = 'M' }

const data =
{
  result: "프로젝트 생성 성공",
  jiraProjectCode: 'TED150',
  jiraProjectName: '전자문서 테스트 더미데이터 프로젝트'
}

export const Router = [
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <InfoText /> },
      { path: "Login", element: <LoginPage /> },
      { path: "load-wsslist", element: <GetTableAndPostData serviceType={serviceList.transbefore} /> },
      { path: "transfer-state-list", element: <GetTableAndPostData serviceType={serviceList.transafter} /> },
      { path: "view-transfer-endlist", element: <GetTableAndPostData serviceType={serviceList.transend} /> },
      { path: "load-jira-list", element: <GetTableAndPostData serviceType={serviceList.transend} /> },
      {
        path: "/create-jira-project", element: <JiraCreateProjectPage />, children: [
          { path: "project", element: <CreateJiraProject projectFlag={projectFlag.createProject} /> },
          { path: "maintenance", element: <CreateJiraProject projectFlag={projectFlag.createMaintenance} /> },
        ]
      },
      { path: "/create-weblink", element: <JiraLinkProjectPage /> },
      { path: "/check-backup", element: <DeleteProject/> },
    ],
  },
  {
    path: '/testComponent',
    element: <FormAlertModalContents responseData={data} />
  }
];
