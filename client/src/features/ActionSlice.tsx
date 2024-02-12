import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserInfoState {
  isSideBarOpen: boolean;
}

const initialState: UserInfoState = {
  isSideBarOpen: false,
};

const ActionSlice = createSlice({
  name: "actions_slice",
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.isSideBarOpen = !state.isSideBarOpen;
    },
  },
});

export const { toggleMenu } = ActionSlice.actions;
export default ActionSlice.reducer;
