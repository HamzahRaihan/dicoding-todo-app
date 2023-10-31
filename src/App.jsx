import TodoList from './components/Todo/TodoList';

function App() {
  return (
    <>
      <div className="font-inter">
        <div className="flex flex-col max-w-6xl mx-auto p-5">
          <TodoList />
        </div>
      </div>
    </>
  );
}

export default App;
