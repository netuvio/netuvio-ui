<script setup lang="ts">
import { computed } from 'vue';
import type { ErrorPageProps, LocalizedString, ErrorPageLang, ErrorPageUIStrings } from './ErrorPage.types';
import { NvLogo } from '../Logo';
import { NvIcon } from '../Icon';
import { NvBackdropText } from '../BackdropText';
import styles from '../../../shared/styles/components/ErrorPage.module.css';

defineOptions({
  name: 'NvErrorPage',
});

const props = withDefaults(defineProps<ErrorPageProps>(), {
  lang: 'en',
  theme: 'auto',
  homepageUrl: '/',
  backdropFontSize: 'clamp(280px, 54vw, 820px)',
  backdropTop: '42%',
});

// ── Supported error codes ──────────────────────────────────────────────────
const SUPPORTED_CODES = new Set([
  400, 401, 402, 403, 404, 405, 406, 408, 409, 410, 411, 412, 413, 414,
  415, 416, 417, 421, 422, 423, 424, 425, 426, 428, 429, 431, 451,
  500, 501, 502, 503, 504, 505, 506, 507, 508, 510, 511,
]);

// ── i18n data ──────────────────────────────────────────────────────────────
const STATUS_TITLES: Record<'cs' | 'en', Record<number, string>> = {
  cs: {
    400: 'Neplatný požadavek',
    401: 'Vyžadováno přihlášení',
    402: 'Vyžadována platba',
    403: 'Přístup odepřen',
    404: 'Stránka nenalezena',
    405: 'Metoda není povolena',
    406: 'Nepřijatelný požadavek',
    408: 'Vypršel čas požadavku',
    409: 'Konflikt požadavku',
    410: 'Obsah již není dostupný',
    411: 'Chybí délka požadavku',
    412: 'Podmínka nebyla splněna',
    413: 'Požadavek je příliš velký',
    414: 'Adresa je příliš dlouhá',
    415: 'Nepodporovaný typ obsahu',
    416: 'Požadovaný rozsah není dostupný',
    417: 'Očekávání nebylo splněno',
    421: 'Požadavek míří na nesprávný server',
    422: 'Požadavek nelze zpracovat',
    423: 'Zdroj je uzamčen',
    424: 'Závislost požadavku selhala',
    425: 'Požadavek přišel příliš brzy',
    426: 'Je vyžadován upgrade protokolu',
    428: 'Je vyžadována podmínka',
    429: 'Příliš mnoho požadavků',
    431: 'Hlavičky požadavku jsou příliš velké',
    451: 'Obsah není dostupný z právních důvodů',
    500: 'Něco se pokazilo',
    501: 'Funkce není podporována',
    502: 'Chybná odpověď serveru',
    503: 'Služba je dočasně nedostupná',
    504: 'Server neodpověděl včas',
    505: 'Verze HTTP není podporována',
    506: 'Chyba vyjednávání obsahu',
    507: 'Nedostatek úložného prostoru',
    508: 'Server zjistil nekonečnou smyčku',
    510: 'Je vyžadováno další rozšíření',
    511: 'Je vyžadováno síťové přihlášení',
  },
  en: {
    400: 'Bad request',
    401: 'Authentication required',
    402: 'Payment required',
    403: 'Access denied',
    404: 'Page not found',
    405: 'Method not allowed',
    406: 'Not acceptable',
    408: 'Request timeout',
    409: 'Request conflict',
    410: 'Content is no longer available',
    411: 'Length required',
    412: 'Precondition failed',
    413: 'Request is too large',
    414: 'Address is too long',
    415: 'Unsupported media type',
    416: 'Requested range is not available',
    417: 'Expectation failed',
    421: 'Misdirected request',
    422: 'Request cannot be processed',
    423: 'Resource is locked',
    424: 'Request dependency failed',
    425: 'Request arrived too early',
    426: 'Protocol upgrade required',
    428: 'Precondition required',
    429: 'Too many requests',
    431: 'Request headers are too large',
    451: 'Unavailable for legal reasons',
    500: 'Something went wrong',
    501: 'Feature is not supported',
    502: 'Bad gateway response',
    503: 'Service temporarily unavailable',
    504: 'Server did not respond in time',
    505: 'HTTP version is not supported',
    506: 'Content negotiation error',
    507: 'Insufficient storage',
    508: 'Server detected an infinite loop',
    510: 'Further extension is required',
    511: 'Network authentication required',
  },
};

