import { ReactNode } from 'react'

const Modal = ({
    children,
    onClose,
}: {
    children: ReactNode
    onClose: () => void
}) => {
    return (
        <>
            {/* overlay */}
            <div
                onClick={onClose}
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.55)' }}
                className="absolute left-0 top-0 z-[100] h-screen w-screen overflow-hidden"
            ></div>
            {/* modal body */}
            <div className="absolute left-1/2 top-1/3 z-[101] h-[20rem] w-[20rem] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-4 opacity-100 md:h-[20rem] md:w-[30rem]">
                {children}
            </div>
        </>
    )
}

export default Modal
