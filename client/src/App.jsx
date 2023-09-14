import { useEffect, useState } from "react"
import Chat from "./components/Chat"
import Header from "./components/Header"
import Login from "./components/Login"
import Cookie from "./services/cookie"

const App = () => {
    const jwt = Cookie.get("jwt")
    const [isLoggedIn, setLoggedIn] = useState(jwt ?? false)
    const [username, setUsername] = useState("")

    const handleLogin = () => {
        setLoggedIn(true)
    }

    useEffect(() => {
        setUsername(Cookie.get("username"))
    }, [jwt, username])

    return (
        <div className="h-screen flex flex-col">
            <Header isLoggedIn={isLoggedIn} />
            {isLoggedIn ? <Chat username={username} /> : <Login handleLogin={handleLogin} />}
        </div>
    )
}

export default App