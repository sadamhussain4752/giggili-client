// thunks.js

import axios from 'axios';
import {
  fetchHeaderRequest,
  fetchHeaderSuccess,
  fetchHeaderFailure,
  fetchProductFailure,
  fetchProductRequest,
  fetchProductSuccess,
  fetchStoreFailure,
  fetchStoreRequest,
  fetchStoreSuccess,
  CreateStoreSuccess,
  CreateStoreRequest,
  CreateStoreFailure,
  LoginStoreRequest,
  LoginStoreSuccess,
  LoginStoreFailure,
  ProfileFailure,
  ProfileRequest,
  ProfileSuccess,
  OrderSuccess,
  OrderRequest,
  OrderFailure,
  ProductIdSuccess,
  ProductIdRequest,
  ProductIdFailure,
  AddCardIdRequest,
  AddCardIdSuccess,
  AddCardIdFailure,
  GetAddCardIdRequest,
  GetAddCardIdSuccess,
  GetAddCardIdFailure,
  DeleteAddCardIdRequest,
  DeleteAddCardIdSuccess,
  DeleteAddCardIdFailure,
  AddressRequest,
  AddressSuccess,
  AddressFailure,
  CouponRequest,
  CouponSuccess,
  CouponFailure,
  fetchAddressRequest,
  fetchAddressSuccess,
  fetchAddressFailure,
  RatingProductIdRequest,
  RatingProductIdSuccess,
  RatingProductIdFailure,
  CouponListRequest,
  CouponListSuccess,
  CouponListFailure,
  QtyCardIdRequest,
  QtyCardIdSuccess,
  QtyCardIdFailure,
  fetchEventlistRequest,
  fetchEventlistSuccess,
  fetchProductOldRequest,
  fetchProductOldSuccess,
  fetchProductOldFailure,
  UserUploadIdRequest,
  UserUploadIdSuccess,
  UserUploadIdFailure,
  WishlistRequest,
  WishlistSuccess,
  WishlistFailure,
  fetchWishlistRequest,
  fetchWishlistSuccess,
  fetchWishlistFailure,
  VerifyOTPRequest,
  VerifyOTPSuccess,
  VerifyOTPFailure,
  fetchCompanySuccess,
  fetchCompanyFailure,
  fetchCompanyRequest,
  searchJobslists,
  VerifyOTPRequests,
  VerifyOTPSuccesss,
  VerifyOTPFailures
} from './actions';
import constant from '../Constant/constant';

const HeadBanner = `${constant.baseUrl}api/header/allbanner?lang=1`;
const ProductList = `${constant.baseUrl}api/task/service-artists`;
const ProductListNew = `${constant.baseUrl}api/header/allbrandproduct?lang=1&page=1&limit=12&brandNum=8`;

const storeList = `${constant.baseUrl}api/task/service`; //<== admin login
const UserCreate = `${constant.baseUrl}api/user/register`; //<== register 
const Userlogin = `${constant.baseUrl}api/user/login`;//<== login from
const Userprofile = `${constant.baseUrl}api/user/userGetById`; //<== User get data from
const Useraddress = `${constant.baseUrl}api/order/OrderlistById`;
const UserProductid = `${constant.baseUrl}api/category/categories`;
const AddCardProductid = `${constant.baseUrl}api/addcart/createCartItem`;
const GetAddCardProductcard = `${constant.baseUrl}api/addcart/addcartUser`;
const DelAddCardProductcard = `${constant.baseUrl}api/addcart/deleteCartItem`;
const AddOrderProductid = `${constant.baseUrl}api/order/createOrder`;
const AddAddressAPI = `${constant.baseUrl}api/address/createAddress`;
const ApplyCouponAPI = `${constant.baseUrl}api/coupon/applyCoupon`;
const GetAddressList = `${constant.baseUrl}api/address/getByIdAddress`;
const RatingProductid = `${constant.baseUrl}api/company/getAllCompany`;
const CouponProductid = `${constant.baseUrl}api/coupon/GetCoupon`;
const AddupdateCartItemId = `${constant.baseUrl}api/addcart/updateCartItem`;
const EventList = `${constant.baseUrl}api/event/allevents`;
const Uploadprofile = `${constant.baseUrl}api/user/UserImage`;
const AddWishAPI = `${constant.baseUrl}api/wishlist/createWishlistItem`;
const GetWishAPI = `${constant.baseUrl}api/wishlist/wishlistUser`;
const DeleteWishAPI = `${constant.baseUrl}api/wishlist/deleteWishlistItem`;
const VerifyOTPURL = `${constant.baseUrl}api/task/service`;
const VerifyOTPURLs = `${constant.baseUrl}api/user/verify-otp`;
const GetgetCartItemProductcard = `${constant.baseUrl}api/addcart/getCartItem`;
const CompanyAPI = `${constant.baseUrl}api/company/getCompany`; //<== admin login

