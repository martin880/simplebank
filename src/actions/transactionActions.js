import axios from "axios";
import {
    TRANSACTION_DEPOSIT_REQUEST,
    TRANSACTION_DEPOSIT_SUCCESS,
    TRANSACTION_DEPOSIT_FAIL,
    TRANSACTION_WITHDRAWAL_REQUEST,
    TRANSACTION_WITHDRAWAL_SUCCESS,
    TRANSACTION_WITHDRAWAL_FAIL,
    TRANSACTION_TRANSFER_REQUEST,
    TRANSACTION_TRANSFER_SUCCESS,
    TRANSACTION_TRANSFER_FAIL,
    // TRANSACTION_MUTASI_REQUEST,
    // TRANSACTION_MUTASI_SUCCESS,
    // TRANSACTION_MUTASI_FAIL,
    TRANSACTION_SALDO_REQUEST,
    TRANSACTION_SALDO_SUCCESS,
    TRANSACTION_SALDO_FAIL,
} from "../constants/transactionConstants";
import { logout } from './userActions'

export const deposit = (accountDeposit, amountDeposit, descDeposit) => async(dispatch, getState) => {
    try {
        dispatch({
            type: TRANSACTION_DEPOSIT_REQUEST,
        })

        const {
            userLogin: { token },
        } = getState()

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `${token}`,
            },
        };
        const { data: { data } } = await axios.post("http://localhost:9090/api/v1/deposit", {
            transaction_type: 1,
            transaction_description: descDeposit,
            sender: parseInt(accountDeposit),
            recipient: parseInt(accountDeposit),
            timestamp: Date.now(),
            amount: parseInt(amountDeposit)
        }, config)
        dispatch({
            type: TRANSACTION_DEPOSIT_SUCCESS,
            payload: data,
        })

        dispatch(saldo())
    } catch (error) {
        const message =
            error.response && error.response.data.message ?
            error.response.data.message :
            error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: TRANSACTION_DEPOSIT_FAIL,
            payload: message,
        })
    }
};

export const withdrawal = (accountWithdrawal, amountWithdrawal, descWithdrawal) => async(dispatch, getState) => {
    try {
        dispatch({
            type: TRANSACTION_WITHDRAWAL_REQUEST,
        })

        const {
            userLogin: { token },
        } = getState()

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `${token}`,
            },
        };
        const { data: { data } } = await axios.post("http://localhost:9090/api/v1/withdraw", { sender: parseInt(accountWithdrawal), amount: parseInt(amountWithdrawal), transaction_description: descWithdrawal }, config);
        dispatch({
            type: TRANSACTION_WITHDRAWAL_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.message ?
            error.response.data.message :
            error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: TRANSACTION_WITHDRAWAL_FAIL,
            payload: message,
        })
    }
};

export const transfer = (sender, accountTransfer, amountTransfer, descTransfer) => async(dispatch, getState) => {
    try {
        dispatch({
            type: TRANSACTION_TRANSFER_REQUEST,
        })

        const {
            userLogin: { token },
        } = getState()

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `${token}`,
            },
        };
        const { data: { data } } = await axios.post("http://localhost:9090/api/v1/transfer", { sender: parseInt(sender), recipient: parseInt(accountTransfer), amount: parseInt(amountTransfer), transaction_description: descTransfer }, config);
        dispatch({
            type: TRANSACTION_TRANSFER_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.message ?
            error.response.data.message :
            error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: TRANSACTION_TRANSFER_FAIL,
            payload: message,
        })
    }
};
// export const mutasi = (sender, accountTransfer, amountTransfer, descTransfer) => async(dispatch, getState) => {
//     try {
//         dispatch({
//             type: TRANSACTION_MUTASI_REQUEST,
//         })

//         const {
//             userLogin: { token },
//         } = getState()

//         const config = {
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `${token}`,
//             },
//         };
//         const { data: { data } } = await axios.post("http://localhost:9090/api/v1/transfer", { sender: parseInt(sender), amount: parseInt(amountTransfer), transaction_description: descTransfer }, config);
//         dispatch({
//             type: TRANSACTION_MUTASI_SUCCESS,
//             payload: data,
//         })
//     } catch (error) {
//         const message =
//             error.response && error.response.data.message ?
//             error.response.data.message :
//             error.message
//         if (message === 'Not authorized, token failed') {
//             dispatch(logout())
//         }
//         dispatch({
//             type: TRANSACTION_MUTASI_FAIL,
//             payload: message,
//         })
//     }
// };

export const saldo = () => async(dispatch, getState) => {
    try {
        dispatch({
            type: TRANSACTION_SALDO_REQUEST,
        })

        const {
            userLogin: { token },
        } = getState()

        const config = {
            headers: {
                Authorization: `${token}`,
            },
        }

        const { data: { data } } = await axios.get(`http://localhost:9090/api/v1/account`, config)

        dispatch({
            type: TRANSACTION_SALDO_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.message ?
            error.response.data.message :
            error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: TRANSACTION_SALDO_FAIL,
            payload: message,
        })
    }
}