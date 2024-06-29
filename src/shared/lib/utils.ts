import { SyntheticEvent } from "react";
import dayjs from "dayjs";

type AsyncEventHandler = (
  promise: (event: SyntheticEvent) => Promise<void>,
) => (event: SyntheticEvent) => void;

export const asyncEventHandler: AsyncEventHandler = (promise) => (event) => {
  if (promise) promise(event).catch(console.log);
};

export const dateFormat = (value: Date) => dayjs(value).format("DD.MM.YYYY HH:mm");

export const dateParser = (value: Date) => dayjs(value).toISOString();
