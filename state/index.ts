import { combineReducers, configureStore } from '@reduxjs/toolkit'
import productCreateSlice from './product/productCreateSlice'

// import diaryListSlice from './diary/diaryListSlice'

const reducer = combineReducers({
    productCreate: productCreateSlice,
})

const paths = [0, 1, 2, 3, 4, 5, 6].map((i) => `productCreate.photos.${i}.file`)
console.log('🚀 ~ file: index.ts ~ line 12 ~ paths', paths)

export const store = configureStore({
    reducer: reducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['productCreateSlice/updatePhoto'],

                // Ignore these field paths in all actions
                // ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
                // Ignore these paths in the state
                ignoredPaths: [
                    'productCreate.photos.1.file',
                    ...paths,
                    // 'diaryCreate.media.result.file',
                ],
            },
        }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
