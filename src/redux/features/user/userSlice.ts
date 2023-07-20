import { PayloadAction, createSlice } from "@reduxjs/toolkit";
interface IToken {
  token: string | null;
}
const initialState: IToken = {
  token: localStorage.getItem("accessToken"),
};
const userSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    removeToken: (state) => {
      state.token = null;
    },
  },
});

export const { setToken, removeToken } = userSlice.actions;
export default userSlice.reducer;
