import { showFormattedDate } from '../../utils';
import CardContent from './CardContent';
import TodoSearch from './TodoSearch';
import TodoInput from './TodoInput';
import { useContext } from 'react';
import TodoContext from '../context/TodoContext';

function TodoCard() {
  const ctx = useContext(TodoContext);

  return (
    <>
      <TodoSearch type="text" placeholder="Cari catatan" handleSearchTodo={ctx.handleSearchTodo} search={ctx.search} />
      <TodoInput handleAddTodo={ctx.handleAddTodo} input={ctx.input} setInput={ctx.setInput} desc={ctx.desc} setDesc={ctx.setDesc} error={ctx.error} />
      <h1 className="text-white text-2xl">Catatan Aktif</h1>
      <div className="flex flex-wrap justify-start gap-[29px] text-white">
        {ctx.filteredActiveTodo.length == 0 ? (
          <h1 className="mx-auto text-neutral-600">Tidak ada catatan aktif</h1>
        ) : (
          ctx.filteredActiveTodo.map((item) => <CardContent key={item.id} todo={item} showFormattedDate={showFormattedDate} deleteTodo={() => ctx.handleDeleteTodo(item.id)} handleArchive={() => ctx.handleActiveToArchive(item.id)} />)
        )}
      </div>
      <h1 className="text-white text-2xl">Catatan Arsip</h1>
      <div className="flex flex-wrap justify-start gap-[29px] text-white">
        {ctx.filteredArchived.length == 0 ? (
          <h1 className="mx-auto text-neutral-600">Tidak ada arsip</h1>
        ) : (
          ctx.filteredArchived.map((item) => <CardContent key={item.id} todo={item} showFormattedDate={showFormattedDate} deleteTodo={() => ctx.handleDeleteTodo(item.id)} handleArchive={() => ctx.handleArchiveToActive(item.id)} />)
        )}
      </div>
    </>
  );
}

export default TodoCard;
