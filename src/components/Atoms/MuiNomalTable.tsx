import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Link } from 'react-router-dom';



export default function MuiNomalTable({ subJiraKey }: { subJiraKey: string }) {
  const jiraUrl = `https://markany.atlassian.net/jira/core/projects/${subJiraKey}/board`
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell align="left">PMS 코드</TableCell>
          <TableCell align="left">담당자</TableCell>
          <TableCell align="left">Jira 기본정보 URL</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell align="left">{subJiraKey}</TableCell>
          <TableCell align="left">{'엄준식'}</TableCell>
          <TableCell align="left">
            <Link to={jiraUrl} >{jiraUrl}</Link>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
