import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    myEvents: [],
};

const eventsSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        setMyEvents: (state, action) => {
            state.myEvents = action.payload;
        },
        clearEvents: (state) => {
            state.myEvents = [];
        },
    },
});

export const { setMyEvents, clearEvents } = eventsSlice.actions;
export default eventsSlice.reducer;
