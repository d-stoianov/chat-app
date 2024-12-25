import { ReactNode } from 'react'

interface ModalProps {
    onClose: () => void
    children: ReactNode
}

const Modal = ({ onClose, children }: ModalProps) => {
    return (
        <>
            {/* overlay */}
            <div
                onClick={onClose}
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.55)' }}
                className="fixed left-0 top-0 z-[100] h-full w-full overflow-hidden"
            ></div>
            {/* modal body */}
            <div className="fixed left-1/2 top-1/3 z-[101] h-[20rem] w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-4 opacity-100 sm:h-[24rem] sm:w-[32rem] md:w-[38rem] lg:w-[40rem]">
                {children}
            </div>
        </>
    )
}

export default Modal
