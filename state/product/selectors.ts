import { RootState } from '..'

export const selectProduct = (state: RootState) => {
    return state.productCreate
}

export const selectProductMedia = (state: RootState) => {
    return state.productCreate.photos
}

export const selectProductCategory = (state: RootState) => {
    return state.productCreate.category
}

export const selectProductGeneralInfo = (state: RootState) => {
    return state.productCreate.generalInfo
}

export const selectProductClassify = (state: RootState) => {
    return state.productCreate.classify
}

export const selectProductVariants = (state: RootState) => {
    return state.productCreate.variants
}

export const selectProductFund = (state: RootState) => {
    return state.productCreate.fund
}
