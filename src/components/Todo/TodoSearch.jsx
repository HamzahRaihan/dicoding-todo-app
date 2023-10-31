/* eslint-disable no-unused-vars */
import { useState } from 'react';
import Input from '../Input';

function TodoSearch() {
  const [inputStyle, setInputStyle] = useState('w-72 max-[500px]:w-full');

  return (
    <>
      <div className="flex gap-2 text-white justify-between items-center max-[500px]:flex-col">
        <h1 className="text-2xl font-bold">Catatan</h1>
        <Input type="text" placeholder={'Cari catatan'} inputStyle={inputStyle} />
      </div>
    </>
  );
}

export default TodoSearch;
