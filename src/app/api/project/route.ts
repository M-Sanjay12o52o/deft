import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();
  const { title, description } = body;

  const newProject = await prisma.project.create({
    data: {
      title,
      description,
    },
  });

  return new Response(JSON.stringify(newProject), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
