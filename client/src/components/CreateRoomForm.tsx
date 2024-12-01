const CreateRoomForm = () => {
    return (
        <>
            <form
                className="flex h-full w-full flex-col justify-around"
                onSubmit={(e) => e.preventDefault()}
            >
                <h1 className="text-center text-lg">Create room</h1>
                <div className="flex flex-col gap-2">
                    <input
                        className="rounded-lg px-2 py-1.5"
                        placeholder="Name"
                        type="text"
                    />
                    <textarea
                        className="h-[8rem] px-2 py-1.5 resize-none"
                        placeholder="Description"
                    />
                </div>
                <button className="h-[2rem] w-[8rem] self-center rounded-lg bg-blue-500 text-sm text-white">
                    Create
                </button>
            </form>
        </>
    )
}

export default CreateRoomForm
