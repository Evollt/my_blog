import { useAuthStore } from "@/stores/auth";
import axios from "@/axios";
import { ILogin } from "@/types/Auth";
import { IRegister } from "@/types/Auth";
import { toast } from "vue3-toastify";

export class User {
  static authStore = () => useAuthStore()
  static async login(loginData: ILogin) {
    return await axios.post('/api/login', {
      email: loginData.email,
      password: loginData.password
    }).then(async response => {
      localStorage.setItem('auth_token', response.data.token)

      await this.get()

      toast.success(`Добро пожаловать ${this.authStore().user?.name}`);
      return true
    }).catch(response => {

      // @ts-ignore
      for (const [key, value] of Object.entries(response.response.data.errors)) {
        // @ts-ignore
        toast.error(value[0]);
      }
      return false
    })
  }

  static async register(registerData: IRegister) {
    return await axios.post('/api/register', {
      name: registerData.name,
      email: registerData.email,
      password: registerData.password
    }).then(async response => {
      localStorage.setItem('auth_token', response.data.token)

      await this.get()

      toast.success(`Добро пожаловать ${this.authStore().user?.name}`);
      return true
    }).catch(response => {

      // @ts-ignore
      for (const [key, value] of Object.entries(response.response.data.errors)) {
        // @ts-ignore
        toast.error(value[0]);
      }
      return false
    })
  }

  static async get() {
    await axios.get('/api/user/get', {
      headers: {
        Authorization: "Bearer " + localStorage.getItem('auth_token')
      }
    }).then(response => {
      if (response.data.status) {
        this.authStore().user = response.data.data
      }
    })
  }

  static async logout() {
    await axios.get('/api/user/logout', {
      headers: {
        Authorization: "Bearer " + localStorage.getItem('auth_token')
      }
    }).then(() => {
      localStorage.removeItem('auth_token')

      window.location.reload()
    })
  }

  static async update(updateData: any) {

    return await axios.post('/api/user/update', {
      _method: 'put',
      ...updateData
    }, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem('auth_token')
      }
    }).then(() => {
      this.get()
      return true
    })

    return false
  }
}