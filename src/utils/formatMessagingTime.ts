import moment from "moment";

export const formatMessageTime = (date: string | Date) => {
  const msgTime = moment(date);
  return msgTime.format("h:mm A, MMM D");
};
