import Chip from '../Atoms/Chip';

import './ChipsStack.css';

type ChipsStackType = {
  postProjectList: string[];
  setPostProjectList: React.Dispatch<React.SetStateAction<string[]>>;
}
export default function ChipsStack({ postProjectList, setPostProjectList }: ChipsStackType) {
  return (
    <div className='chip-stack-area'>       
      {postProjectList.map((item, index) => (
        <Chip projectCode={item} key={index + item} setPostProjectList={setPostProjectList} />
      
      ))}
    </div>
  );
}
