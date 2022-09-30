import * as React from 'react'

export default function Company() {
    return (
        <div className="space-y-10 mx-10 xl:mx-[150px] md:mx-[10px] sm:mx-[50px]">
            <div className="text-center text-[#696984] font-medium mt-10 text-lg">
                Trusted by 5,000+ Companies Worldwide
            </div>
            <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-10">
                <img src="/svgs/logos/google-logo.svg" alt="google-logo" />
                <img src="/svgs/logos/netflix-logo.svg" alt="netflix-logo" />
                <img src="/svgs/logos/airbnb-logo.svg" alt="airbnb-logo" />
                <img src="/svgs/logos/amazon-logo.svg" alt="amazon-logo" />
                <img src="/svgs/logos/facebook-logo.svg" alt="facebook-logo" />
                <img src="/svgs/logos/grab-logo.svg" alt="grab-logo" />
            </div>
        </div>
    )
}
