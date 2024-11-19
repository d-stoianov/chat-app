import { Socket } from 'socket.io-client'

const Chat = ({ socket }: { socket: Socket }) => {
    console.log('socket: ', socket)

    return (
        <main className="flex h-full w-full flex-col items-center bg-slate-800">
            <h1 className="mt-10 text-2xl text-white">Welcome to the chat</h1>
        </main>
    )
}

export default Chat