const SPECIFIC_DESCRIPTIONS: Record<'cs' | 'en', Record<number, string>> = {
  cs: {
    400: 'Server požadavku nerozuměl. Zkontrolujte jeho podobu a zkuste to znovu.',
    401: 'Pro zobrazení této stránky se nejprve přihlaste.',
    403: 'K tomuto obsahu nemáte potřebné oprávnění.',
    404: 'Odkaz může být neplatný nebo byla stránka přesunuta jinam.',
    408: 'Server nedostal celý požadavek včas. Zkuste jej odeslat znovu.',
    410: 'Požadovaný obsah byl trvale odstraněn.',
    413: 'Odesílaná data překračují povolenou velikost.',
    429: 'Počkejte prosím chvíli a potom požadavek zopakujte.',
    451: 'Tento obsah nelze z právních důvodů zpřístupnit.',
    500: 'Na serveru nastala neočekávaná chyba. Na nápravě už možná pracujeme.',
    502: 'Server obdržel neplatnou odpověď od navazující služby.',
    503: 'Web právě prochází údržbou nebo je přetížený. Zkuste to prosím za chvíli.',
    504: 'Navazující služba neodpověděla v časovém limitu.',
  },
  en: {
    400: 'The server could not understand the request. Check it and try again.',
    401: 'Please sign in before viewing this page.',
    403: 'You do not have permission to access this content.',
    404: 'The link may be invalid or the page may have moved elsewhere.',
    408: 'The server did not receive the complete request in time. Please try again.',
    410: 'The requested content has been permanently removed.',
    413: 'The submitted data exceeds the allowed size.',
    429: 'Please wait a moment before repeating the request.',
    451: 'This content cannot be made available for legal reasons.',
    500: 'The server encountered an unexpected error. We may already be working on it.',
    502: 'The server received an invalid response from an upstream service.',
    503: 'The website is undergoing maintenance or is overloaded. Please try again shortly.',
    504: 'An upstream service did not respond within the time limit.',
  },
};

const UI_STRINGS: Record<'cs' | 'en', Record<string, string>> = {
  cs: {
    httpStatus: 'Stav HTTP',
    home: 'Na hlavní stránku',
    retry: 'Zkusit znovu',
    requestId: 'ID požadavku',
    clientGeneric: 'Požadavek se nepodařilo zpracovat. Zkontrolujte jej a zkuste to znovu.',
    serverGeneric: 'Server momentálně nemůže požadavek dokončit. Zkuste to prosím za chvíli.',
    support: 'Podpora',
  },
  en: {
    httpStatus: 'HTTP status',
    home: 'Go to homepage',
    retry: 'Try again',
    requestId: 'Request ID',
    clientGeneric: 'The request could not be processed. Check it and try again.',
    serverGeneric: 'The server cannot complete the request right now. Please try again shortly.',
    support: 'Support',
  },
};

// ── i18n Resolution Helpers ────────────────────────────────────────────────
function resolveLocalized(
  value: LocalizedString | undefined,
  lang: string,
  langKey: 'cs' | 'en',
): string | undefined {
  if (!value) return undefined;
  if (typeof value === 'string') return value;
  if (typeof value === 'object' && value !== null) {
    const record = value as Record<string, string>;
    // Exact language match (e.g. 'cs' or 'cs-CZ')
    if (record[lang]) return record[lang];
    // Normalized language key match ('cs' or 'en')
    if (record[langKey]) return record[langKey];
    // NOTE: If this specific language is not defined in the custom object,
    // return undefined so it falls back to the built-in default for this language!
  }
  return undefined;
}

