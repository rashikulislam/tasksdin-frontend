// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const modifyRegistrationInfo = (info: Record<string, any>) => {
  const { password, ...rests } = info;

  // Strip empty strings so optional backend fields receive undefined, not ""
  const cleanedData = Object.fromEntries(
    Object.entries(rests).filter(([, v]) => v !== "")
  );

  return { password, data: cleanedData };
};
