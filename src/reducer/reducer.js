// reducer.js

import {
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_FAILURE,
  FETCH_STORE_FAILURE,
  FETCH_STORE_REQUEST,
  FETCH_STORE_SUCCESS,
  CREATE_STORE_FAILURE,
  CREATE_STORE_REQUEST,
  CREATE_STORE_SUCCESS,
  LOGIN_STORE_REQUEST,
  LOGIN_STORE_SUCCESS,
  LOGIN_STORE_FAILURE,
  PROFILE_FAILURE,
  PROFILE_REQUEST,
  PROFILE_SUCCESS,
  ORDER_LIST_FAILURE,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_REQUEST,
  PRODUCT_IB_BY_REQUEST,
  PRODUCT_IB_BY_SUCCESS,
  PRODUCT_IB_BY_FAILURE,
  ADDCARD_IB_BY_REQUEST,
  ADDCARD_IB_BY_SUCCESS,
  ADDCARD_IB_BY_FAILURE,
  GET_ADDCARD_IB_BY_REQUEST,
  GET_ADDCARD_IB_BY_SUCCESS,
  GET_ADDCARD_IB_BY_FAILURE,
  DELETE_ADDCARD_IB_BY_REQUEST,
  DELETE_ADDCARD_IB_BY_SUCCESS,
  DELETE_ADDCARD_IB_BY_FAILURE,
  FETCH_ADDRESS_LIST_REQUEST,
  FETCH_ADDRESS_LIST_SUCCESS,
  FETCH_ADDRESS_LIST_FAILURE,
  COUPON_IB_BY_REQUEST,
  COUPON_IB_BY_SUCCESS,
  COUPON_IB_BY_FAILURE,
  RATING_PRODUCT_IB_BY_REQUEST,
  RATING_PRODUCT_IB_BY_SUCCESS,
  RATING_PRODUCT_IB_BY_FAILURE,
  COUPON_LIST_IB_BY_REQUEST,
  COUPON_LIST_IB_BY_SUCCESS,
  COUPON_LIST_IB_BY_FAILURE,
  QTY_CARD_IB_BY_REQUEST,
  QTY_CARD_IB_BY_SUCCESS,
  QTY_CARD_IB_BY_FAILURE,
  FETCH_EVENT_LIST_REQUEST,
  FETCH_EVENT_LIST_SUCCESS,
  FETCH_PRODUCT_OLD_REQUEST,
  FETCH_PRODUCT_OLD_SUCCESS,
  FETCH_PRODUCT_OLD_FAILURE,
  USER_PROFILE_IB_BY_REQUEST,
  USER_PROFILE_IB_BY_SUCCESS,
  USER_PROFILE_IB_BY_FAILURE,
  FETCH_WISH_LIST_REQUEST,
  FETCH_WISH_LIST_SUCCESS,
  FETCH_WISH_LIST_FAILURE,
  FETCH_COMPANY_BY_ID_REQUEST,
  FETCH_COMPANY_BY_ID_SUCCESS,
  FETCH_COMPANY_BY_ID_FAILURE,
  FETCH_COMPANY_FILTER,
  VERIFY_OTP_IB_BY_SUCCESS,
  VERIFY_OTP_IB_BY_REQUEST,
  VERIFY_OTP_IB_BY_FAILURE
} from "./actions";