function getFromCustomDict(
  dict: Record<string | number, any> | undefined,
  code: number,
  lang: string,
  langKey: 'cs' | 'en',
): string | undefined {
  if (!dict) return undefined;

  // Format A: by-language structure, e.g. { cs: { 404: '...' } }
  const byLang = dict[lang] ?? dict[langKey];
  if (byLang && typeof byLang === 'object') {
    const fromLang = byLang[code] ?? byLang[String(code)];
    if (typeof fromLang === 'string') return fromLang;
    if (typeof fromLang === 'object') {
      const res = resolveLocalized(fromLang, lang, langKey);
      if (res) return res;
    }
  }

  // Format B: by-code structure, e.g. { 404: { cs: '...' } } or { 404: '...' }
  const byCode = dict[code] ?? dict[String(code)];
  if (byCode) {
    const res = resolveLocalized(byCode, lang, langKey);
    if (res) return res;
  }

  return undefined;
}

// ── Computed ───────────────────────────────────────────────────────────────
const resolvedCode = computed<number>(() =>
  SUPPORTED_CODES.has(props.code) ? props.code : 500,
);

const resolvedLang = computed<string>(() => props.lang ?? 'en');
const resolvedLangKey = computed<ErrorPageLang>(() =>
  resolvedLang.value.toLowerCase().startsWith('cs') ? 'cs' : 'en',
);

const ui = computed(() => {
  const base = UI_STRINGS[resolvedLangKey.value];
  const uiMap = props.ui as Record<string, ErrorPageUIStrings> | undefined;
  const custom = uiMap?.[resolvedLang.value] ?? uiMap?.[resolvedLangKey.value];
  return custom ? { ...base, ...custom } : base;
});

const resolvedTitle = computed<string>(() => {
  // 1. Direct title or heading prop (overrides default for specified lang/code)
  const fromProp = resolveLocalized(props.title ?? props.heading, resolvedLang.value, resolvedLangKey.value);
  if (fromProp) return fromProp;

  // 2. Custom titles dictionary (overrides default for specified lang/code)
  const fromDict = getFromCustomDict(props.titles, resolvedCode.value, resolvedLang.value, resolvedLangKey.value);
  if (fromDict) return fromDict;

  // 3. Built-in titles table (default)
  return STATUS_TITLES[resolvedLangKey.value]?.[resolvedCode.value] ?? STATUS_TITLES['en'][500];
});

const resolvedDescription = computed<string>(() => {
  // 1. Direct message prop (overrides default for specified lang/code)
  const fromProp = resolveLocalized(props.message, resolvedLang.value, resolvedLangKey.value);
  if (fromProp) return fromProp;

  // 2. Custom messages dictionary (overrides default for specified lang/code)
  const fromDict = getFromCustomDict(props.messages, resolvedCode.value, resolvedLang.value, resolvedLangKey.value);
  if (fromDict) return fromDict;

  // 3. Built-in specific description (default)
  const specific = SPECIFIC_DESCRIPTIONS[resolvedLangKey.value]?.[resolvedCode.value];
  if (specific) return specific;

  // 4. Built-in generic fallback (default)
  return resolvedCode.value >= 500
    ? ui.value.serverGeneric
    : ui.value.clientGeneric;
});

const resolvedNetuvioUrl = computed<string>(() => {
  if (props.netuvioUrl) return props.netuvioUrl;
  return resolvedLangKey.value === 'cs' ? 'https://netuvio.cz' : 'https://netuvio.com';
});

const resolvedRetryUrl = computed<string>(() => {
  if (props.retryUrl) return props.retryUrl;
  if (typeof window !== 'undefined') return window.location.href;
  return '/';
});

/**
 * data-theme goes on .page (a real CSS box) so that local CSS module
 * selectors like `.page[data-theme="dark"] .title` work without
 * relying on :root-level data-theme checks.
 * 'auto' → no attribute → prefers-color-scheme media query takes over.
 */
