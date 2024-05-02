import { IconButton, List, ListItem, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

/**
 * 선택된 아이탬들을 보여주는 List
 * 각 개별 리스트는 삭제가 가능해야해서 아이콘이 있음.
 * 메인 Text랑 서브 Text가 표현될예정.
 * @itemList : 보여질 텍스트를 가지고있는 리스트
 * @handleDeleteItem : itemList 갱신할 함수
 */
type ListObject = {
  jiraProjectKey :string,
  jiraProjectName : string
}
type  SecondaryTestListType = {
  itemList ?: ListObject[];
}
export default function SecondaryTextList({itemList=testList}:SecondaryTestListType){

  return(
    <List dense={true}>
        {itemList.map((item,index)=>(
          <ListItem
          key={`${item}${index}`}
          secondaryAction={
            <IconButton edge="end" aria-label="delete">
              <DeleteIcon />
            </IconButton>
          }>
            <ListItemText
              primary = {item.jiraProjectKey}
              secondary={item.jiraProjectName}
            />
          </ListItem>
        ))}
    </List>
  );
}

const testList = [
  {jiraProjectKey : 'TED1010', jiraProjectName : "유지보수_정보통신공제조합_위변조방지솔루션"},
  {jiraProjectKey : 'TED1111', jiraProjectName : "유지보수_메트라이프_위변조방지솔루션"},
  {jiraProjectKey : 'TED2222', jiraProjectName : "유지보수_푸르덴셜_위변조방지솔루션"},
  {jiraProjectKey : 'TED1010', jiraProjectName : "유지보수_정보통신공제조합_위변조방지솔루션"},
  {jiraProjectKey : 'TED1111', jiraProjectName : "유지보수_메트라이프_위변조방지솔루션"},
  {jiraProjectKey : 'TED2222', jiraProjectName : "유지보수_푸르덴셜_위변조방지솔루션"},
  {jiraProjectKey : 'TED1010', jiraProjectName : "유지보수_정보통신공제조합_위변조방지솔루션"},
  {jiraProjectKey : 'TED1111', jiraProjectName : "유지보수_메트라이프_위변조방지솔루션"},
  {jiraProjectKey : 'TED2222', jiraProjectName : "유지보수_푸르덴셜_위변조방지솔루션"},
  {jiraProjectKey : 'TED1010', jiraProjectName : "유지보수_정보통신공제조합_위변조방지솔루션"},
  {jiraProjectKey : 'TED1111', jiraProjectName : "유지보수_메트라이프_위변조방지솔루션"},
  {jiraProjectKey : 'TED2222', jiraProjectName : "유지보수_푸르덴셜_위변조방지솔루션"},
  {jiraProjectKey : 'TED1010', jiraProjectName : "유지보수_정보통신공제조합_위변조방지솔루션"},
  {jiraProjectKey : 'TED1111', jiraProjectName : "유지보수_메트라이프_위변조방지솔루션"},
]
