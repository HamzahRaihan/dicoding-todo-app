/* eslint-disable react/prop-types */
function Button(props) {
  return (
    <>
      <button className="w-full p-2 rounded-lg bg-white text-black hover:opacity-90 active:opacity-80">{props.children}</button>
    </>
  );
}

export default Button;
