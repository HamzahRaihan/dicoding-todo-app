/* eslint-disable react/prop-types */
function Input(props) {
  return (
    <>
      <input placeholder={props.placeholder} type={props.type} className={`p-2 border rounded-lg border-neutral-700 bg-black text-white ${props.inputStyle}`} value={props.input} onChange={props.handleMaxLength} />
    </>
  );
}

export default Input;
