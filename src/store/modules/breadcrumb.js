import { createSlice } from '@reduxjs/toolkit'

const breadcrumbStore = createSlice({
  name: 'breadcrumb',
  initialState: {
    breadcrumb: []
  },
  reducers: {
    setBreadcrumb(state, action) {
      state.breadcrumb = action.payload
    }
  }
})

const { setBreadcrumb } = breadcrumbStore.actions
const breadcrumbReducer = breadcrumbStore.reducer

export { setBreadcrumb }
export default breadcrumbReducer