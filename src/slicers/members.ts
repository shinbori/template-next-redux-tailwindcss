import { createSlice } from '@reduxjs/toolkit'
import { Person } from '../lib/types'

export default createSlice({
  name: 'members',
  initialState: [] as Person[],
  reducers: {
    addPerson: (state, action) => ([ ...state, { ...action.payload } ]),
    updatePerson: (state, action) => {
      const idx = state.findIndex(person => (person.id === action.payload.id))
      if (idx === -1) {
        return state
      }
      return [
        ...state.slice(0, idx),
        { ...state[idx], ...action.payload },
        ...state.slice(idx+1)
      ]
    }
  }
})
