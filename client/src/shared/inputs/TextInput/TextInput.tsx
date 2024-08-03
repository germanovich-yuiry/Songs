import styles from "./Input.module.scss"

const Input = ({ type, onChange, value, id, name }) => {
  return (
    <label htmlFor={id}>
      <input
        type={type}
        value={value}
        id={id}
        name={name}
        onChange={onChange}
      />
    </label>
  )
}

export default Input
