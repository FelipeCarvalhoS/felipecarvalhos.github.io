export default function UnstyledButton({
    children,
    className = '',
    ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button {...props} className={`btn-unstyled ${className}`}>
            {children}
        </button>
    )
}
