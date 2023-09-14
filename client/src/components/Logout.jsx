import Service from "../services/service"

const Logout = () => {
    const service = new Service()

    const handleLogout = () => {
        service.logout().then(() => window.location.reload(false))
    }

    return (
        <>
            <h1 
                onClick={() => handleLogout()}
                className="cursor-pointer text-zinc-200" 
            >
                Logout
            </h1>
        </>
    )
}

export default Logout