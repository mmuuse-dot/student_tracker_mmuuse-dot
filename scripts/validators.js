export const patterns = {
  description: /^\S(?:.*\S)?$/,
  amount: /^(0|[1-9]\d*)(\.\d{1,2})?$/,
  date: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,
  category: /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/,
  duplicateWords: /\b(\w+)\s+\1\b/i
};

export function validateTransaction(data) {
  const errors = {};

  if (!patterns.description.test(data.description)) {
    errors.description = "Description cannot start or end with spaces.";
  }

  if (patterns.duplicateWords.test(data.description)) {
    errors.description = "Duplicate words detected.";
  }

  if (!patterns.amount.test(data.amount)) {
    errors.amount = "Invalid amount.";
  }

  if (!patterns.category.test(data.category)) {
    errors.category = "Invalid category.";
  }

  if (!patterns.date.test(data.date)) {
    errors.date = "Invalid date.";
  }

  return errors;
}
