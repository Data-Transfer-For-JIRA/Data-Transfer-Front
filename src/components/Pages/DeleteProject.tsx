import { useEffect, useState } from 'react';
import { Grid,Box, Paper } from '@mui/material';
import MuiControlledTextInput from '../Atoms/MuiControlledTextInput';
import { UseDeleteAxiosProject, UseGetAxiosSearcJiraList } from '../../Common/Axios';
import { GridRowType, SelectedProjectType } from '../../Common/Types';
import MuiDataMoreViewTable from '../Molecules/MuiDataMoreViewTable';
import TargetChip from '../Molecules/TargetChip';

/** 선택된 프로젝트 코드와 Chip에 보여질 데이터 매칭 함수
 *  검색결과에 따라 비교대상이 달라져서 문제가좀 있음;
 */
const setSelectProjectList = (targetProject:string[], searchResult:GridRowType[]):SelectedProjectType[]=>{
  const tempArray:SelectedProjectType[] = [];
  searchResult.map((item)=>{
    if(targetProject.includes(item.key)){
      tempArray.push({
        jiraProjectKey : item.key,
        jiraProjectName : item.jiraProjectName
      });
    }
  })
  return tempArray;
}

export default function DeleteProject(){
  const [searchResult, setSearchResult] = useState<GridRowType[]>([]);
  const [targetProject, setTargetProject] = useState<string[]>([]);
  const [itemList,setItemList] = useState<SelectedProjectType[]>([]);

  const handleTargetProject = (targetList:GridRowType[])=>{
    setSearchResult(targetList);
  }
  const handleTargetDelete = (deleteCode : string)=>{
    setItemList((prev)=>{
      const temp = prev.filter((item)=>{
        return item.jiraProjectKey !== deleteCode
      })
      return temp;
    });
    setTargetProject((prev)=>{
      return prev.filter((item)=>{
        return item !== deleteCode
      })
  });
  }
  
  useEffect(()=>{
    const requestDefaultApi = async ()=>{
      const result = await UseGetAxiosSearcJiraList("");
      if(result){
        handleTargetProject(result);
      }
    }
    if(searchResult.length <1){requestDefaultApi();}

    //DataGrid에서 데이터 선택시 Chip에 선택된 데이터 쌓는 로직
    setItemList((prev) => {
      const uniqueProjects = new Set(prev.map(item => item.jiraProjectKey));
      const filteredProjects = setSelectProjectList(targetProject, searchResult)
        .filter(item => !uniqueProjects.has(item.jiraProjectKey));
      return [...prev, ...filteredProjects];
  });
  console.log(targetProject);
  },[targetProject]);

  return (
    <Box sx={{ height : '100%' }}>
      <Paper sx={{ height : '100%' }}>
      <Grid container >
        <Grid item xs={9}>
            <MuiControlledTextInput handleSearchResult={handleTargetProject} requestSearchApi={UseGetAxiosSearcJiraList}/>
            <MuiDataMoreViewTable gridData={searchResult} setSubJiraKey={setTargetProject}/>      
        </Grid>
        <Grid item xs={3}>
          <TargetChip itemList={itemList} handleTargetDelete={handleTargetDelete} requestApiFunction={UseDeleteAxiosProject}/>
        </Grid> 
      </Grid>
      </Paper>
    </Box>
  )
}
