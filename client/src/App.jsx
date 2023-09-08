import Chat from "./components/Chat"
import Header from "./components/Header"

const App = () => {
    return (
        <div className="h-screen flex flex-col">
            <Header />
            <Chat />
        </div>
    )
}

export default App