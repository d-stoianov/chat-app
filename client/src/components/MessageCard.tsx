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
                className={`flex max-w-[90%] justify-between gap-2 rounded-xl px-3 py-1 text-black ${isMirrored ? 'bg-lightYellow' : 'bg-lightGray'}`}
            >
                <p className="py-1">{msg.text}</p>
                <p className="self-end text-[0.75rem]">{msg.formattedTime}</p>
            </div>
        </div>
    )
}

export default MessageCard
