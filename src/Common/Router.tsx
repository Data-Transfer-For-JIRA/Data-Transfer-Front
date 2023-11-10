import App from '../App'
import SearchForm from '../components/Molecules/SearchForm';
import GetTableAndPostData from '../components/Organisms/GetTableAndPostData';
import InfoText from '../components/Organisms/InfoText';
import ErrorPage from '../components/Pages/ErrorPage';
import LoginPage from '../components/Pages/LoginPage';

enum serviceList { transbefore = 'trans-before', transafter = 'trans-after', transend = 'trans-end' }
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
    ],
  },
  {
    path: '/Login',
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/testComponent',
    element: <ErrorPage />
  }
];
