import CertificateCard from '@/components/core/certificate-card'
import Divider from '@/components/core/divider'
import { Certificate } from '@/store/certification/types'

export interface StaticCertificateProps {
    certificates: Certificate[]
}

export default function StaticCertificationsList(
    props: StaticCertificateProps,
) {
    return (
        <>
            <div className="h-full pt-9 px-[3.5rem]">
                <div className="font-semibold text-[30px] px-4">
                    Certificates
                </div>
                <div className="flex under_xl:block space-x-5 under_xl:space-x-0 px-4"></div>
                <div className="mt-10">
                    {props.certificates?.map((certification, index) => (
                        <div
                            key={index}
                            className={`${
                                index === props.certificates.length - 1 &&
                                'pb-6'
                            }`}
                        >
                            <CertificateCard
                                key={certification._id}
                                data={certification}
                            />
                            {index !== props.certificates.length - 1 && (
                                <Divider />
                            )}
                        </div>
                    ))}
                    {props.certificates?.length === 0 && (
                        <div className="flex justify-center text-xl font-bold my-10">
                            No results found.
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
