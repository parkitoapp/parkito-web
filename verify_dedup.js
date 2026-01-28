const slugify = (input) => {
  if (!input) return "";
  return input
    .toString()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

const parkings = [
  { id: 1, driver_name: "Host A", address: "Via Roma 1", city: "Torino" },
  { id: 2, driver_name: "Host A", address: "Via Roma 1", city: "Torino" }, // Duplicate
  { id: 3, driver_name: "Host B", address: "Via Roma 1", city: "Torino" }, // Different host, same address
  { id: 4, driver_name: "Host A", address: "Via Milano 2", city: "Torino" }, // Same host, different address
];

const uniqueParkings = new Map();

for (const p of parkings) {
  const key = `${p.driver_name}|${p.address}`;
  if (!uniqueParkings.has(key)) {
    uniqueParkings.set(key, p);
  }
}

const result = Array.from(uniqueParkings.values()).map((p) => ({
  slug: slugify(p.city),
  address: slugify(p.address),
}));

console.log("Deduplicated Result:", JSON.stringify(result, null, 2));

const expectedCount = 3;
if (result.length === expectedCount) {
  console.log(
    `✅ Success: Expected ${expectedCount} unique parkings, got ${result.length}`
  );
} else {
  console.error(
    `❌ Failure: Expected ${expectedCount} unique parkings, but got ${result.length}`
  );
}
