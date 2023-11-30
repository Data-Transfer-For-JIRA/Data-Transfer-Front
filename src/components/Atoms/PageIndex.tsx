import { pageInfoType } from '../../Common/Types';
import { setIndexNumber } from '../../Common/UtilFunction';
import './PageIndex.css'

type PageIndexPropsType = {
  pageInfo: pageInfoType
  pageIndex: number;
  setPageIndex: React.Dispatch<React.SetStateAction<number>>
}
/**
 *  테이블 페이지 선택하는 컴포넌트
 *  index가 API를 호출할때 0부터 시작해서 임의로 여기서는 +1 ,-1로 가감연산하여 사용.
 */
export default function PageIndex({ pageInfo, pageIndex, setPageIndex }: PageIndexPropsType) {
  const handleIndexplus = () => {
    if (pageIndex >= pageInfo?.totalPage - 1) {
      alert('마지막 페이지입니다.')
      return;
    }
    setPageIndex(pageIndex + 1)
  };
  const handleIndexMinus = () => {
    if (pageIndex <= 0) {
      alert('제일 첫 페이지입니다.')
      return;
    }
    setPageIndex(pageIndex - 1)
  }
  const handlePageIndex = (pageIndex: number) => {
    setPageIndex(pageIndex);
  }
  const pagingNumber = setIndexNumber(pageInfo.totalPage, pageIndex + 1);
  return (
    <div className='page-number-selector pageButtonArea'>
      <button className='btn-previous btn-paging btnHover ' type='button' onClick={handleIndexMinus}>◀</button>
      {pagingNumber.map((item, index) => (
        item === (pageIndex + 1) ?
          <button className='page-number-select' type='button' key={index} value={item - 1}>{item}</button>
          : <button className='page-number-not-select' type='button' key={index} value={item - 1}
            onClick={() => handlePageIndex(item - 1)}>{item}</button>
      ))}
      <button className='btn-next btn-paging btnHover' type='button' onClick={handleIndexplus}>▶</button>
    </div>
  )
}
