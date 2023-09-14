    class Cookie {
        static set(name, value) {
            const expires = new Date(Date.now() + (24 * 60 * 60 * 1000)).toUTCString() // 1 day
            document.cookie = `${name}=${value}; expires=${expires}; path=/`
        }

        static get(name) {
            const cookieValue = document.cookie
                .split("; ")
                .find(row => row.startsWith(`${name}=`))
                ?.split("=")[1]
            return cookieValue || null
        }

        static delete(name) {
            const expires = new Date(0).toUTCString()
            document.cookie = `${name}=; expires=${expires}; path=/`
        }
    }

    export default Cookie