import { Outlet } from 'react-router-dom';
import PageHeader from '../Organisms/PageHeader';
import SideNavigator from '../Organisms/SideNavigator';

export default function TestPage() {
  return (
    <div>
      <PageHeader />
      <SideNavigator />
      <Outlet />
    </div>
  )
}
