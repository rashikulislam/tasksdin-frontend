// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const modifyRegistrationInfo = (info: Record<string, any>) => {
  const { password, ...rests } = info;

  const data = {
    password,
    data: rests,
  };

  return data;
};
