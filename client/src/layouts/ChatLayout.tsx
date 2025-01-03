import BaseLayout from '@/layouts/BaseLayout'

interface ChatLayoutProps {
    heading: string
    subheading?: string
    children: React.ReactNode
}

const ChatLayout = ({ heading, subheading, children }: ChatLayoutProps) => {
    return (
        <BaseLayout className="px-8 py-6">
            <div className="flex flex-col gap-2 max-w-[36rem]">
                <h1 className="text-center text-2xl text-black">{heading}</h1>
                <h2 className="text-sm text-center text-black">{subheading}</h2>
            </div>
            <section className="mt-[1rem] flex h-[46rem] w-full flex-col overflow-hidden rounded-xl bg-white sm:h-[60rem] sm:w-[30rem] md:h-[70rem] xl:w-[38rem]">
                {children}
            </section>
        </BaseLayout>
    )
}

export default ChatLayout
