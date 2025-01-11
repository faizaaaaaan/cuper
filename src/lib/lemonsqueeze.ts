// @ts-ignore
import { LemonsqueezyClient } from "lmnsqz";

export const client = new LemonsqueezyClient(process.env.LEMONSQUEEZY_API_KEY as string);