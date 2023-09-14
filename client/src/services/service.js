import Cookie from "./cookie"

class Service {
    constructor() {
        this.url = "http://localhost:5000"
        this.tokenCookieName = "jwt"
    }

    async login(username, userPicture) {
        try {
            const response = await fetch(`${this.url}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username: username, userPicture: userPicture })
            })
            const data = await response.json()
            
            if (data.token) {
                Cookie.set(this.tokenCookieName, data.token)
                Cookie.set("username", username)
            }
            
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
            const response = await fetch(`${this.url}/logout`, {
                method: "POST",
                headers: {
                    "Authorization": token
                },
            })

            if (response.ok) {
                const data = await response.json()
                Cookie.delete(this.tokenCookieName)
                Cookie.delete("username")
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
            const response = await fetch(`${this.url}/messages`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token
                }
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

        try {
            const response = await fetch(`${this.url}/messages`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token
                },
                body: JSON.stringify({ text: text })
            })
            
            const data = await response.json()
            return data
        } catch (error) {
            console.error(error)
        }
    }
}

export default Service