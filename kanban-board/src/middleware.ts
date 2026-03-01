import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const USERNAME = process.env.AUTH_USERNAME ?? "admin";
const PASSWORD = process.env.AUTH_PASSWORD ?? "kanban123";

export function middleware(request: NextRequest) {
  const authHeader = request.headers.get("authorization");

  if (authHeader) {
    const base64 = authHeader.split(" ")[1];
    const decoded = Buffer.from(base64, "base64").toString("utf-8");
    const [user, pass] = decoded.split(":");

    if (user === USERNAME && pass === PASSWORD) {
      return NextResponse.next();
    }
  }

  return new NextResponse("Hozzáférés megtagadva", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Kanban Board"',
    },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
