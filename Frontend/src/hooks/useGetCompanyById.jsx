import { setSingleComapny } from "@/redux/companySlice";
import { COMPANY_APT_ENDPOINT } from "@/utils/constant";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetCompanyById = (companyId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSingleCompany = async () => {
      try {
        const res = await axios.get(
          `${COMPANY_APT_ENDPOINT}/get/${companyId}`,
          {withCredentials: true}
        );
        console.log(res.data.data);
        if(res.statusCode === 200){
            dispatch(setSingleComapny(res.data.data))
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleCompany();
  }, [companyId, dispatch]);
};

export default useGetCompanyById;