let token
if (typeof window !== 'undefined') {
  token = localStorage.getItem('tokenId');
}
 

 // Set headers with the JWT token
 const config = {
   headers: {
     Authorization: `Bearer ${token}`,
   },
 };


export const fetchBannerData = () => async (dispatch) => {
  dispatch(fetchHeaderRequest());

  try {
    const response = await axios.get(HeadBanner);
    dispatch(fetchHeaderSuccess(response.data));
  } catch (error) {
    dispatch(fetchHeaderFailure(error.message));
  }
};

export const fetchProductData = () => async (dispatch) => {
  dispatch(fetchProductRequest());

  try {
    const response = await axios.get(ProductList);
    dispatch(fetchProductSuccess(response.data));
  } catch (error) {
    dispatch(fetchProductFailure(error.message));
  }
};

export const fetchProductDataOld = () => async (dispatch) => {
  dispatch(fetchProductOldRequest());

  try {
    const response = await axios.get(ProductListNew);
    dispatch(fetchProductOldSuccess(response.data));
  } catch (error) {
    dispatch(fetchProductOldFailure(error.message));
  }
};


export const fetchStoreData = () => async (dispatch) => {
  dispatch(fetchStoreRequest());

  try {
    const response = await axios.get(storeList);
    dispatch(fetchStoreSuccess(response.data));
  } catch (error) {
    dispatch(fetchStoreFailure(error.message));
  }
};

export const fetchAddressList = (id) => async (dispatch) => {
  dispatch(fetchAddressRequest());

  try {
    const response = await axios.get(`${GetAddressList}/${id}`);
    dispatch(fetchAddressSuccess(response.data));
  } catch (error) {
    dispatch(fetchAddressFailure(error.message));
  }
};

export const CreateUserData = (body) => async (dispatch) => {
  dispatch(CreateStoreRequest());

  try {
    // Send the POST request with the provided body data
    const response = await axios.post(UserCreate, body);
    dispatch(CreateStoreSuccess(response.data));
  } catch (error) {
    console.log(error);
    dispatch(CreateStoreFailure(error.response.data.error));
  }
};

export const LoginUserData = (body) => async (dispatch) => {
  dispatch(LoginStoreRequest());

  try {
    // Send the POST request with the provided body data
    const response = await axios.post(Userlogin, body);
    dispatch(LoginStoreSuccess(response.data));
  } catch (error) {
    console.log(error);
    dispatch(LoginStoreFailure(error.response.data));
  }
};
export const ProfileUserData = (body) => async (dispatch) => {
  dispatch(ProfileRequest());

  try {
    // Send the POST request with the provided body data
    const response = await axios.get(`${Userprofile}`,config);
    dispatch(ProfileSuccess(response.data));
  } catch (error) {
    console.log(error);
    dispatch(ProfileFailure(error.response.data.message));
  }
};
export const VerifyOTP = (body,userId) => async (dispatch) => {
  dispatch(VerifyOTPRequest());

  try {
    // Send the POST request with the provided body data
    const response = await axios.get(`${VerifyOTPURL}/${body}`);
    dispatch(VerifyOTPSuccess(response.data));
  } catch (error) {
    console.log(error);
    dispatch(VerifyOTPFailure(error.response.data.message));
  }
};

