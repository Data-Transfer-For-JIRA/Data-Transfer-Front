import './Table.css';
import { returnJsonType } from '../../Common/Types';
import React, { SetStateAction } from 'react';


type propsType = {
  getViewList: returnJsonType | undefined;
  setPostProjectList: React.Dispatch<SetStateAction<Array<string>>>
  postProjectList: Array<string>
}

export default function Table({ getViewList, setPostProjectList, postProjectList }: propsType) {
  const handleCheckBox = (projectCode: string, flag: boolean) => {
    if (postProjectList.length > 4) {
      alert('최대 5개까지 선택가능합니다.');
      return;
    }
    if (flag) {
      const newViewList = [...postProjectList, projectCode]
      setPostProjectList(newViewList)
    } else {
      const newViewList = postProjectList.filter(e => e !== projectCode)
      setPostProjectList(newViewList)
    }
  }

  return (
    <div className='table-area'>
      <table className='project-table'>
        <thead>
          <tr>
            <th scope='col' className='check-box-th'>구분</th>
            <th scope='col' className='project-code-th'>프로젝트 코드</th>
            <th scope='col' className='project-name-th'>프로젝트 명</th>
            <th scope='col' className='user-name-th'>담당자</th>
            <th scope='col' className='date-th'>업데이트 날짜</th>
          </tr>
        </thead>
        {getViewList !== undefined ?
          <tbody>
            {
              getViewList.content.map((item, index) => (
                <tr className='protr' key={item.projectCode}>
                  <td className='protd'>
                    <input type='checkbox' className='inputCheckbox'
                      name={`checkbox${index}`}
                      checked={postProjectList.some(e => e === item.projectCode)}
                      onChange={(e) => {
                        handleCheckBox(item.projectCode, e.target.checked)
                      }} />
                  </td>
                  <td className='protd'>
                    {item.projectCode}
                  </td>
                  <td className='protd'>
                    {item.projectName}
                  </td>
                  <td className='protd'>
                    {item.assignedEngineer}
                  </td>
                  <td className='protd'>
                    {item.createdDate}
                  </td>
                </tr>
              ))
            }
          </tbody>
          :
          <tbody className='no-data-text'>
            <tr><td>No data</td></tr>
          </tbody>
        }
      </table>
    </div>
  )
}
