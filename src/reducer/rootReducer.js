// rootReducer.js

import { combineReducers } from 'redux';
import dataReducer from '../reducer/reducer';

const rootReducer = combineReducers({
  data: dataReducer,
  productlist: dataReducer,
  storelist: dataReducer,
  userData: dataReducer,
  loginData: dataReducer,
  getprofile: dataReducer,
  getOrder: dataReducer,
  GetProductId: dataReducer,
  GetAddcardRes: dataReducer,
  GetAddcardUserRes: dataReducer,
  DeleteAddcardUserRes: dataReducer,
  addresslist:dataReducer,
  CouponRes: dataReducer,
  RatingProductRes : dataReducer,
  CouponListsRes: dataReducer,
  qtyAddcardRes: dataReducer,
  eventlist: dataReducer,
  productOldlist: dataReducer,
  UserUploadRes: dataReducer,
  wishlist: dataReducer,
  otpVerificationResponse: dataReducer,
  getcompanyById: dataReducer,
  jobslistfilter: dataReducer,
  servicelist: dataReducer,
});

export default rootReducer;
