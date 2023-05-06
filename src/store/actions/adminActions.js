import actionTypes from './actionTypes';
import {getAllCodeSevice ,createNewUserService , getAllUsers ,
    DeleteUserService, EditUserService, getTopDoctorHome, getAllDoctor, saveDetailDoctor,
    getAllSpecialty , getAllclinic
      } from "../../services/userService" ;
import { toast } from 'react-toastify';


// export const fecthGenderStart = () => ({
//     type : actionTypes.FETCH_GENDER_START
// });
export const fecthGenderStart = () => {
    return async(dispatch, getState) =>{
      
        try {
            dispatch({type: actionTypes.FETCH_GENDER_START })
         let res = await getAllCodeSevice('gender')
         if(res && res.errCode === 0){
             dispatch(fecthGenderSuccess(res.data));
         }else{
             dispatch(fecthGenderFail());
         }
            
        } catch (e) {
         dispatch(fecthGenderFail());
         console.log("fetchgender error",e);
        }
     }
     };

export const fecthGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS ,
    data : genderData
});

export const fecthGenderFail = () => ({
    type: actionTypes.FETCH_GENDER_FAIL
});

// POSITION
export const fecthPositionStart = () => {
    return async(dispatch, getState) =>{
      
        try {
         let res = await getAllCodeSevice('POSITION')
         if(res && res.errCode === 0){
             dispatch(fecthPositionSuccess(res.data));
         }else{
             dispatch(fecthPositionFail());
         }
            
        } catch (e) {
         dispatch(fecthPositionFail());
         console.log("fetchposition error",e);
        }
     }
     };
export const fecthPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS ,
    data : positionData
});

export const fecthPositionFail = () => ({
    type: actionTypes.FETCH_POSITION_FAIL
});
// ROLE_ID
export const fecthRoleStart = () => {
    return async(dispatch, getState) =>{
      
        try {
          
         let res = await getAllCodeSevice('ROLE')
         if(res && res.errCode === 0){
             dispatch(fecthRoleSuccess(res.data));
         }else{
             dispatch(fecthRoleFail());
         }
            
        } catch (e) {
         dispatch(fecthRoleFail());
         console.log("fetchposition error",e);
        }
     }
     };
export const fecthRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS ,
    data : roleData
});

export const fecthRoleFail = () => ({
    type: actionTypes.FETCH_ROLE_FAIL
});
// CREATE USER 
export const createNewUser =(data)=>{
    return async(dispatch, getState) =>{
      
        try {
          
        let res = await createNewUserService(data);
        console.log('check create' , res)
         if(res && res.errCode === 0){
             toast.success("MY SUCCESS CREATE NEW USER")
             dispatch(saveUserSuccess());
             dispatch(fecthAllUserStart())
         }else{
             dispatch(saveUserFail());
         }
            
        } catch (e) {
         dispatch(saveUserFail());
         console.log("fetchposition error",e);
        }
     }
}
export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS ,
   
});

