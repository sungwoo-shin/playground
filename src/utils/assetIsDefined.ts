export function assertIsDefined<T>(
  val: T,
  error: Error | string = new Error(),
): asserts val is NonNullable<T> {
  if (val === undefined || val === null) {
    if (typeof error === "string") {
      throw new Error(error);
    } else {
      throw error;
    }
  }
}
