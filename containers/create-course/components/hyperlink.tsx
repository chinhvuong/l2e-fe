import { HTMLAttributes, ReactNode, ReactText } from 'react'

export interface IHyperlinkProps {
    children: ReactNode | ReactText
}

export default function Hyperlink({
    children,
    ...rest
}: IHyperlinkProps & HTMLAttributes<HTMLButtonElement>) {
    return (
        <span
            {...rest}
            className="text-hyperlink-light underline underline-offset-4 cursor-pointer"
        >
            {children}
        </span>
    )
}
