import { useState } from 'react';
import BtnSubmit from '../Atoms/BtnSubmit';
import InputLabel from '../Atoms/InputLabel';
import InputText from '../Atoms/InputText';
import './SearchForm.css';

type propsType = {
  setPageIndex: React.Dispatch<React.SetStateAction<number>>
  setSearch: React.Dispatch<React.SetStateAction<string>>
};

export default function SearchForm({ setPageIndex, setSearch }: propsType) {
  const [input, setInput] = useState<string>('');
  const searchKeyWord = 'searchKeyWord'; //백에서 오타냄 이거 백이바꾸면 수정해야함
  const btnValue: string = "검 색";   

  const handleChangeText: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInput(e.target.value);
  };
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setPageIndex(0);
    setSearch(input);
    event.preventDefault(); //새로고침방지
  }

  return (
    <div id='searchArea'>
      <form onSubmit={handleFormSubmit}>
        <InputLabel inputId={searchKeyWord} />
        <InputText inputid={searchKeyWord} value={input} changeHandle={handleChangeText} />
        <BtnSubmit>{btnValue}</ BtnSubmit>
      </form>
    </div>
  )
}
