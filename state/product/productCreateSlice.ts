import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProductType, MediaType, ClassifyType, VariantType } from './types'

const initialState: ProductType = {
    photos: [
        {
            url: '',
            file: null,
        },
        {
            url: '',
            file: null,
        },
        {
            url: '',
            file: null,
        },
        {
            url: '',
            file: null,
        },
        {
            url: '',
            file: null,
        },
        {
            url: '',
            file: null,
        },
        {
            url: '',
            file: null,
        },
    ],
    generalInfo: {
        name: '',
        description: '',
        price: '',
        promotionPrice: '',
    },
    category: '0',
    classify: [
        {
            name: '',
            options: [],
            label: '',
        },
        {
            name: '',
            options: [],
            label: '',
        },
        {
            name: '',
            options: [],
            label: '',
        },
    ],
    fund: '0',
    variants: [],
}
export type generalKeys = keyof typeof initialState.generalInfo

export const productCreate = createSlice({
    name: 'productCreateSlice',
    initialState,
    reducers: {
        updateGeneralInfo: (
            state: ProductType,
            action: PayloadAction<{ field: generalKeys; value: string }>,
        ) => {
            const { field, value } = action.payload
            state.generalInfo[field] = value
        },
        updateCategory: (state: ProductType, action: PayloadAction<string>) => {
            state.category = action.payload.trim()
        },

        updateClassify: (
            state: ProductType,
            action: PayloadAction<{ index: number; value: ClassifyType }>,
        ) => {
            const { index, value } = action.payload
            if (index < state.classify.length) {
                state.classify[index] = value
            }
        },

        updatePhoto: (
            state: ProductType,
            action: PayloadAction<{ index: number; value: MediaType }>,
        ) => {
            const { value, index } = action.payload
            if (index >= 0 && index < state.photos.length) {
                state.photos[index] = value
            }
        },

        calculateVariants: (state: ProductType) => {
            const newVariants: VariantType[] = []

            for (let i = 0; i < state.classify[0].options.length; i++) {
                for (let j = 0; j < state.classify[1].options.length; j++) {
                    for (let z = 0; z < state.classify[2].options.length; z++) {
                        newVariants.push({
                            name:
                                state.classify[0].options[i] +
                                '/' +
                                state.classify[1].options[j] +
                                '/' +
                                state.classify[2].options[z],
                            price: '',
                            promotionPrice: '',
                            quantity: '',
                        })
                    }

                    if (state.classify[2].options.length === 0) {
                        newVariants.push({
                            name:
                                state.classify[0].options[i] +
                                '/' +
                                state.classify[1].options[j],
                            price: '',
                            promotionPrice: '',
                            quantity: '',
                        })
                    }
                }
                if (state.classify[1].options.length === 0) {
                    newVariants.push({
                        name: state.classify[0].options[i],
                        price: '',
                        promotionPrice: '',
                        quantity: '',
                    })
                }
            }

            for (let i = 0; i < newVariants.length; i++) {
                const index = state.variants.findIndex(
                    (item) => item.name === newVariants[i].name,
                )
                if (index >= 0) {
                    newVariants[i].price = state.variants[index].price
                    newVariants[i].promotionPrice =
                        state.variants[index].promotionPrice
                    newVariants[i].quantity = state.variants[index].quantity
                }
            }

            state.variants = newVariants
        },
        updateVariant: (
            state: ProductType,
            action: PayloadAction<{ index: number; value: VariantType }>,
        ) => {
            const { index, value } = action.payload

            if (index < state.variants.length) {
                state.variants[index] = value
            }
        },

        fillPatch: (
            state: ProductType,
            action: PayloadAction<{
                price: string
                promotionPrice: string
                quantity: string
            }>,
        ) => {
            const { price, promotionPrice, quantity } = action.payload

            for (let i = 0; i < state.variants.length; i++) {
                state.variants[i].price = price
                state.variants[i].promotionPrice = promotionPrice
                state.variants[i].quantity = quantity
            }
        },
        updateFund: (state: ProductType, action: PayloadAction<string>) => {
            state.fund = action.payload
        },
        resetCreateProduct: () => {
            return initialState
        },
    },
    extraReducers: (builder) => {
        builder
    },
})

export const {
    updateGeneralInfo,
    updateCategory,
    updatePhoto,
    updateClassify,
    calculateVariants,
    updateVariant,
    fillPatch,
    updateFund,
    resetCreateProduct,
} = productCreate.actions

export default productCreate.reducer