const initialState = {
  data: null,
  productlist: null,
  storelist: null,
  loading: false,
  error: null,
  loginerror: null,
  userData: null, // This will store the response data
  loginData: null,
  getprofile: null,
  profileerror: null,
  Ordererror: null,
  getOrder: null,
  ProductIderror: null,
  GetProductId: null,
  ProductIdloading: null,
  addcardIdloading: null,
  GetAddcardRes: null,
  addloading: null,
  GetAddcardUserRes: null,
  Deleteloading: null,
  DeleteAddcardUserRes: null,
  jobslistfilter: [], // Initialize as an empty array
  // other state properties
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case FETCH_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        productlist: action.payload.data,
        jobslistfilter: action.payload

      };
    case FETCH_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_PRODUCT_OLD_REQUEST:
      return {
        ...state,
        loading: false,
      };
    case FETCH_PRODUCT_OLD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: action.payload,
        productOldlist: action.payload,

      };
    case FETCH_PRODUCT_OLD_FAILURE:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_STORE_SUCCESS:
      return {
        ...state,
        loading: false,
        storelist: action.payload.data,
      };
    case FETCH_STORE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CREATE_STORE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        userData: null,
      };
    case CREATE_STORE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        userData: action.payload, // Update userData with the response data
      };
    case CREATE_STORE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload, // Update error with the error message
        userData: action.error,
      };
    case LOGIN_STORE_REQUEST:
      return {
        ...state,
        loading: true,
        loginerror: null,
        loginData: null,
      };
    case LOGIN_STORE_SUCCESS:
      return {
        ...state,
        loading: false,
        loginerror: null,
        loginData: action.payload, // Update userData with the response data
      };
    case LOGIN_STORE_FAILURE:
      return {
        ...state,
        loading: false,
        loginerror: action.payload, // Update error with the error message
        loginData: action.payload,
      };
    case PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
        profileerror: null,
        getprofile: null,
      };
    case PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        profileerror: null,
        getprofile: action.payload, // Update userData with the response data
      };
    case PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        profileerror: action.payload, // Update error with the error message
        getprofile: null,
      };
    case ORDER_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        Ordererror: null,
        getOrder: null,
      };
    case ORDER_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        Ordererror: null,
        getOrder: action.payload, // Update userData with the response data
      };
    case ORDER_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        Ordererror: action.payload, // Update error with the error message
        getOrder: null,
      };
    case PRODUCT_IB_BY_REQUEST:
      return {
        ...state,
        ProductIdloading: true,
        ProductIderror: null,
        GetProductId: null,
      };
    case PRODUCT_IB_BY_SUCCESS:
      return {
        ...state,
        ProductIdloading: false,
        ProductIderror: null,
        GetProductId: action.payload, // Update userData with the response data
      };
    case PRODUCT_IB_BY_FAILURE:
      return {
        ...state,
        ProductIdloading: false,
        ProductIderror: action.payload, // Update error with the error message
        GetProductId: null,

      };
    case ADDCARD_IB_BY_REQUEST:
      return {
        ...state,
        addcardIdloading: true,
        GetAddcardRes: null,
      };
    case ADDCARD_IB_BY_SUCCESS:
      return {
        ...state,
        addcardIdloading: false,
        GetAddcardRes: action.payload, // Update userData with the response data
      };
    case ADDCARD_IB_BY_FAILURE:
      return {
        ...state,
        addcardIdloading: false,
        GetAddcardRes: action.payload,
      };
    case GET_ADDCARD_IB_BY_REQUEST:
      return {
        ...state,
        addloading: true,
        // GetAddcardUserRes: null,
      };
    case GET_ADDCARD_IB_BY_SUCCESS:
      return {
        ...state,
        addloading: false,
        GetAddcardUserRes: action.payload, // Update userData with the response data
      };
    case GET_ADDCARD_IB_BY_FAILURE:
      return {
        ...state,
        addloading: false,
        GetAddcardUserRes: action.payload,
      };
    case DELETE_ADDCARD_IB_BY_REQUEST:
      return {
        ...state,
        Deleteloading: true,
        DeleteAddcardUserRes: null,
      };
    case DELETE_ADDCARD_IB_BY_SUCCESS:
      return {
        ...state,
        Deleteloading: false,
        DeleteAddcardUserRes: action.payload, // Update userData with the response data
      };
    case DELETE_ADDCARD_IB_BY_FAILURE:
      return {
        ...state,
        Deleteloading: false,
        DeleteAddcardUserRes: action.payload,
      };
    case FETCH_ADDRESS_LIST_REQUEST:
      return {
        ...state,
        error: null,
      };
    case FETCH_ADDRESS_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        addresslist: action.payload,
      };
    case FETCH_ADDRESS_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case COUPON_IB_BY_REQUEST:
      return {
        ...state,
        CouponRes: null,
      };
    case COUPON_IB_BY_SUCCESS:
      return {
        ...state,
        CouponRes: action.payload, // Update userData with the response data
      };
    case COUPON_IB_BY_FAILURE:
      return {
        ...state,
        CouponRes: action.payload,
      };
    case RATING_PRODUCT_IB_BY_REQUEST:
      return {
        ...state,
        RatingProductRes: null,
      };
    case RATING_PRODUCT_IB_BY_SUCCESS:
      return {
        ...state,
        RatingProductRes: action.payload, // Update userData with the response data
      };
    case RATING_PRODUCT_IB_BY_FAILURE:
      return {
        ...state,
        RatingProductRes: action.payload,
      };
    case COUPON_LIST_IB_BY_REQUEST:
      return {
        ...state,
        CouponListsRes: null,
      };
    case COUPON_LIST_IB_BY_SUCCESS:
      return {
        ...state,
        CouponListsRes: action.payload, // Update userData with the response data
      };
    case COUPON_LIST_IB_BY_FAILURE:
      return {
        ...state,
        CouponListsRes: action.payload,
      };

    case QTY_CARD_IB_BY_REQUEST:
      return {
        ...state,
        qtycardIdloading: true,
        qtyAddcardRes: null,
      };
    case QTY_CARD_IB_BY_SUCCESS:
      return {
        ...state,
        qtycardIdloading: false,
        qtyAddcardRes: action.payload, // Update userData with the response data
      };
    case QTY_CARD_IB_BY_FAILURE:
      return {
        ...state,
        qtycardIdloading: false,
        qtyAddcardRes: action.payload,
      };
    case FETCH_EVENT_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_EVENT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        eventlist: action.payload,
      };
    case FETCH_STORE_FAILURE:
      return {
        ...state,
        loading: false,
        eventlist: action.payload,
      };

    case USER_PROFILE_IB_BY_REQUEST:
      return {
        ...state,
        UserUploadRes: null,
      };
    case USER_PROFILE_IB_BY_SUCCESS:
      return {
        ...state,
        UserUploadRes: action.payload, // Update userData with the response data
      };
    case USER_PROFILE_IB_BY_FAILURE:
      return {
        ...state,
        UserUploadRes: action.payload,
      };

    case FETCH_WISH_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_WISH_LIST_SUCCESS:
      return {
        ...state,
        wishlist: action.payload,
      };
    case FETCH_WISH_LIST_FAILURE:
      return {
        ...state,
        wishlist: action.payload,
      };


      case VERIFY_OTP_IB_BY_REQUEST:
        return {
          ...state,
          loading: true,
          loadinglist: true,

        };
      case VERIFY_OTP_IB_BY_SUCCESS:
        return {
          ...state,
          servicelist: action.payload.task,
          loadinglist: false,
        };
      case VERIFY_OTP_IB_BY_FAILURE:
        return {
          ...state,
          servicelist: action.payload,
          loadinglist: false,

        };
    case FETCH_COMPANY_BY_ID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_COMPANY_BY_ID_SUCCESS:
      return {
        ...state,
        getcompanyById: action.payload,
      };
    case FETCH_COMPANY_BY_ID_FAILURE:
      return {
        ...state,
        getcompanyById: action.payload,
      };
      case FETCH_COMPANY_FILTER:
        const filterCriteria = action.payload;
        
        let filteredJobs = Array.isArray(state?.productlist?.jobPosts) ? state.productlist.jobPosts : [];
        
        if (filterCriteria.search) {
            filteredJobs = filteredJobs.filter(job =>
                job?.jobTitle.toLowerCase().includes(filterCriteria.search.toLowerCase())
            );
        }
    
        if (filterCriteria.location) {
            filteredJobs = filteredJobs.filter(job =>
                job?.location.toLowerCase().includes(filterCriteria.location.toLowerCase())
            );
        }
        if (filterCriteria.categoryid) {
          filteredJobs = filteredJobs.filter(job =>
              job?.category_id.toLowerCase().includes(filterCriteria.categoryid.toLowerCase())
          );
      }

   // Filter by job type criteria using `some()` method
   if (filterCriteria.jobType ) {
    filteredJobs = filteredJobs.filter(job =>
      job?.jobType.some(type => type === filterCriteria.jobType)
    );
}
        return {
            ...state,
            jobslistfilter: { jobPosts: filteredJobs },
        };
    
      

    default:
      return state;
  }
};

export default dataReducer;
