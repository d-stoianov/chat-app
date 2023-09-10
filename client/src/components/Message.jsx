const Message = ({ message }) => {
    const myMessageStyles = "text-zinc-200 self-end bg-sky-500 rounded-xl p-1 px-4 my-1.5 max-w-[50%]"
    const otherMessageStyles = "text-zinc-200 self-start bg-gray-500 rounded-xl p-1 px-4 my-1.5 max-w-[50%]"

    return (
        <div className={otherMessageStyles}>
            {message}
        </div>
    )
}

export default Message