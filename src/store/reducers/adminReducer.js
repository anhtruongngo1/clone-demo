import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender : false,
   genders :[] ,
   position : [] ,
   role : [] ,
   Users : [] ,
   topDoctor : [] ,
    allDoctor: [],
    allScheduleTime: [],
   allRequiredDoctorInfor : [] 
   

}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            state.isLoadingGender = true ;
            return {
             ...state,
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
           
            state.genders = action.data
            state.isLoadingGender = false ;
                return {
                 ...state,
                }
         case actionTypes.FETCH_GENDER_FAIL:
                    return {
                     ...state,
                    }
        // POSITION
        case actionTypes.FETCH_POSITION_SUCCESS:
           
            state.position = action.data
         
                return {
                 ...state,
                }
         case actionTypes.FETCH_POSITION_FAIL:
                    return {
                     ...state,
                    }

        // ROLE
        case actionTypes.FETCH_ROLE_SUCCESS:
           
            state.role = action.data
           
                return {
                 ...state,
                }
         case actionTypes.FETCH_ROLE_FAIL:
                    return {
                     ...state,
                    }
        // FETCH ALL USER
        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            state.Users = action.User          
                return {
                    ...state,
                }
        case actionTypes.FETCH_ALL_USERS_FAILD:

                        return {
                            ...state,
                        }
        // FETCH EDIT USER
        case actionTypes.EDIT_USER_SUCCESS:
            state.Users = action.User          
                return {
                    ...state,
                }
        case actionTypes.EDIT_USER_FAIL:

                        return {
                            ...state,
                        }
        // FETCH TOP DOCTOR
        case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:
            state.topDoctor = action.dataDoctor  ;      
                return {
                    ...state,
                }
        case actionTypes.FETCH_TOP_DOCTORS_FAIL:
                
                        return {
                            ...state,
                        }
        // FETCH ALL DOCTOR
        case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
            state.allDoctor = action.dataDoctor ;  ;      
                return {
                    ...state,
                }
        case actionTypes.FETCH_TOP_DOCTORS_FAIL:
                
                        return {
                            ...state,
                        }
        // FETCH ALL CODE SCHEDULE
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:
            state.allScheduleTime = action.dataTime ;  ;      
                return {
                    ...state,
                }
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAIL:
                
                        return {
                            ...state,
            }
        // FETCH DOCTOR PRICE
        case actionTypes.FETCH_REQUIRED_DOCTOR_START:
            return {
             ...state,
            }
        case actionTypes.FETCH_REQUIRED_DOCTOR_SUCCESS:          
            state.allRequiredDoctorInfor = action.data
           
                return {
                 ...state,
                }
         case actionTypes.FETCH_REQUIRED_DOCTOR_FAIL:
                    return {
                     ...state,
                    }
        default:
            return state;
    }
}

export default adminReducer;