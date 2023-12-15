import { Outlet } from 'react-router-dom';
import './InfoText.css';
export default function InfoText() {
  return (
    <div className='info-text-box'>
      <p style={{ color: "white" }}>Jira to WSS & Jira Data Backup site</p>
      <Outlet />
    </div>
  )
}
