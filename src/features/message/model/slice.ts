import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IMessage} from "../../../models/iMessage";


export enum MESSAGE_SEVERITY {
    error = "error",
    info = "info",
    success = "success",
}

interface IMessageState {
    isShow: boolean;
    message: IMessage;
}

const initialState: IMessageState = {
    isShow: false,
    message: {
        severity: MESSAGE_SEVERITY.success,
        text: "",
    },
};

export const MessageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        setMessage: (state, action: PayloadAction<IMessage>) => {
            state.message = action.payload;
            state.isShow = true;
        },
        resetMessage: (state) => {
            state.isShow = false;
            state.message = {
                severity: MESSAGE_SEVERITY.success,
                text: "",
            };
        },
    },
    extraReducers: {},
});

export const { setMessage, resetMessage } = MessageSlice.actions;

export default MessageSlice.reducer;
