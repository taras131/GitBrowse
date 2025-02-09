import { MESSAGE_SEVERITY } from "../features/message/model/slice";

export interface IMessage {
  severity: MESSAGE_SEVERITY;
  text: string;
}
