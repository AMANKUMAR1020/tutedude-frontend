import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	user: null,
	token: null,
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		loginUser: (state, action) => {
			console.log(action.payload.user, action.payload.token);
			state.user = action.payload.user;
			state.token = action.payload.token;
			console.log(state)
		},

		logoutUser: (state) => {
			state.user = null;
			state.token = null;
		},
		setUser: (state, action) => {
			state.user = action.payload;
		},
		setFriendsRequest:(state, action)=>{
			state.user.friendsRequest = action.payload;
		},
		setUserFriends:(state, action)=>{
			state.user.friends = action.payload;
		}
	},
});

export const { loginUser, logoutUser, setUser, setFriendsRequest, setUserFriends} = authSlice.actions;
export default authSlice.reducer;
