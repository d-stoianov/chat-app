const Message = ({ message }) => {
    const myMessageStyles = "text-zinc-200 self-end bg-sky-500 rounded-xl p-1 px-4 my-1.5 max-w-[50%]"
    const otherMessageStyles = "text-zinc-200 self-start bg-gray-500 rounded-xl p-1 px-4 my-1.5 max-w-[50%]"

    return (
        <>
            <p className="text-zinc-200 ml-2">
                {message.username}
            </p>
            <div className={otherMessageStyles}>
                {message.text}
                <p>
                    {message.timeStamp}
                </p>
            </div>
        </>
    )
}

export default Message