import { Message } from '@/entities/Message'

interface MessageProps {
    msg: Message
    isMirrored: boolean
}

const MessageCard = ({ msg, isMirrored = false }: MessageProps) => {
    return (
        <div
            className={`flex w-full flex-col ${isMirrored ? 'items-end' : 'items-start'}`}
        >
            <p className="px-1 text-center">{msg.sender.name}</p>

            <div
                className={`max-w-[90%] justify-between rounded-xl px-3 py-1 ${isMirrored ? 'bg-blue-500 text-white' : 'bg-lightGray text-black'}`}
            >
                <span className="break-words">
                    <p>{msg.text}</p>
                    <p className="w-full text-end text-[0.75rem]">
                        {msg.formattedTime}
                    </p>
                </span>
            </div>
        </div>
    )
}

export default MessageCard
