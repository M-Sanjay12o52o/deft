import prisma from "@/lib/prisma";

export async function GET(req: Request, res: Response) {
  // - [ ] get actual projectId
  const projectId = 1;

  const project = await prisma.project.findFirst({
    where: {
      id: projectId,
    },
  });

  return new Response(JSON.stringify(project), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