export const saveUserFail = () => ({
    type: actionTypes.CREATE_USER_FAIL
});
// FETCH ALL USER 
export const fecthAllUserStart= () => {
    return async(dispatch, getState) =>{
      
        try {
          
         let res = await getAllUsers('All')
         if(res && res.errCode === 0){
             let users = res
             dispatch(fecthAllUserSuccess(res.users.reverse()));
          
         }else{
             dispatch(fecthAllUserFailed());
         }
            
        } catch (e) {
         dispatch(fecthAllUserFailed());
         console.log("fetchposition error",e);
        }
     }
     };
     export const fecthAllUserSuccess = (data) => ({
        type: actionTypes.FETCH_ALL_USERS_SUCCESS ,
        User: data
    });
    
    export const fecthAllUserFailed = () => ({
        type: actionTypes.FETCH_ALL_USERS_FAILD
    });
    // DELETE USER 
    export const deleteUser =(userId)=>{
        return async(dispatch, getState) =>{
          
            try {
              
            let res = await DeleteUserService(userId);
            console.log('check create' , res)
             if(res && res.errCode === 0){
                 toast.success("DELETE USER SUCCESS")
                 dispatch(deleteUserSuccess());
                 dispatch(fecthAllUserStart())
             }else{
                toast.error("DELETE USER FAILD")
                 dispatch(deleteUserFail());
             }
                
            } catch (e) {
             dispatch(deleteUserFail());
             toast.error("FETCH ALL USER FAILD")
            }
         }
    }
    export const deleteUserSuccess = () => ({
        type: actionTypes.DELETE_USER_SUCCESS ,
       
    });
    
    export const deleteUserFail = () => ({
        type: actionTypes.DELETE_USER_FAIL
    });
    // EDIT USER
    export const editUser =(inputData)=>{
        return async(dispatch, getState) =>{
          
            try {
              
            let res = await EditUserService(inputData);
            console.log('check create' , res)
             if(res && res.errCode === 0){
                 toast.success("UPDATE USER SUCCESS")
                 dispatch(editUserSuccess());
                 dispatch(fecthAllUserStart())
             }else{
                toast.error("UPDATE USER FAILD")
                 dispatch(editUserFail());
             }
                
            } catch (e) {
             dispatch(editUserFail());
             toast.error("FETCH EDIT USER FAILD")
            }
         }
    }
    export const editUserSuccess = () => ({
        type: actionTypes.EDIT_USER_SUCCESS ,
       
    });
    
    export const editUserFail = () => ({
        type: actionTypes.EDIT_USER_FAIL
    });
    // top doctor 
    export const fetchTopDoctor = () => {
        return async (dispatch, getState) =>{
            try {
                let res = await getTopDoctorHome('10') ;
              
                if(res && res.errCode === 0){
                    dispatch({
                        type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS ,
                        dataDoctor: res.data

                    })
                } else {
                    dispatch({
                        type: actionTypes.FETCH_TOP_DOCTORS_FAIL ,
                       

                    })
                }
            }
            catch(e){
                console.log('FETCH_TOP_DOCTORS_FAIL',e)
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_FAIL ,
                   

                })

            }
        }
    }
    // ALL DOCTOR 
    export const fetchAllDoctor = () => {
        return async (dispatch, getState) =>{
            try {
                let res = await getAllDoctor() ;
              
                if(res && res.errCode === 0){
                    dispatch({
                        type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS ,
                        dataDoctor: res.data

                    })
                } else {
                    dispatch({
                        type: actionTypes.FETCH_ALL_DOCTORS_FAIL ,
                       

                    })
                }
            }
            catch(e){
                console.log('FETCH_ALL_DOCTORS_FAIL',e)
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_FAIL ,
                   

                })

            }
        }
    }
    // SAVE DETAIL DOCTOR
    export const saveDetailDoctors = (data) => {
        return async (dispatch, getState) =>{
            try {
                let res = await saveDetailDoctor(data) ;
              
                if(res && res.errCode === 0){
                    toast.success("SAVE INFO DOCTOR SUCCESS")
                    dispatch({
                        type: actionTypes.SAVE_DETAIL_DOCTORS_SUCCESS 
                    })
                } else {
                    toast.error("SAVE_DETAIL_DOCTORS_FAIl")
                    dispatch({
                        type: actionTypes.SAVE_DETAIL_DOCTORS_FAIl ,
                       

                    })
                }
            }
            catch(e){
                toast.error("SAVE_DETAIL_DOCTORS_FAIl")
                console.log('SAVE_DETAIL_DOCTORS_FAIl',e)
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTORS_FAIl ,
                   

                })

            }
        }
}
    // FETCH ALL CODE SCHEDULE
    export const fetchAllScheduleTime = () => {
        return async (dispatch, getState) =>{
            try {
                let res = await getAllCodeSevice("TIME");           
                if(res && res.errCode === 0){
                    dispatch({
                        type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS ,
                        dataTime: res.data

                    })
                } else {
                    dispatch({
                        type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAIL ,
                       

                    })
                }
            }
            catch(e){
                console.log('FETCH_ALLCODE_SCHEDULE_TIME_FAIL',e)
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAIL ,
                   

                })

            }
        }
}
    // fetch  all required doctor
    export const getRequiredDoctorInfo = () => {
        return async(dispatch, getState) =>{
          
            try {
                dispatch({type: actionTypes.FETCH_REQUIRED_DOCTOR_START })
                let resPrice = await getAllCodeSevice('PRICE')
                let resPayment = await getAllCodeSevice('PAYMENT')
                let resPovince = await getAllCodeSevice('PROVINCE')
                let resSpecialty = await getAllSpecialty()
                let resClinic = await getAllclinic()
                
                if (resPrice && resPrice.errCode === 0
                    && resPayment && resPayment.errCode === 0
                    && resPovince && resPovince.errCode === 0
                    && resSpecialty && resSpecialty.errCode === 0
                    && resClinic && resClinic.errCode === 0
                
                ) {
                    let data = {
                        resPrice: resPrice.data,
                        resPayment: resPayment.data,
                        resPovince: resPovince.data,
                        resSpecialty: resSpecialty.data ,
                        resClinic: resClinic.data
                    }

                    dispatch(
                        fetchRequiredDoctorInforSuccess(data));
             }else{
                 dispatch(fetchRequiredDoctorInforFail());
             }
                
            } catch (e) {
             dispatch(fetchRequiredDoctorInforFail());
             console.log("fetchRequiredDoctorInforFail error",e);
            }
         }
         };
    
    export const fetchRequiredDoctorInforSuccess = (allRequiredData) => ({
        type: actionTypes.FETCH_REQUIRED_DOCTOR_SUCCESS ,
        data : allRequiredData
    });
    
    export const fetchRequiredDoctorInforFail = () => ({
        type: actionTypes.FETCH_REQUIRED_DOCTOR_FAIL
    });