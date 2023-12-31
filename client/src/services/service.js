import Cookie from "./cookie"
import { io } from "socket.io-client"

// TODO make context

const url = import.meta.env.VITE_SERVER_URL || "http://localhost:8080"

const socket = io(url, {
    autoConnect: false,
})

class Service {
    constructor() {
        this.tokenCookieName = "jwt"
    }

    addReceiveMessageListener(cb) {
        socket.on("receiveMessage", cb)
    }

    removeReceiveMessageListener() {
        socket.off("receiveMessage")
    }

    async login(username, userPicture) {
        try {
            const response = await fetch(`${url}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username,
                    userPicture: userPicture,
                }),
            })
            const data = await response.json()

            if (data.token) {
                Cookie.set(this.tokenCookieName, data.token)
                Cookie.set("username", username)
            }

            socket.connect()

            return data
        } catch (error) {
            console.error(error)
        }
    }

    async logout() {
        const token = Cookie.get(this.tokenCookieName)

        if (!token) {
            console.error("Token not found in cookie")
            return
        }

        try {
            const response = await fetch(`${url}/logout`, {
                method: "POST",
                headers: {
                    Authorization: token,
                },
            })

            if (response.ok) {
                const data = await response.json()
                Cookie.delete(this.tokenCookieName)
                Cookie.delete("username")
                socket.disconnect()
                return data
            }
        } catch (error) {
            console.error(error)
        }
    }

    async getMessages() {
        const token = Cookie.get(this.tokenCookieName)

        if (!token) {
            console.error("Token not found in cookie")
            return
        }

        try {
            const response = await fetch(`${url}/messages`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
            })
            const data = await response.json()
            return data
        } catch (error) {
            console.error(error)
        }
    }

    async sendMessage(text) {
        const token = Cookie.get(this.tokenCookieName)

        if (!token) {
            console.error("Token not found in cookie")
            return
        }

        socket.emit(
            "sendMessage",
            { text, username: Cookie.get("username"), userPicture: "123" },
            (res) => {
                return res
            }
        )
    }
}

const service = new Service()

export default service