const dataTheme = computed<string | undefined>(() => {
  if (props.theme === 'auto') return undefined;
  return props.theme;
});
</script>

<template>
  <div :class="styles.errorPage">
    <div
      :class="styles.page"
      :data-theme="dataTheme"
    >
      <!-- Topbar -->
      <header :class="styles.topbar">
        <slot
          name="topbar"
          :code="resolvedCode"
          :lang="resolvedLang"
          :netuvio-url="resolvedNetuvioUrl"
          :support-text="ui.support"
        >
          <a
            :class="styles.brand"
            :href="resolvedNetuvioUrl"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="`Netuvio (${resolvedLangKey === 'cs' ? 'netuvio.cz' : 'netuvio.com'})`"
          >
            <NvLogo variant="monochrome" :height="34" />
          </a>

          <a
            :class="styles.topbarLink"
            :href="resolvedNetuvioUrl"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ ui.support }}
            <NvIcon name="external-link" :size="16" aria-hidden="true" />
          </a>
        </slot>
      </header>

      <!-- Hero -->
      <main :class="styles.hero">
        <!-- Backdrop number — NvBackdropText renders ::before + ::after outline layers -->
        <slot
          name="backdrop"
          :code="resolvedCode"
        >
          <NvBackdropText
            :text="String(resolvedCode)"
            :fixed="false"
            :scale-x="0.82"
            :font-size="props.backdropFontSize"
            :top="props.backdropTop"
            mobile-font-size="120vw"
            :z-index="0"
          />
        </slot>

        <section
          :class="styles.heroCopy"
          :aria-labelledby="`nv-error-title-${resolvedCode}`"
        >
          <!-- Eyebrow label -->
          <slot
            name="eyebrow"
            :code="resolvedCode"
            :label="ui.httpStatus"
          >
            <p :class="styles.eyebrow">
              {{ ui.httpStatus }}&nbsp;·&nbsp;{{ resolvedCode }}
            </p>
          </slot>

          <!-- Custom h1 with scoped stroke styling -->
          <h1
            :id="`nv-error-title-${resolvedCode}`"
            :class="styles.title"
            :data-text="resolvedTitle"
          >
            <slot
              name="title"
              :code="resolvedCode"
              :lang="resolvedLang"
              :default-title="resolvedTitle"
            >
              {{ resolvedTitle }}
            </slot>
          </h1>

          <!-- Description / message -->
          <p :class="styles.description">
            <slot
              name="description"
              :code="resolvedCode"
              :lang="resolvedLang"
              :default-message="resolvedDescription"
            >
              <slot
                :code="resolvedCode"
                :lang="resolvedLang"
                :default-message="resolvedDescription"
              >
                {{ resolvedDescription }}
              </slot>
            </slot>
          </p>

          <!-- Action buttons -->
          <slot
            name="actions"
            :code="resolvedCode"
            :lang="resolvedLang"
            :ui="ui"
            :homepage-url="homepageUrl"
            :retry-url="resolvedRetryUrl"
          >
            <div :class="styles.actions">
              <a
                :class="[styles.button, styles.buttonPrimary]"
                :href="homepageUrl"
              >
                {{ ui.home }}
                <NvIcon name="chevron-right" :size="18" aria-hidden="true" />
              </a>

              <a
                :class="styles.button"
                :href="resolvedRetryUrl"
              >
                <NvIcon name="refresh" :size="18" aria-hidden="true" />
                {{ ui.retry }}
              </a>
            </div>
          </slot>

          <!-- Optional request ID -->
          <slot
            v-if="requestId"
            name="requestId"
            :request-id="requestId"
            :label="ui.requestId"
          >
            <p :class="styles.requestId">
              {{ ui.requestId }}: {{ requestId }}
            </p>
          </slot>
        </section>
      </main>
    </div>
  </div>
</template>
