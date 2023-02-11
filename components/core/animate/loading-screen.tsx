import * as React from 'react'

interface ILoadingScreenProps {
    isLoading: boolean
}

export default function LoadingScreen({ isLoading }: ILoadingScreenProps) {
    if (isLoading) {
        return (
            <div className="flex justify-center fixed z-50 w-full h-full bg-gray-700 bg-opacity-50">
                <div className="fixed z-50 top-1/2">
                    <svg
                        className="animate-spin h-10 w-10 text-primary"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                    </svg>
                </div>
            </div>
        )
    }
    return <></>
}