export const VerifyOTPCheck = (body,userId) => async (dispatch) => {
  dispatch(VerifyOTPRequests());

  try {
    // Send the POST request with the provided body data
    const response = await axios.post(`${VerifyOTPURLs}`,body);
    dispatch(VerifyOTPSuccesss(response.data));
  } catch (error) {
    console.log(error);
    dispatch(VerifyOTPFailures(error.response.data));
  }
};

export const ForgotPasswordThunk = (body,userId) => async (dispatch) => {
  dispatch(VerifyOTPRequests());

  try {
    // Send the POST request with the provided body data
    const response = await axios.post(`${VerifyOTPURLs}`,body);
    dispatch(VerifyOTPSuccesss(response.data));
  } catch (error) {
    console.log(error);
    dispatch(VerifyOTPFailures(error.response.data));
  }
};
export const OrderUserList = (body) => async (dispatch) => {
  dispatch(OrderRequest());

  try {
    // Send the POST request with the provided body data
    const response = await axios.get(`${Useraddress}/${body}`);
    dispatch(OrderSuccess(response.data));
  } catch (error) {
    console.log(error);
    dispatch(OrderFailure(error.response.data.message));
  }
};
export const ProductUserById = (body) => async (dispatch) => {
  dispatch(ProductIdRequest());

  try {
    // Send the POST request with the provided body data
    const response = await axios.get(`${UserProductid}`);
    dispatch(ProductIdSuccess(response.data));
  } catch (error) {
    console.log(error);
    dispatch(ProductIdFailure(error.response.data.message));
  }
};
export const AddCardProductById = (body) => async (dispatch) => {
  dispatch(AddCardIdRequest());

  try {
    // Send the POST request with the provided body data
    const response = await axios.post(AddCardProductid,body);
    dispatch(AddCardIdSuccess(response.data));
  } catch (error) {
    console.log(error);
    dispatch(AddCardIdFailure(error.response.data.message));
  }
};
export const GetAddCardProductById = (body) => async (dispatch) => {
  dispatch(GetAddCardIdRequest());

  try {
    // Send the POST request with the provided body data
    const response = await axios.get(`${GetAddCardProductcard}/${body}`);
    dispatch(GetAddCardIdSuccess(response.data));
  } catch (error) {
    console.log(error);
    dispatch(GetAddCardIdFailure(error.response.data.message));
  }
};

export const GetCardProductById = (body) => async (dispatch) => {
  dispatch(GetAddCardIdRequest());

  try {
    // Send the POST request with the provided body data
    const response = await axios.post(GetgetCartItemProductcard,body);
    dispatch(GetAddCardIdSuccess(response.data));
  } catch (error) {
    console.log(error);
    dispatch(GetAddCardIdFailure(error.response.data.message));
  }
};
export const DeleteAddCardProductById = (body) => async (dispatch) => {
  dispatch(DeleteAddCardIdRequest());

  try {
    // Send the POST request with the provided body data
    const response = await axios.delete(`${DelAddCardProductcard}/${body}`);
    dispatch(DeleteAddCardIdSuccess(response.data));
  } catch (error) {
    console.log(error);
    dispatch(DeleteAddCardIdFailure(error.response.data.message));
  }
};

export const AddOrderProductById = (body) => async (dispatch) => {
  dispatch(AddCardIdRequest());

  try {
    // Send the POST request with the provided body data
    const response = await axios.post(AddOrderProductid,body);
    dispatch(AddCardIdSuccess(response.data));
  } catch (error) {
    console.log(error);
    dispatch(AddCardIdFailure(error.response.data.message));
  }
};


export const AddAddressFetch = (body,userId) => async (dispatch) => {
  dispatch(AddressRequest());

  try {
    // Send the POST request with the provided body data
    const response = await axios.post(`${AddAddressAPI}`,body);
    dispatch(AddressSuccess(response.data));
  } catch (error) {
    console.log(error);
    dispatch(AddressFailure(error.response.data.message));
  }
};

