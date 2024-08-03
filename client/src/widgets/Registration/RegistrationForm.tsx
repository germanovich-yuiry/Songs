import styles from "./RegistrationForm.module.scss"
import SignUpSchema from "./schema"

import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

import { useState } from "react"

import { Button, InputLabel, TextField } from "@mui/material"
import CircularProgress from "@mui/material/CircularProgress"

import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  getToken,
  selectMessage,
  selectToken,
  selectTokenStatus,
} from "../../services/RegistrationAPI/registrationSlice"

const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(SignUpSchema),
  })

  const dispatch = useAppDispatch()
  const token = useAppSelector(selectToken)
  const status = useAppSelector(selectTokenStatus)
  const message = useAppSelector(selectMessage)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")

  const createUserHandler = async data => {
    console.log(data)
    dispatch(getToken({ email, password, name }))
    setEmail("")
    setPassword("")
    setName("")
  }

  return (
    <form
      onSubmit={handleSubmit(createUserHandler)}
      className={styles["registration-form"]}
    >
      <h3>Регистрация пользователя</h3>
      <p style={{ color: "green", fontWeight: "bolder" }}>{message}</p>
      <p>{status} </p>
      <p>{token && "Токен получен"}</p>
      <InputLabel htmlFor="name">Name</InputLabel>{" "}
      <TextField
        {...register("name")}
        type="text"
        id="name"
        name="name"
        onChange={e => setName(e.target.value)}
        value={name}
        variant="outlined"
        style={{ width: "400px", marginBottom: "20px" }}
      />
      <p
        className={
          errors.name ? styles["error-box--open"] : styles["error-box"]
        }
      >
        Введите имя!
      </p>
      <InputLabel htmlFor="email">Email</InputLabel>{" "}
      <TextField
        {...register("email")}
        type="text"
        id="email"
        name="email"
        onChange={e => setEmail(e.target.value)}
        value={email}
        variant="outlined"
        style={{ width: "400px" }}
      />
      <p
        className={
          errors.name ? styles["error-box--open"] : styles["error-box"]
        }
      >
        Введите валидный email!
      </p>
      <InputLabel htmlFor="password">Password</InputLabel>{" "}
      <TextField
        {...register("password")}
        type="password"
        id="password"
        name="password"
        onChange={e => setPassword(e.target.value)}
        value={password}
        variant="outlined"
        style={{ width: "400px" }}
      />
      <p
        className={
          errors.password ? styles["error-box--open"] : styles["error-box"]
        }
      >
        Введите валидный пароль!
      </p>
      <br />
      <br />
      <Button
        type="submit"
        variant="outlined"
        fullWidth
        style={{
          width: "400px",
          height: "50px",
          backgroundColor: "orange",
        }}
      >
        {status === "loading" ? <CircularProgress /> : "Отправить данные"}
      </Button>
    </form>
  )
}

export default RegistrationForm
