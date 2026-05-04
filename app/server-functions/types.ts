export interface PageSpeedResponse {
  captchaResult: string
  kind: "pagespeedonline#result"
  id: string
  loadingExperience: LoadingExperience
  originLoadingExperience: LoadingExperience
  lighthouseResult: LighthouseResult
  analysisUTCTimestamp: string
  version: Version
}

export interface LoadingExperience {
  id: string
  metrics: {
    [metricName: string]: Metric
  }
  overall_category: string
  initial_url: string
}

export interface Metric {
  percentile: number // integer
  distributions: Distribution[]
  category: string
}

export interface Distribution {
  min: number // integer
  max: number // integer
  proportion: number // double
}

export interface LighthouseResult {
  requestedUrl: string
  finalUrl: string
  lighthouseVersion: string
  userAgent: string
  fetchTime: string
  environment: Environment
  runWarnings: any[] // values can be various types
  configSettings: ConfigSettings
  audits: {
    [auditId: string]: Audit
  }
  categories: {
    [categoryId: string]: Category
  }
  categoryGroups: {
    [groupId: string]: CategoryGroup
  }
  runtimeError?: RuntimeError // optional according to API
  timing: Timing
  i18n: I18n
}

export interface Environment {
  networkUserAgent: string
  hostUserAgent: string
  benchmarkIndex: number // double
}

export interface ConfigSettings {
  emulatedFormFactor: string
  locale: string
  onlyCategories?: any // often string[] or null, using any for flexibility
}

export interface Audit {
  id: string
  title: string
  description: string
  score: number | null // can be null
  scoreDisplayMode: string
  displayValue?: string
  explanation?: string
  errorMessage?: string
  warnings?: any
  details?: {
    [key: string]: any
  }
}

export interface Category {
  id: string
  title: string
  description: string
  score: number | null
  manualDescription?: string
  auditRefs: AuditRef[]
}

export interface AuditRef {
  id: string
  weight: number // double
  group?: string
}

export interface CategoryGroup {
  title: string
  description: string
}

export interface RuntimeError {
  code: string
  message: string
}

export interface Timing {
  total: number // double
}

export interface I18n {
  rendererFormattedStrings: RendererFormattedStrings
}

export interface RendererFormattedStrings {
  varianceDisclaimer: string
  opportunityResourceColumnLabel: string
  opportunitySavingsColumnLabel: string
  errorMissingAuditInfo: string
  errorLabel: string
  warningHeader: string
  auditGroupExpandTooltip: string
  passedAuditsGroupTitle: string
  notApplicableAuditsGroupTitle: string
  manualAuditsGroupTitle: string
  toplevelWarningsMessage: string
  scorescaleLabel: string
  crcLongestDurationLabel: string
  crcInitialNavigation: string
  lsPerformanceCategoryDescription: string
  labDataTitle: string
}

export interface Version {
  major: number // integer
  minor: number // integer
}