export const ApplyCouponFetch = (body,userId) => async (dispatch) => {
  dispatch(CouponRequest());

  try {
    // Send the POST request with the provided body data
    const response = await axios.post(`${ApplyCouponAPI}`,body);
    dispatch(CouponSuccess(response.data));
  } catch (error) {
    console.log(error);
    dispatch(CouponFailure(error.response.data.message));
  }
};

export const RatingProductUserById = () => async (dispatch) => {
  dispatch(RatingProductIdRequest());

  try {
    // Send the POST request with the provided body data
    const response = await axios.get(`${RatingProductid}`);
    dispatch(RatingProductIdSuccess(response.data));
  } catch (error) {
    console.log(error);
    dispatch(RatingProductIdFailure(error.response.data.message));
  }
};

export const CouponUserById = (body) => async (dispatch) => {
  dispatch(CouponListRequest());

  try {
    // Send the POST request with the provided body data
    const response = await axios.get(`${CouponProductid}`);
    dispatch(CouponListSuccess(response.data));
  } catch (error) {
    console.log(error);
    dispatch(CouponListFailure(error.response.data.message));
  }
};

export const QtyOrderProductById = (body,userId) => async (dispatch) => {
  dispatch(QtyCardIdRequest());

  try {
    // Send the POST request with the provided body data
    const response = await axios.put(`${AddupdateCartItemId}/${userId}`,body);
    dispatch(QtyCardIdSuccess(response.data));
  } catch (error) {
    console.log(error);
    dispatch(QtyCardIdFailure(error.response.data.message));
  }
};

export const fetchEventData = () => async (dispatch) => {
  dispatch(fetchEventlistRequest());

  try {
    const response = await axios.get(EventList);
    dispatch(fetchEventlistSuccess(response.data));
  } catch (error) {
    dispatch(fetchAddressFailure(error.message));
  }
};

export const UserUploadById = (userId,body) => async (dispatch) => {
  dispatch(UserUploadIdRequest());

  try {
    // Send the POST request with the provided body data
    const response = await axios.put(`${Uploadprofile}/${userId}`,body);
    dispatch(UserUploadIdSuccess(response.data));
  } catch (error) {
    console.log(error);
    dispatch(UserUploadIdFailure(error.response.data.message));
  }
};

export const AddWishlistFetch = (body,userId) => async (dispatch) => {
  dispatch(WishlistRequest());

  try {
    // Send the POST request with the provided body data
    const response = await axios.post(`${AddWishAPI}`,body);
    dispatch(WishlistSuccess(response.data));
  } catch (error) {
    console.log(error);
    dispatch(WishlistFailure(error.response.data.message));
  }
};


export const fetchWishlistData = (userId) => async (dispatch) => {
  dispatch(fetchWishlistRequest());

  try {
    const response = await axios.get(`${GetWishAPI}/${userId}`);
    dispatch(fetchWishlistSuccess(response.data));
  } catch (error) {
    dispatch(fetchWishlistFailure(error.message));
  }
};

export const fetchCompanyData = (userId) => async (dispatch) => {
  dispatch(fetchCompanyRequest());

  try {
    const response = await axios.get(`${CompanyAPI}/${userId}`);
    dispatch(fetchCompanySuccess(response.data));
  } catch (error) {
    dispatch(fetchCompanyFailure(error.message));
  }
};

export const DeleteWishlistFetch = (Id) => async (dispatch) => {
  dispatch(WishlistRequest());

  try {
    // Send the POST request with the provided body data
    const response = await axios.delete(`${DeleteWishAPI}/${Id}`);
    dispatch(WishlistSuccess(response.data));
  } catch (error) {
    console.log(error);
    dispatch(WishlistFailure(error.response.data.message));
  }
};

export const searchJobslist = (id) => async (dispatch) => {
  dispatch(searchJobslists(id));
};