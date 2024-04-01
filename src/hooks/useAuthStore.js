import {useDispatch, useSelector} from "react-redux"
import calendarApi from "../api/calendarApi"
import {
  cheking,
  clearErrorMessage,
  onLogin,
  onLogout,
  onLogoutCalendar,
} from "../store"

export const useAuthStore = () => {
  const {status, user, errorMessage} = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const startLogin = async ({email, password}) => {
    dispatch(cheking)
    try {
      const {data} = await calendarApi.post("/auth", {email, password})
      localStorage.setItem("token", data.token)
      dispatch(onLogin({name: data.name, uid: data.uid}))
    } catch (error) {
      console.log(error)
      dispatch(onLogout("Credenciales incorrectas"))
      setTimeout(() => {
        dispatch(clearErrorMessage())
      }, 10)
    }
  }

  const startRegister = async ({name, email, password}) => {
    dispatch(cheking)
    try {
      const {data} = await calendarApi.post("/auth/new", {
        name,
        email,
        password,
      })
      localStorage.setItem("token", data.token)
      dispatch(onLogin({name: data.name, uid: data.uid}))
    } catch (error) {
      console.log(error)
      dispatch(onLogout("Error al registrar, el email ya existe"))
      setTimeout(() => {
        dispatch(clearErrorMessage())
      }, 10)
    }
  }

  const startLogout = () => {
    localStorage.clear()
    dispatch(onLogoutCalendar())
    dispatch(onLogout())
  }

  const checkAuthToken = async () => {
    const token = localStorage.getItem("token")
    if (!token) return dispatch(onLogout())
    try {
      const {data} = await calendarApi.get("auth/renew")
      localStorage.setItem("token", data.token)
      dispatch(onLogin({name: data.name, uid: data.uid}))
    } catch (error) {
      localStorage.clear()
      dispatch(onLogout())
    }
  }

  return {
    status,
    user,
    errorMessage,
    startLogin,
    startRegister,
    checkAuthToken,
    startLogout,
  }
}
