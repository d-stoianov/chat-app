import { twMerge } from 'tailwind-merge'

interface LayoutProps {
    className?: string
    children: React.ReactNode
}

const BaseLayout = ({ className, children }: LayoutProps) => {
    const defaultClassName =
        'flex h-full w-full flex-col items-center bg-lightGray'
    const mergedClassName = twMerge(defaultClassName, className)

    return <main className={mergedClassName}>{children}</main>
}

export default BaseLayout
