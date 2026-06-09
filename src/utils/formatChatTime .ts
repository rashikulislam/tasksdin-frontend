import moment from "moment";

export const formatChatTime = (date?: string) => {
  if (!date) return "";

  const m = moment(date);

  if (m.isSame(moment(), "day")) {
    return m.format("hh:mm a"); // today
  }

  if (m.isSame(moment().subtract(1, "day"), "day")) {
    return "Yesterday";
  }

  if (m.isAfter(moment().subtract(7, "days"))) {
    return m.format("ddd"); // Mon, Tue
  }

  return m.format("DD MMM"); // 12 Jan
};
