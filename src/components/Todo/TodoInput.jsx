/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from 'react';
import Button from '../Button';
import Input from '../Input';

function TodoInput({ handleAddTodo, input, setInput, desc, setDesc, error }) {
  const [maxLengthTitle, setMaxLengthTitle] = useState(50);
  const [maxLengthDesc, setMaxLengthDesc] = useState(80);

  const handleMaxLengthTitle = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length <= maxLengthTitle) {
      setInput(inputValue);
    }
  };

  const handleMaxLengthDesc = (e) => {
    const descValue = e.target.value;
    if (descValue.length <= maxLengthDesc) {
      setDesc(descValue);
    }
  };

  return (
    <>
      <form className="flex flex-col gap-4 text-white" onSubmit={handleAddTodo}>
        <p>Charater left: {maxLengthTitle - input.length}</p>
        <Input type="text" placeholder="Judul" input={input} handleMaxLength={handleMaxLengthTitle} />
        <p>Charater left: {maxLengthDesc - desc.length}</p>
        <Input type="text" placeholder="Deskripsi catatan" input={desc} handleMaxLength={handleMaxLengthDesc} />
        <Button>Tambah</Button>
      </form>
      {error && <div className="bg-white rounded-lg px-5 py-2 hover:opacity-90  text-black w-fit ">Salah satu input tidak boleh ada yang kosong</div>}
    </>
  );
}

export default TodoInput;
