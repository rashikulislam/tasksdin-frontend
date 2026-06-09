type TPayload = {
  text?: string;
  conversationId: string;
  senderId: string;
  files?: string[];
  type?: string;
};

const urlRegex = /(https?:\/\/[^\s]+)|(www\.[^\s]+)/i;

const hasLink = (text?: string): boolean => {
  if (!text) return false;
  return urlRegex.test(text);
};

export const modifyPayload = (values: TPayload) => {
  const { files, text, ...rest } = values;

  const containsText = !!text?.trim();
  const containsFile = !!files?.length;
  const containsLink = hasLink(text);

  let type = "TEXT";

  if (containsText && containsFile && containsLink) {
    type = "TEXT_LINK_FILE";
  } else if (containsText && containsFile) {
    type = "TEXT_FILE";
  } else if (containsFile) {
    type = "FILE";
  } else if (containsText && containsLink) {
    type = "LINK";
  } else if (containsText) {
    type = "TEXT";
  }

  const payload = {
    ...rest,
    mediaUrl: containsFile ? files : [],
    text,
    type,
  };

  return payload;
};
