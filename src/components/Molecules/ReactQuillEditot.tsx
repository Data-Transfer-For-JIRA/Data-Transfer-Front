import {
  useMemo,
} from 'react';
import { Control, Controller } from 'react-hook-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { PostCreateNewProjectJson } from '../../Common/Types';

const formats = [
  'font',
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'align',
  'color',
  'background',
  'size',
  'h1',
];
type ReactQuillEditorType = {
  projectFlag: string;
  control: Control<PostCreateNewProjectJson>;
}
export default function ReactQuillEditor({ projectFlag, control }: ReactQuillEditorType) {
  console.log(projectFlag);
  let defaultValue: string;
  if (projectFlag === 'P') {
    defaultValue = "<p><strong>1.고객사 :</strong></p><p><strong>2. 계약 업체 :</strong></p><p><strong>3. 프로젝트 명 : </strong></p><p><strong>4. 프로젝트 코드 :</strong></p><p><strong>5. 지원 일정 :</strong></p><p><strong>6. 담당자 :</strong></p><p><strong>7. 지원 범위 :</strong></p><ul><li><strong>가. 지원 형태 :</strong></li><li><strong>나. 연동 형태 :</strong></li><li><strong>다. 사용자 지원 환경 :</strong></li><li><strong>라. 서버 수량 :</strong></li></ul><p><strong>8. 장소 :</strong></p><p><strong>9. 영업 담당 :</strong></p><p><strong>10. 기타 :</strong></p>"
  } else {
    defaultValue = "<p><strong>1.고객사 :</strong> </p><p><strong>2.계약업체 :</strong></p><p><strong>3.유지보수명 :</strong></p><p><strong>4.유지보수 코드 :</strong></p><p><strong>5.제품명 :</strong></p><p><strong>6,유지보수 요율 :</strong></p><p><strong>7.유지보수 금액 :</strong></p><p><strong>8.계약기간 :</strong></p><p><strong>9.점검일정 :</strong></p><p><strong>10. 점검 컨택:</strong></p><p><strong>11. 점검 장소:</strong></p><p><strong>12. 비고:</strong></p>"
  }
  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ size: ['small', false, 'large', 'huge'] }],
          [{ align: [] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [
            {
              color: [],
            },
            { background: [] },
          ],
        ],
      },
    };
  }, []);

  return (
    <Controller
      name="common.description"
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <ReactQuill
          {...field}
          theme="snow"
          modules={modules}
          formats={formats}
          value={field.value || defaultValue}
        />
      )}
    />
  )
}
