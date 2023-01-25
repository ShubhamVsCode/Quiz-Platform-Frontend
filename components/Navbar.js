import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="px-2 sm:px-5 md:px-12 xl:px-20 2xl:px-32 py-5 bg-slate-50 border-b border-black/20 flex justify-between items-center">
      <div className="">
        <span className="text-3xl">Quizier</span>
      </div>

      <div className="hidden sm:flex items-center gap-5">
        <div>Home</div>
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

        <div>Shubham</div>
        <div className="rounded-full bg-black/30 w-10 aspect-square"></div>
      </div>
    </nav>
  );
};

export default Navbar;
