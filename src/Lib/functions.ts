export const searchQuery = (query: string, toFind: string) =>
  new RegExp(`.*${query.split(" ").join(".*")}.*`, "gi").test(toFind);
