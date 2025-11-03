export async function getProjects() {
  const res = await fetch("/api/project", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch projects");
  }

  const data = await res.json();
  return data.data;
}
