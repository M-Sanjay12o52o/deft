import prisma from "@/lib/prisma";

// In progress

// Questions

export async function GET(req: Request, { params }: any) {
  const { projectId } = await params;

  const project = await prisma.project.findFirst({
    where: {
      id: parseInt(projectId),
    },
  });

  return new Response(JSON.stringify(project), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
