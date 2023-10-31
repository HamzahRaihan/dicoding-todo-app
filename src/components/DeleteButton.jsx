/* eslint-disable react/prop-types */
function DeleteButton(props) {
  return (
    <>
      <button className="w-full p-2 rounded-lg hover:bg-neutral-950 transition-all" onClick={props.deleteTodo}>
        Hapus
      </button>
    </>
  );
}

export default DeleteButton;
