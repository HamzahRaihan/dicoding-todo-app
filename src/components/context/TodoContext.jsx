/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from 'react';
import { getInitialData } from '../../utils';

const TodoContext = createContext({
  filteredArchived: [],
  filteredActiveTodo: [],
  input: '',
  desc: '',
  setInput: '',
  setDesc: '',
  error: false,
  search: '',
  handleAddTodo: () => {},
  handleDeleteTodo: () => {},
  handleActiveToArchive: () => {},
  handleArchiveToActive: () => {},
  handleSearchTodo: () => {},
});

export default TodoContext;

export const TodoContextProvider = ({ children }) => {
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
    <TodoContext.Provider
      value={{
        input: input,
        desc: desc,
        setInput: setInput,
        setDesc: setDesc,
        error: error,
        search: search,
        filteredActiveTodo: filteredActiveTodo,
        filteredArchived: filteredArchived,
        handleAddTodo: handleAddTodo,
        handleActiveToArchive: handleActiveToArchive,
        handleArchiveToActive: handleArchiveToActive,
        handleDeleteTodo: handleDeleteTodo,
        handleSearchTodo: handleSearchTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
