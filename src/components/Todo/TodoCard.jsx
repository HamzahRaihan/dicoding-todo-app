import { useEffect, useState } from 'react';
import { getInitialData, showFormattedDate } from '../../utils';
import CardContent from './CardContent';
import TodoSearch from './TodoSearch';
import TodoInput from './TodoInput';

function TodoCard() {
  const data = getInitialData();
  const [input, setInput] = useState('');
  const [desc, setDesc] = useState('');
  const [search, setSearch] = useState('');
  const [archived, setArchived] = useState([]);
  const [activeTodo, setActiveTodo] = useState([]);
  const [filteredArchived, setFilteredArchived] = useState(archived);
  const [filteredActiveTodo, setFilteredActiveTodo] = useState(activeTodo);
  const [error, setError] = useState(false);

  // filtered data by archived
  useEffect(() => {
    const filterByArchived = data.filter((active) => active.archived);
    setArchived(filterByArchived);
  }, []);

  // filtered data by active
  useEffect(() => {
    const filterByActive = data.filter((active) => !active.archived);
    setActiveTodo(filterByActive);
  }, []);

  // add new todo
  const handleAddTodo = (e) => {
    e.preventDefault();
    if (input.trim() == '' || desc.trim() == '') {
      setError(true);
    } else {
      const newTodo = {
        id: +new Date(),
        title: input,
        body: desc,
        archived: false,
        createdAt: Date.now(),
      };
      setError(false);
      setActiveTodo([...activeTodo, newTodo]);
      setInput('');
      setDesc('');
    }
  };

  // handling button to archive an active todo
  const handleActiveToArchive = (id) => {
    const findById = activeTodo.find((item) => item.id === id);
    if (findById) {
      const updateActiveTodo = activeTodo.filter((item) => item.id !== id);
      findById.archived = true;
      setArchived([...archived, findById]);
      setActiveTodo(updateActiveTodo);
    }
  };

  // handling button to active an archive todo
  const handleArchiveToActive = (id) => {
    const findById = archived.find((item) => item.id === id);
    if (findById) {
      const updateArchive = archived.filter((item) => item.id !== id);
      findById.archived = false;
      setActiveTodo([...activeTodo, findById]);
      setArchived(updateArchive);
    }
  };

  // handling delete todo
  const handleDeleteTodo = (id) => {
    const deleteByActive = activeTodo.filter((item) => item.id !== id);
    const deleteByArchive = archived.filter((item) => item.id !== id);
    setActiveTodo(deleteByActive);
    setArchived(deleteByArchive);
  };

  // render search
  useEffect(() => {
    const searchTodo = activeTodo.filter((item) => item.title.toLowerCase().includes(search.toLowerCase()));
    const searchTodoArchive = archived.filter((item) => item.title.toLowerCase().includes(search.toLowerCase()));
    if (search) {
      setFilteredActiveTodo(searchTodo);
      setFilteredArchived(searchTodoArchive);
    } else {
      setFilteredActiveTodo(activeTodo);
      setFilteredArchived(archived);
    }
  }, [search, activeTodo, archived]);

  // handling search input
  const handleSearchTodo = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <TodoSearch type="text" placeholder="Cari catatan" handleSearchTodo={handleSearchTodo} search={search} />
      <TodoInput handleAddTodo={handleAddTodo} input={input} setInput={setInput} desc={desc} setDesc={setDesc} error={error} />
      <h1 className="text-white text-2xl">Catatan Aktif</h1>
      <div className="flex flex-wrap justify-start gap-[29px] text-white">
        {filteredActiveTodo.length == 0 ? (
          <h1 className="mx-auto text-neutral-600">Tidak ada catatan aktif</h1>
        ) : (
          filteredActiveTodo.map((item) => <CardContent key={item.id} activeTodo={item} showFormattedDate={showFormattedDate} deleteTodo={() => handleDeleteTodo(item.id)} handleArchive={() => handleActiveToArchive(item.id)} />)
        )}
      </div>
      <h1 className="text-white text-2xl">Catatan Arsip</h1>
      <div className="flex flex-wrap justify-start gap-[29px] text-white">
        {filteredArchived.length == 0 ? (
          <h1 className="mx-auto text-neutral-600">Tidak ada arsip</h1>
        ) : (
          filteredArchived.map((item) => <CardContent key={item.id} activeTodo={item} showFormattedDate={showFormattedDate} deleteTodo={() => handleDeleteTodo(item.id)} handleArchive={() => handleArchiveToActive(item.id)} />)
        )}
      </div>
    </>
  );
}

export default TodoCard;
