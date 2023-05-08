import Button from '@/components/core/button'
import Input from '@/components/core/input'
import {
    faCloudArrowDown,
    faLink,
    faTrash,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'

export interface IResourceProps {}

export default function Resource(props: IResourceProps) {
    const [selected, setSelected] = useState<'file' | 'link'>('file')
    const [downloadableMaterials, setDownloadableMaterials] = useState<
        string[]
    >([])
    const [externalResources, setExternalResources] = useState<string[]>([])
    const [newResourceTitle, setNewResourceTitle] = useState('')
    const [newResourceURL, setNewResourceURL] = useState('')
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([])

    const deleteDownloadableMaterialItem = (index: number) => {
        const newList = [...downloadableMaterials]
        newList.splice(index, 1)
        setDownloadableMaterials(newList)
    }

    const getDownloadableMaterialsContent = () => {
        if (downloadableMaterials.length !== 0) {
            return (
                <div
                    className={`border-x ${
                        externalResources.length === 0 ? 'border-y' : 'border-t'
                    } border-black`}
                >
                    <div className="mx-10 py-5">
                        <div className="font-bold min-w-max mb-2">
                            Downloadable materials
                        </div>
                        <div className="space-y-2">
                            {downloadableMaterials.map((item, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between"
                                    >
                                        <div className="flex items-center space-x-3">
                                            <FontAwesomeIcon
                                                icon={faCloudArrowDown}
                                            ></FontAwesomeIcon>
                                            <div>{item}</div>
                                        </div>
                                        <FontAwesomeIcon
                                            icon={faTrash}
                                            className="text-xs bg-red-500 text-white rounded-full py-[7px] px-[8px] cursor-pointer"
                                            onClick={() =>
                                                deleteDownloadableMaterialItem(
                                                    index,
                                                )
                                            }
                                        />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            )
        }
    }

    const addExternalResourceItem = () => {
        setExternalResources([...externalResources, newResourceTitle])
    }

    const deleteExternalResourceItem = (index: number) => {
        const newList = [...externalResources]
        newList.splice(index, 1)
        setExternalResources(newList)
    }

    const getExternalResourcesContent = () => {
        if (externalResources.length !== 0) {
            return (
                <div className="border border-black">
                    <div className="mx-10 py-5">
                        <div className="font-bold min-w-max mb-2">
                            External resources
                        </div>
                        <div className="space-y-2">
                            {externalResources.map((item, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between"
                                    >
                                        <div className="flex items-center space-x-3">
                                            <FontAwesomeIcon
                                                icon={faLink}
                                            ></FontAwesomeIcon>
                                            <div>{item}</div>
                                        </div>
                                        <FontAwesomeIcon
                                            icon={faTrash}
                                            className="text-xs bg-red-500 text-white rounded-full py-[7px] px-[8px] cursor-pointer"
                                            onClick={() =>
                                                deleteExternalResourceItem(
                                                    index,
                                                )
                                            }
                                        />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            )
        }
    }

    const handleUploadFile = () => {
        const inputFile = document.createElement('input')
        inputFile.type = 'file'

        inputFile.click()

        inputFile.onchange = (e) => {
            const target = e.target as HTMLInputElement
            if (target.files && target.files[0]) {
                setUploadedFiles([...uploadedFiles, target.files[0]])
                setDownloadableMaterials([
                    ...downloadableMaterials,
                    target.files[0].name,
                ])
            }
        }
    }

    const updateNewResourceTitle = (value: string) => {
        setNewResourceTitle(value)
    }

    const updateNewResourceURL = (value: string) => {
        setNewResourceURL(value)
    }

    return (
        <div className="py-5 px-10">
            {getDownloadableMaterialsContent()}
            {getExternalResourcesContent()}
            <div className="relative border-b border-divider mt-14 mb-5">
                <div className="flex items-center space-x-7 absolute bottom-[-1px]">
                    <div
                        className={`${
                            selected === 'file' &&
                            'font-bold border-b-[3px] border-primary text-primary'
                        } cursor-pointer pb-1`}
                        onClick={() => setSelected('file')}
                    >
                        Downloadable File
                    </div>
                    <div
                        className={`${
                            selected === 'link' &&
                            'font-bold border-b-[3px] border-primary text-primary'
                        } cursor-pointer pb-1`}
                        onClick={() => setSelected('link')}
                    >
                        External Resource
                    </div>
                </div>
            </div>
            {selected === 'file' ? (
                <div className="space-y-4">
                    <Button onClick={() => handleUploadFile()}>
                        <div className="font-semibold">Upload file</div>
                    </Button>
                    <div className="text-description text-xs text-justify">
                        <span className="font-bold">Note</span>: A resource is
                        for any type of document that can be used to help
                        students in the lecture. This file is going to be seen
                        as a lecture extra. Make sure everything is legible and
                        the file size is less than 1 GiB.
                    </div>
                </div>
            ) : (
                <div className="space-y-5">
                    <Input
                        id="link-title"
                        charLimit={{ minLength: 10, maxLength: 60 }}
                        label="Title"
                        placeholder="Insert your course title."
                        updateInput={updateNewResourceTitle}
                    />
                    <Input
                        id="link"
                        label="URL"
                        placeholder="https://example.com"
                        updateInput={updateNewResourceURL}
                    />
                    <div className="flex justify-end">
                        <Button onClick={() => addExternalResourceItem()}>
                            <div className="font-semibold">Add link</div>
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}
