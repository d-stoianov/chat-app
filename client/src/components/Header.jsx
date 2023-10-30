import Logout from "./Logout"

const Header = ({ isLoggedIn }) => {
    return (
        <header className="bg-zinc-900 w-full py-6 flex justify-center items-center">
            <h1 className="text-zinc-200 font-bold text-center">
                Let&apos;s chat ! 💭
            </h1>
            <div className="absolute right-4">{isLoggedIn && <Logout />}</div>
        </header>
    )
}

export default Header
