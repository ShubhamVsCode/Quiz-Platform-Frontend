import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { authState, logoutUser } from "../redux/services/auth.services";
import {
  useGetProfileMutation,
  useLoginMutation,
  useLogoutMutation,
} from "../redux/services/quiz.services";

const Navbar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [logoutFunction, logoutResponse] = useLogoutMutation();

  const auth = useSelector(authState);
  console.log(auth);

  useEffect(() => {}, []);

  return (
    <nav className="px-2 sm:px-5 md:px-12 xl:px-20 2xl:px-32 py-5 bg-slate-50 border-b border-black/20 flex justify-between items-center">
      <div className="">
        <Link href="/">
          <span className="text-3xl">Quizier</span>
        </Link>
      </div>

      <div className="hidden sm:flex items-center gap-5">
        <Link href="/">Home</Link>
        <div>About</div>
        <Link href="/quiz">Quiz</Link>
        <div>Library</div>
      </div>

      <div className="flex items-center gap-5">
        {/* <Image
          src={
            "https://media.istockphoto.com/id/1313958250/vector/user-avatar-profile-icon-black-vector-illustration-on-transparent-background-website-or-app.jpg?s=612x612&w=0&k=20&c=oGGyxXc1jaRAopcs4ZEkZ1LbtAoQwKp4Q0niLvJNk-o="
          }
          alt="Profile Image"
          width={20}
          height={20}
        /> */}

        <div>
          {auth?.success ? auth?.user?.name : <Link href="/login">Login</Link>}
        </div>
        <div className="rounded-full bg-black/30 w-10 aspect-square"></div>
        {auth?.success && (
          <button
            onClick={() => {
              Cookies.remove("authToken");
              dispatch(logoutUser());
              router.push("/");
            }}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
