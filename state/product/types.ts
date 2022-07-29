export type MediaType = {
    url?: string
    file?: File | null
}

export type ClassifyType = {
    name: string
    options: string[]
    label: string
}

export type VariantType = {
    name: string
    price: string
    promotionPrice: string
    quantity: string
}

export type ProductType = {
    generalInfo: {
        name: string
        description: string
        price: string
        promotionPrice: string
    }
    category: string

    photos: MediaType[]

    classify: ClassifyType[]
    fund: string

    variants: VariantType[]
}
