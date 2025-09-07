export type MessagesResponseType = {
  messages: { content: string; role: "user" | "ai" };
  reply: string;
};

export interface MessagesType {
  created_at: string;
  lead_email: string | null;
  messages: {
    content: string;
    role: "user" | "ai";
    timestamp: string;
  }[];

  thread_id: string;
  title: string;
}
