import { Outlet } from 'react-router-dom';
import PageFooter from '../Organisms/PageFooter';
import PageHeader from '../Organisms/PageHeader';
import SideNavigator from '../Organisms/SideNavigator';

export default function TestPage() {
  return (
    <div>
      <PageHeader />
      <SideNavigator />
      <Outlet />
      <PageFooter />
    </div>
  )
}
