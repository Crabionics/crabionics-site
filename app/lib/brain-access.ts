import { auth, currentUser } from "@clerk/nextjs/server";

/** Keep initial Brain pilot restricted to staff with server-trusted Clerk admin role. */
export async function brainUserId(): Promise<string|null> {
  const session=await auth();
  if(!session.userId)return null;
  const user=await currentUser();
  return user?.publicMetadata?.role==="admin" ? session.userId : null;
}
export const brainSameOrigin = (request:Request) => {
  try {
    const origin=request.headers.get("origin");
    return Boolean(origin && origin===new URL(request.url).origin);
  } catch { return false; }
};
export const brainJson = (body:object,status=200) => Response.json(body,{
  status,headers:{"Cache-Control":"no-store","X-Content-Type-Options":"nosniff"} });
