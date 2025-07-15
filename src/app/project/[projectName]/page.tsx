export default async function Page({
  params,
}: {
  params: Promise<{ projectName: string }>;
}) {
  const { projectName } = await params;

  return <div className="text-red-700 text-8xl">My Project: {projectName}</div>;
}
