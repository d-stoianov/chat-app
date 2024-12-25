import { twMerge } from 'tailwind-merge'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string
    children: React.ReactNode
}

const Button = ({ className, children, ...props }: ButtonProps) => {
    const defaultClassName =
        'rounded-lg bg-blue-500 text-center text-white hover:bg-blue-600'
    const mergedClassName = twMerge(defaultClassName, className)
    return (
        <button className={mergedClassName} {...props}>
            {children}
        </button>
    )
}

export default Button
