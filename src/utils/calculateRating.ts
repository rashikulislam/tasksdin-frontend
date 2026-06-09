type TRating = {
  rate: number;
};
export const calculateRatings = (ratings: TRating[]) => {
  const length = ratings?.length;
  let rate;
  const totalRate = ratings?.reduce(
    (acc: number, curr: TRating) => acc + curr?.rate,
    0
  );
  if (!length) {
    return (rate = 1.5);
  }
  rate = (totalRate / length).toFixed(1);
  return rate;
};
