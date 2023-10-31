/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { getInitialData, showFormattedDate } from '../../utils';
import CardContent from './CardContent';
import TodoSearch from './TodoSearch';
import TodoInput from './TodoInput';

function TodoCard() {
  const data = getInitialData();
  const [input, setInput] = useState('');
  const [desc, setDesc] = useState('');

  const [archived, setArchived] = useState([]);
  const [activeTodo, setActiveTodo] = useState([]);

  useEffect(() => {
    const filterByArchived = data.filter((active) => active.archived);
    setArchived(filterByArchived);
  }, []);

  useEffect(() => {
    const filterByActive = data.filter((active) => !active.archived);
    setActiveTodo(filterByActive);
  }, []);

  const handleAddTodo = (e) => {
    e.preventDefault();
    const newTodo = {
      id: +new Date(),
      title: input,
      body: desc,
      archived: false,
      createdAt: Date.now(),
    };
    console.log('🚀 ~ file: TodoInput.jsx:37 ~ handleAddTodo ~ newTodo:', newTodo);
    setActiveTodo([...activeTodo, newTodo]);
  };

  const handleActiveToArchive = (id) => {
    const findById = activeTodo.find((item) => item.id === id);
    if (findById) {
      const updateActiveTodo = activeTodo.filter((item) => item.id !== id);
      findById.archived = true;
      setArchived([...archived, findById]);
      setActiveTodo(updateActiveTodo);
    }
  };

  const handleArchiveToActive = (id) => {
    const findById = archived.find((item) => item.id === id);
    if (findById) {
      const updateArchive = archived.filter((item) => item.id !== id);
      findById.archived = false;
      setActiveTodo([...activeTodo, findById]);
      setArchived(updateArchive);
    }
  };

  const handleDeleteTodo = (id) => {
    const deleteByActive = activeTodo.filter((item) => item.id !== id);
    const deleteByArchive = archived.filter((item) => item.id !== id);
    setActiveTodo(deleteByActive);
    setArchived(deleteByArchive);
  };

  console.log(activeTodo);
  console.log(archived);

  return (
    <>
      <TodoSearch />
      <TodoInput handleAddTodo={handleAddTodo} input={input} setInput={setInput} desc={desc} setDesc={setDesc} />
      <h1 className="text-white text-2xl">Catatan Aktif</h1>
      <div className="flex flex-wrap justify-start gap-[29px] text-white">
        {activeTodo.length == 0 ? (
          <h1 className="mx-auto text-neutral-600">Tidak ada catatan aktif</h1>
        ) : (
          activeTodo.map((item) => <CardContent key={item.id} activeTodo={item} showFormattedDate={showFormattedDate} deleteTodo={() => handleDeleteTodo(item.id)} handleArchive={() => handleActiveToArchive(item.id)} />)
        )}
      </div>
      <h1 className="text-white text-2xl">Catatan Arsip</h1>
      <div className="flex flex-wrap justify-start gap-[29px] text-white">
        {archived.length == 0 ? (
          <h1 className="mx-auto text-neutral-600">Tidak ada arsip</h1>
        ) : (
          archived.map((item) => <CardContent key={item.id} activeTodo={item} showFormattedDate={showFormattedDate} deleteTodo={() => handleDeleteTodo(item.id)} handleArchive={() => handleArchiveToActive(item.id)} />)
        )}
      </div>
    </>
  );
}

export default TodoCard;
