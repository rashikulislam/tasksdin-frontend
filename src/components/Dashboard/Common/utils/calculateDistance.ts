export const calculateDistance = (
  user: { lat1: number; lng1: number },
  provider: { lat2: number; lng2: number },
) => {
  console.log(user);
  console.log(provider);
  const R = 6371;
  const dLat = ((provider.lat2 - user.lat1) * Math.PI) / 180;
  const dLng = ((provider.lng2 - user.lng1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((user.lat1 * Math.PI) / 180) *
      Math.cos((provider.lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;

  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
};
