import { NextResponse } from "next/server";

export default function middleware(req) {
  let verify = req.cookies.get("authToken");
  let url = req.url;
  //   console.log("Middleware", verify);

  if (!verify?.value && url.includes("/quiz")) {
    return NextResponse.redirect("http://localhost:3000/login");
  }

  if (verify?.value && url.includes("/login")) {
    return NextResponse.redirect("http://localhost:3000/");
  }

  //   if (!verify?.value && !url.includes("/login")) {
  //     return NextResponse.redirect("http://localhost:3000/login");
  //   }

  //   if (verify && url === "http://localhost:3000/") {
  //     return NextResponse.redirect("http://localhost:3000/");
  //   }
}
