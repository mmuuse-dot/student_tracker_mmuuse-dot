export function regexSearch(
  records,
  pattern,
  ignoreCase
) {
  try {

    const regex = new RegExp(
      pattern,
      ignoreCase ? "i" : ""
    );

    return records.filter(record =>
      regex.test(record.description) ||
      regex.test(record.category)
    );

  } catch {
    return null;
  }
}
