import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import { headers } from "next/headers";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  const header = await headers();

  if (!locale) {
    locale = header.get("accept-language")?.split(",")[0];
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  console.log("hit locale:", locale);

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
