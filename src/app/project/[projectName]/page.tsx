export default async function Page({
  params,
}: {
  params: Promise<{ projectName: string }>;
}) {
  const { projectName } = await params;
  console.log("params: ", params);
  console.log("projectName: ", projectName);

  return <div className="text-red-700 text-8xl">My Project: {projectName}</div>;
}
