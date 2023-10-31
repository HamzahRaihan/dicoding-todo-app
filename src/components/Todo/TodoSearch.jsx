/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from 'react';

function TodoSearch(props) {
  const [inputStyle, setInputStyle] = useState('w-72 max-[500px]:w-full');

  return (
    <>
      <div className="flex gap-2 text-white justify-between items-center max-[500px]:flex-col">
        <h1 className="text-2xl font-bold">Catatan</h1>
        <input placeholder={props.placeholder} type={props.type} className={`p-2 border rounded-lg border-neutral-700 bg-black text-white ${inputStyle}`} value={props.input} onChange={props.handleSearchTodo} />
      </div>
    </>
  );
}

export default TodoSearch;
