import LoadingScreen from '@/components/core/animate/loading-screen'
import CertificateCard from '@/components/core/certificate-card'
import Divider from '@/components/core/divider'
import CertificateModal from '@/components/core/modal/certification-modal'
import Select from '@/components/core/select'
import Search from '@/components/common/search'
import useHideFirstEnterLoadingScreen from '@/hooks/useHideFirstEnterLoadingScreen'
import { Certificate } from '@/store/certification/types'
import { useState } from 'react'
import {
    SortLabelCertificate,
    useUpdateProfileContext,
} from '../update-profile-context'
import Pagination from '@/components/core/pagination'

export default function CertificationsList() {
    const {
        certificationsList,
        isLoading,
        setSearch,
        sortBy,
        setSortBy,
        totalPage,
        setPageNumber,
    } = useUpdateProfileContext()
    const [isShowCertificate, setShowCertification] = useState(false)
    const [selectedCertification, setSelectedCertification] =
        useState<Certificate>()

    const handleChosenCertification = (certification: Certificate) => {
        setShowCertification(!isShowCertificate)
        setSelectedCertification(certification)
    }

    const handleSortChange = (value: string) => {
        setSortBy(value)
    }

    useHideFirstEnterLoadingScreen()

    return (
        <>
            <LoadingScreen isLoading={isLoading} />
            <div className="h-full pt-9 px-[3.5rem]">
                <div className="font-semibold text-[30px] px-4">
                    Certificates
                </div>
                <div className="flex under_xl:block space-x-5 under_xl:space-x-0 px-4">
                    <Search
                        darkTheme={false}
                        setSearch={setSearch}
                        className="mt-3"
                    />
                    <div className="w-[220px]">
                        <Select
                            label="Sort by"
                            selectList={Object.values(SortLabelCertificate)}
                            placeholder="Select sorting"
                            selected={sortBy}
                            setSelected={handleSortChange}
                        />
                    </div>
                </div>
                <div className="mt-10">
                    {certificationsList?.map((certification, index) => (
                        <div
                            key={index}
                            onClick={() =>
                                handleChosenCertification(certification)
                            }
                            className={`${
                                index === certificationsList.length - 1 &&
                                'pb-6'
                            }`}
                        >
                            <CertificateCard
                                key={certification._id}
                                data={certification}
                            />
                            {index !== certificationsList.length - 1 && (
                                <Divider />
                            )}
                        </div>
                    ))}
                    {certificationsList.length === 0 && (
                        <div className="flex justify-center text-xl font-bold my-10">
                            No results found.
                        </div>
                    )}
                    <Pagination
                        totalPage={totalPage}
                        setPageNumber={setPageNumber}
                    />
                    <CertificateModal
                        isShow={isShowCertificate}
                        setIsShow={setShowCertification}
                        certificate={selectedCertification as Certificate}
                    />
                </div>
            </div>
        </>
    )
}
