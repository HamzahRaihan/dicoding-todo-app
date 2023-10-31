/* eslint-disable react/prop-types */
function ArchiveButton(props) {
  return (
    <>
      <button className="w-full p-2 rounded-lg bg-white text-black hover:opacity-90 active:opacity-80" onClick={props.handleArchive}>
        {props.children}
      </button>
    </>
  );
}

export default ArchiveButton;
