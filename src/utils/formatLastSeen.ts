import moment from "moment";

export const formatLastSeen = (date?: Date | null) => {
  if (!date) return "Last seen recently";

  const m = moment(date);

  if (m.isSame(moment(), "minute")) {
    return "just now";
  }

  if (m.isSame(moment(), "day")) {
    return `Today at ${m.format("h:mm A")}`;
  }

  if (m.isSame(moment().subtract(1, "day"), "day")) {
    return `Testerday at ${m.format("h:mm A")}`;
  }

  return `${m.format("MMM D")} at ${m.format("h:mm A")}`;
};
