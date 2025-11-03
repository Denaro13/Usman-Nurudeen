export async function getExperiences() {
  const res = await fetch("/api/experience", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch experiences");
  }

  const data = await res.json();
  return data.data;
}
