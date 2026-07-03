function Input({ type, placeholder, name, value, onChange }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      className="input"
    />
  );
}

export default Input;