import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, name } = body;

  const newUser = await prisma.user.create({
    data: {
      email: email,
      name: name,
    },
  });

  return new Response(JSON.stringify(newUser), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}

export async function GET(req: Request, res: Response) {
  // - [ ] get actual userId from frontend
  const userId = 1;

  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

  return new Response(JSON.stringify(user), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
