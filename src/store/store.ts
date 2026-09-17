import { configureStore } from '@reduxjs/toolkit'
import jobsReducer from './storeSlice'
import { useDispatch, useSelector } from 'react-redux'

export const store = configureStore({
    reducer: { jobsSlice: jobsReducer },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
// Export hooks that can be reused to resolve types
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
