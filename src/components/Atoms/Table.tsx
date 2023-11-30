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
            <th scope='col' className='project-name-th'>프로젝트명</th>
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
                    {`(${item.projectCode}) `}{item.projectName}
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
