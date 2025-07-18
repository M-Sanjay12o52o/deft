import prisma from "@/lib/prisma";

export async function GET(req: Request, res: Response) {
  const project = await prisma.project.findMany({});

  return new Response(JSON.stringify(project), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
