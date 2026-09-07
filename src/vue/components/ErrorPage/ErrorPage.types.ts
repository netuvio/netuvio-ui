import type { Theme } from '../../../shared/tokens';

export type ErrorPageLang = 'cs' | 'en';
export type ErrorPageTheme = Theme | 'auto';

export type LocalizedString =
  | string
  | Partial<Record<ErrorPageLang, string>>
  | Record<string, string>;

export interface ErrorPageUIStrings {
  httpStatus?: string;
  home?: string;
  retry?: string;
  requestId?: string;
  clientGeneric?: string;
  serverGeneric?: string;
  support?: string;
}

export type CustomMessagesProp =
  | Record<number | string, LocalizedString>
  | Record<string, Record<number | string, string>>
  | Record<string | number, any>;

export interface ErrorPageProps {
  /** HTTP status code to display (e.g. 404, 500). Falls back to 500 if unsupported. */
  code: number;

  /**
   * Custom error message/description for the current error code.
   * Overrides the default message.
   * Can be:
   * - plain string: "Something went wrong"
   * - i18n record: { cs: "Vlastní popis", en: "Custom description" }
   * If a language is omitted (e.g. only cs provided), other languages fallback to default.
   */
  message?: LocalizedString;

  /**
   * Custom error title/heading for the current error code.
   * Overrides the default title.
   * Can be:
   * - plain string: "Custom Title"
   * - i18n record: { cs: "Vlastní titulek", en: "Custom Title" }
   */
  title?: LocalizedString;

  /** Alias for title */
  heading?: LocalizedString;

  /** Custom backdrop text font size. Defaults to 'clamp(280px, 54vw, 820px)'. */
  backdropFontSize?: string;

  /**
   * Dictionary of custom error messages that override defaults.
   * You only need to define the codes and languages you want to override —
   * all unmentioned codes and languages automatically keep their built-in defaults!
   *
   * Supports:
   * 1. By code: { 404: { cs: "Článek nenalezen" } } (only 404 in cs is overridden; en stays default!)
   * 2. By lang: { cs: { 404: "Článek nenalezen" } } (standard vue-i18n / Nuxt format)
   * 3. Flat string: { 404: "Not found" }
   */
  messages?: CustomMessagesProp;

  /**
   * Dictionary of custom error titles that override defaults.
   * Same flexible format as messages: by code or by language.
   */
  titles?: CustomMessagesProp;

  /**
   * Override default UI strings (buttons, labels) per language:
   * e.g. { cs: { home: "Zpět do aplikace", retry: "Obnovit" } }
   */
  ui?: Partial<Record<ErrorPageLang, ErrorPageUIStrings>> | Record<string, ErrorPageUIStrings>;

  /** UI language. Defaults to 'en'. */
  lang?: ErrorPageLang | string;

  /** Color theme. 'auto' follows prefers-color-scheme. Defaults to 'auto'. */
  theme?: ErrorPageTheme;

  /** URL for the "Go to homepage" button. Defaults to '/'. */
  homepageUrl?: string;

  /** URL for the "Try again" button. Defaults to the current page URL. */
  retryUrl?: string;

  /** Optional request ID to display (e.g. CF-Ray, X-Request-ID). */
  requestId?: string;

  /** Override the Netuvio support/brand URL (defaults to netuvio.cz for cs, netuvio.com for en). */
  netuvioUrl?: string;
}
