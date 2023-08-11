import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  waybillData: null,
  previousWaybillNumbers: [],
  waybillNumber: '',
  isBOLActive: true,
  warehouses: null,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    getWaybillData: (state, { payload }) => {
      state.waybillData = payload;
    },
    getwaybillFromLS: (state, { payload }) => {
      state.previousWaybillNumbers = payload;
    },
    setWaybillNumber: (state, { payload }) => {
      state.waybillNumber = payload;
    },
    changeFlag: (state, { payload }) => {
      state.isBOLActive = payload;
    },
    getWarehouses: (state, { payload }) => {
      state.warehouses = payload;
    },
  },
});

export const {
  getWaybillData,
  getwaybillFromLS,
  setWaybillNumber,
  changeFlag,
  getWarehouses,
} = postSlice.actions;

export default postSlice.reducer;
