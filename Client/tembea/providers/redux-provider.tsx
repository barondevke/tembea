"use client";
import React, { useEffect } from "react";
import axios from "axios";
import { Cookies } from "react-cookie";

import { useDispatch } from "react-redux";
import { setUser } from "@/redux/userSlicer";
import { AppDispatch } from "@/redux/store";
import {type ChildrenType} from "@/types/types";
import api from "@/api";

function ReduxProvider({ children }: ChildrenType) {
  const cookie = new Cookies();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = cookie.get("user_id");
        if (userId) {
          const response = await api.get(
            `https://tembea.onrender.com/api/user/get-user/${userId}`,{
              withCredentials: true
            }
          );
          const res = response.data;
          if (res.proceed) {
            dispatch(setUser(res.data));
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);
  return <>{children}</>;
}

export default ReduxProvider;