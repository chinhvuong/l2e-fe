import React, { HTMLAttributes } from 'react'
import './style.scss'

type Props = {
    type?: 'radio' | 'checkbox'
    checked?: boolean
    keyPass?: string | number
    // eslint-disable-next-line no-unused-vars
    onToggle: (val: boolean, key: string | number) => void
}

function Checkbox({
    type = 'radio',
    checked,
    keyPass = '',
    onToggle,
}: Props & HTMLAttributes<HTMLDivElement>) {
    return (
        <label
            className={`inline-block checkbox-${type}`}
            data-checked={!!checked}
            data-key={keyPass}
        >
            <input
                type="checkbox"
                className="hidden"
                onChange={() => onToggle && onToggle(!!!checked, keyPass)}
                checked={!!checked}
            />
            <div className="dot"></div>
        </label>
    )
}

export default Checkbox
