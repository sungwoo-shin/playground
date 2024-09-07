export const getContextError = (contextName: string) =>
  `use${contextName} is only available within ${contextName}Context.Provider.`;
