export default async function Page({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;

  return <div className="text-red-700 text-8xl">My Project: {projectId}</div>;
}
