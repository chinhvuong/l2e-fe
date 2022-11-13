import { HTMLAttributes } from 'react'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export interface IAddMoreButtonProps {
    label: string
}

export default function AddMoreButton({
    label,
    ...rest
}: IAddMoreButtonProps & HTMLAttributes<HTMLDivElement>) {
    return (
        <div className="flex items-center space-x-3 cursor-pointer" {...rest}>
            <FontAwesomeIcon icon={faPlus} className="text-xl text-primary" />
            <div className="font-semibold text-primary">{label}</div>
        </div>
    )
}
