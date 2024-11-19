import { Socket } from 'socket.io-client'

const Chat = ({ socket }: { socket: Socket }) => {
    console.log('socket: ', socket)

    return (
        <main className="flex h-full w-full flex-col items-center bg-slate-800 px-8">
            <h1 className="py-4 text-center text-2xl text-white">
                Welcome to the chat
            </h1>
            <section className="relative w-full flex-grow rounded-t-2xl bg-slate-400 sm:w-[30rem]">
                <div className="absolute bottom-0 left-0 flex h-[4rem] w-full items-center gap-6 bg-slate-700 px-6">
                    <input
                        type="text"
                        className="h-[2rem] w-full rounded-md px-2 outline-none"
                    />
                    <button className="rounded-md px-6 py-1 text-white outline outline-white hover:bg-slate-50 hover:text-black">
                        Send
                    </button>
                </div>
            </section>
        </main>
    )
}

export default Chat
