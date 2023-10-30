import { useState } from "react"
import service from "../services/service"

const Login = ({ handleLogin }) => {
    const [username, setUsername] = useState(null)
    // const [image, setImage] = useState(null)

    // function handleImageUpload(e) {
    //     const file = e.target.files[0]

    //     if (file) {
    //         setImage(file)
    //     }
    // }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const trimmedUsername = username.trim()

        if (!trimmedUsername.length) {
            alert("Invalid username")
        } else {
            const data = await service.login(trimmedUsername)

            if (data.message) {
                alert("Username is already taken")
            } else {
                handleLogin()
            }
        }
    }

    return (
        <>
            <main className="flex justify-center h-full bg-gray-800">
                <form
                    onSubmit={(e) => handleSubmit(e)}
                    className="mt-10 md:w-[30%] w-[70%] flex flex-col gap-3"
                >
                    <label className=" text-sm font-medium text-white">
                        Choose your username
                    </label>
                    <input
                        type="text"
                        placeholder="John"
                        required
                        className="text-sm rounded-lg border px-2 p-1 bg-gray-200 border-gray-600 placeholder-gray-400 text-black outline-none"
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <label className="text-sm font-medium text-white">
                        Upload picture
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        className="text-sm text-gray-300 border border-gray-600 rounded-lg cursor-pointer bg-gray-700"
                        // onChange={(e) => handleImageUpload(e)}
                    />
                    <button
                        type="submit"
                        className="mt-5 text-white text-center bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2"
                    >
                        Let&apos;s chat !
                    </button>
                </form>
            </main>
        </>
    )
}

export default Login
