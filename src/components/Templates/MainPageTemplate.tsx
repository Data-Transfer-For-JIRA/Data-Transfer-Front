import { Outlet } from 'react-router-dom';
import PageHeader from '../Organisms/PageHeader';
import SideNavigator from '../Organisms/SideNavigator';
import './MainPageTemplate.css';

export default function MainPageTemplate() {
  return (
    <main>
      <PageHeader />
      <div className='contents-section-style'>
        <SideNavigator />
        <div className='outlet-wrapper'>
          <Outlet />
        </div>
      </div>
    </main>
  )
}
