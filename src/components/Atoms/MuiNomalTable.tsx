import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Link } from 'react-router-dom';
import { GridRowType } from '../../Common/Types';



export default function MuiNomalTable({ girdSelected }: { girdSelected: GridRowType }) {
  const jiraUrl = girdSelected.key !== "" ?
    `https://markany.atlassian.net/jira/core/projects/${girdSelected.key}/board` : "";
  let projectType;
  if (girdSelected.flag === "P") { projectType = "프로젝트" }
  else if (girdSelected.flag === "M") { projectType = "유지보수" }
  else { { projectType = "" } }
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell align="left">PMS 코드</TableCell>
          <TableCell align="left">담당자</TableCell>
          <TableCell align="left">프로젝트 타입</TableCell>
          <TableCell align="left">Jira 기본정보 URL</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell align="left">{girdSelected.projectCode}</TableCell>
          <TableCell align="left">{girdSelected.projectAssignees}</TableCell>
          <TableCell align="left">{projectType}</TableCell>
          <TableCell align="left">
            <Link to={jiraUrl} target="_blank">{jiraUrl}</Link>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
