/* eslint-disable react/prop-types */
import ArchiveButton from '../ArchiveButton';
import DeleteButton from '../DeleteButton';

function CardContent({ todo, deleteTodo, handleArchive, showFormattedDate }) {
  const { id, createdAt, body, title, archived } = todo;
  return (
    <>
      <div className="border hover:bg-neutral-900 transition-all duration-75 rounded-lg border-neutral-700 h-80 lg:w-[23%] md:w-[48%] sm:w-full min-[320px]:w-full max-[320px]:w-full" key={id}>
        <div className="p-4 flex flex-col  h-full gap-2">
          <div className="flex flex-col">
            <h1>{title}</h1>
            <p className="text-sm text-neutral-400 pb-2">{showFormattedDate(createdAt)}</p>
          </div>
          <p className="text-sm text-neutral-300">{body}</p>
          <div className="flex gap-2 justify-between mt-auto">
            <DeleteButton deleteTodo={deleteTodo} />
            <ArchiveButton handleArchive={handleArchive}>{archived ? 'Pindahkan' : 'Arsipkan'}</ArchiveButton>
          </div>
        </div>
      </div>
    </>
  );
}

export default CardContent;
