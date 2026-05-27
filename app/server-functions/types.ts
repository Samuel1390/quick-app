// este es el tipo de respuesta que devuelve la api de page speed instgths
// https://developers.google.com/speed/docs/insights/rest?hl=es-419

export interface Root {
  captchaResult: string
  kind: string
  id: string
  loadingExperience: LoadingExperience
  lighthouseResult: LighthouseResult
  analysisUTCTimestamp: string
}

export interface LoadingExperience {
  initial_url: string
}

export interface LighthouseResult {
  requestedUrl: string
  finalUrl: string
  mainDocumentUrl: string
  finalDisplayedUrl: string
  lighthouseVersion: string
  userAgent: string
  fetchTime: string
  environment: Environment
  runWarnings: any[]
  configSettings: ConfigSettings
  audits: Audits
  categories: Categories
  categoryGroups: CategoryGroups
  timing: Timing
  i18n: I18n
  entities: Entity[]
  fullPageScreenshot: FullPageScreenshot
  runtimeError?: RuntimeError
}

export interface Environment {
  networkUserAgent: string
  hostUserAgent: string
  benchmarkIndex: number
}

export interface ConfigSettings {
  emulatedFormFactor: string
  formFactor: string
  locale: string
  onlyCategories: string[]
  channel: string
}

export interface Audits {
  "screenshot-thumbnails": ScreenshotThumbnails
  "duplicated-javascript-insight": DuplicatedJavascriptInsight
  "network-server-latency": NetworkServerLatency
  "unused-css-rules": UnusedCssRules
  "speed-index": SpeedIndex
  "unused-javascript": UnusedJavascript
  "network-dependency-tree-insight": NetworkDependencyTreeInsight
  "server-response-time": ServerResponseTime
  "script-treemap-data": ScriptTreemapData
  "max-potential-fid": MaxPotentialFid
  "cls-culprits-insight": ClsCulpritsInsight
  metrics: Metrics
  "non-composited-animations": NonCompositedAnimations
  "lcp-discovery-insight": LcpDiscoveryInsight
  "mainthread-work-breakdown": MainthreadWorkBreakdown
  "layout-shifts": LayoutShifts
  "dom-size-insight": DomSizeInsight
  "inp-breakdown-insight": InpBreakdownInsight
  "cumulative-layout-shift": CumulativeLayoutShift
  redirects: Redirects
  interactive: Interactive
  "unminified-javascript": UnminifiedJavascript
  diagnostics: Diagnostics
  "long-tasks": LongTasks
  "network-requests": NetworkRequests
  "network-rtt": NetworkRtt
  "first-contentful-paint": FirstContentfulPaint
  "image-delivery-insight": ImageDeliveryInsight
  "unminified-css": UnminifiedCss
  "lcp-breakdown-insight": LcpBreakdownInsight
  "total-blocking-time": TotalBlockingTime
  "resource-summary": ResourceSummary
  "third-parties-insight": ThirdPartiesInsight
  "bootup-time": BootupTime
  "largest-contentful-paint": LargestContentfulPaint
  "unsized-images": UnsizedImages
  "total-byte-weight": TotalByteWeight
  "viewport-insight": ViewportInsight
  "document-latency-insight": DocumentLatencyInsight
  "font-display-insight": FontDisplayInsight
  "main-thread-tasks": MainThreadTasks
  "cache-insight": CacheInsight
  "render-blocking-insight": RenderBlockingInsight
  "legacy-javascript-insight": LegacyJavascriptInsight
  "forced-reflow-insight": ForcedReflowInsight
  "user-timings": UserTimings
  "final-screenshot": FinalScreenshot
}

export interface ScreenshotThumbnails {
  id: string
  title: string
  description: string
  score: number
  scoreDisplayMode: string
  details: Details
}

export interface Details {
  scale: number
  type: string
  items: Item[]
}

export interface Item {
  timestamp: number
  timing: number
  data: string
}

export interface DuplicatedJavascriptInsight {
  id: string
  title: string
  description: string
  score: number
  scoreDisplayMode: string
  metricSavings: MetricSavings
  details: Details2
}

export interface MetricSavings {
  LCP: number
  FCP: number
}

export interface Details2 {
  items: any[]
  debugData: DebugData
  headings: Heading[]
  type: string
}

export interface DebugData {
  type: string
  wastedBytes: number
}

export interface Heading {
  key: string
  label: string
  valueType: string
  subItemsHeading: SubItemsHeading
  granularity?: number
}

export interface SubItemsHeading {
  valueType?: string
  key: string
}

export interface NetworkServerLatency {
  id: string
  title: string
  description: string
  score: number
  scoreDisplayMode: string
  displayValue: string
  details: Details3
  numericValue: number
  numericUnit: string
}

export interface Details3 {
  type: string
  sortedBy: string[]
  headings: Heading2[]
  items: Item2[]
}

export interface Heading2 {
  label: string
  valueType: string
  key: string
  granularity?: number
}

export interface Item2 {
  serverResponseTime: number
  origin: string
}

export interface UnusedCssRules {
  id: string
  title: string
  description: string
  score: number
  scoreDisplayMode: string
  metricSavings: MetricSavings2
  details: Details4
  numericValue: number
  numericUnit: string
}

export interface MetricSavings2 {
  LCP: number
  FCP: number
}

export interface Details4 {
  overallSavingsBytes: number
  sortedBy: string[]
  debugData: DebugData2
  overallSavingsMs: number
  headings: any[]
  type: string
  items: any[]
}

export interface DebugData2 {
  metricSavings: MetricSavings3
  type: string
}

export interface MetricSavings3 {
  FCP: number
  LCP: number
}

export interface SpeedIndex {
  id: string
  title: string
  description: string
  score: number
  scoreDisplayMode: string
  displayValue: string
  numericValue: number
  numericUnit: string
}

export interface UnusedJavascript {
  id: string
  title: string
  description: string
  score: number
  scoreDisplayMode: string
  displayValue: string
  metricSavings: MetricSavings4
  details: Details5
  numericValue: number
  numericUnit: string
}

export interface MetricSavings4 {
  LCP: number
  FCP: number
}

export interface Details5 {
  items: Item3[]
  headings: Heading3[]
  type: string
  debugData: DebugData3
  overallSavingsMs: number
  overallSavingsBytes: number
  sortedBy: string[]
}

export interface Item3 {
  wastedBytes: number
  totalBytes: number
  wastedPercent: number
  url: string
}

export interface Heading3 {
  key: string
  subItemsHeading: SubItemsHeading2
  label: string
  valueType: string
}

export interface SubItemsHeading2 {
  valueType?: string
  key: string
}

export interface DebugData3 {
  metricSavings: MetricSavings5
  type: string
}

export interface MetricSavings5 {
  FCP: number
  LCP: number
}

export interface NetworkDependencyTreeInsight {
  id: string
  title: string
  description: string
  score: number
  scoreDisplayMode: string
  metricSavings: MetricSavings6
  details: Details6
}

export interface MetricSavings6 {
  LCP: number
}

export interface Details6 {
  items: Item4[]
  type: string
}

export interface Item4 {
  type: string
  value: Value
  description?: string
  title?: string
}

export interface Value {
  longestChain?: LongestChain
  chains?: Chains
  type: string
  value?: string
}

export interface LongestChain {
  duration: number
}

export interface Chains {
  "12C5D5C5923E865BE075C37A93E70A9C": N12C5D5C5923E865Be075C37A93E70A9C
}

export interface N12C5D5C5923E865Be075C37A93E70A9C {
  url: string
  navStartToEndTime: number
  children: Children
  isLongest: boolean
  transferSize: number
}

export interface Children {
  "51.3": N513
  "51.2": N512
}

export interface N513 {
  url: string
  children: Children2
  transferSize: number
  navStartToEndTime: number
}

export interface Children2 {}

export interface N512 {
  url: string
  navStartToEndTime: number
  transferSize: number
  children: Children3
  isLongest: boolean
}

export interface Children3 {
  "51.6": N516
}

export interface N516 {
  url: string
  navStartToEndTime: number
  children: Children4
  isLongest: boolean
  transferSize: number
}

export interface Children4 {}

export interface ServerResponseTime {
  id: string
  title: string
  description: string
  score: any
  scoreDisplayMode: string
  errorMessage: string
}

export interface ScriptTreemapData {
  id: string
  title: string
  description: string
  score: number
  scoreDisplayMode: string
  details: Details7
}

export interface Details7 {
  nodes: Node[]
  type: string
}

export interface Node {
  encodedBytes: number
  name: string
  unusedBytes: number
  resourceBytes: number
}

export interface MaxPotentialFid {
  id: string
  title: string
  description: string
  score: number
  scoreDisplayMode: string
  displayValue: string
  numericValue: number
  numericUnit: string
}

export interface ClsCulpritsInsight {
  id: string
  title: string
  description: string
  score: number
  scoreDisplayMode: string
  metricSavings: MetricSavings7
  details: Details8
}

export interface MetricSavings7 {
  CLS: number
}

export interface Details8 {
  items: Item5[]
  type: string
}

export interface Item5 {
  items: Item6[]
  headings: Heading4[]
  type: string
}

export interface Item6 {
  score: number
  node: Node2
}

export interface Node2 {
  value?: string
  type: string
  snippet?: string
  lhId?: string
  nodeLabel?: string
  boundingRect?: BoundingRect
  path?: string
  selector?: string
}

export interface BoundingRect {
  height: number
  width: number
  right: number
  top: number
  left: number
  bottom: number
}

export interface Heading4 {
  subItemsHeading: SubItemsHeading3
  label: string
  valueType: string
  key: string
  granularity?: number
}

export interface SubItemsHeading3 {
  key: string
  valueType?: string
}

export interface Metrics {
  id: string
  title: string
  description: string
  score: number
  scoreDisplayMode: string
  details: Details9
  numericValue: number
  numericUnit: string
}

export interface Details9 {
  type: string
  items: Item7[]
}

export interface Item7 {
  firstContentfulPaint?: number
  observedNavigationStartTs?: number
  observedSpeedIndex?: number
  observedFirstContentfulPaintTs?: number
  cumulativeLayoutShiftMainFrame?: number
  observedLastVisualChange?: number
  maxPotentialFID?: number
  observedFirstVisualChangeTs?: number
  observedTimeOrigin?: number
  observedFirstContentfulPaintAllFrames?: number
  timeToFirstByte?: number
  observedFirstContentfulPaintAllFramesTs?: number
  observedFirstVisualChange?: number
  observedLargestContentfulPaintAllFrames?: number
  observedLargestContentfulPaintAllFramesTs?: number
  observedCumulativeLayoutShiftMainFrame?: number
  observedFirstContentfulPaint?: number
  observedLargestContentfulPaintTs?: number
  observedLoad?: number
  cumulativeLayoutShift?: number
  observedFirstPaintTs?: number
  totalBlockingTime?: number
  observedDomContentLoadedTs?: number
  interactive?: number
  observedSpeedIndexTs?: number
  observedTraceEnd?: number
  observedLargestContentfulPaint?: number
  observedCumulativeLayoutShift?: number
  observedTraceEndTs?: number
  observedLoadTs?: number
  observedFirstPaint?: number
  observedLastVisualChangeTs?: number
  observedTimeOriginTs?: number
  largestContentfulPaint?: number
  speedIndex?: number
  observedNavigationStart?: number
  observedDomContentLoaded?: number
  lcpInvalidated?: boolean
}

export interface NonCompositedAnimations {
  id: string
  title: string
  description: string
  score: number
  scoreDisplayMode: string
  displayValue: string
  metricSavings: MetricSavings8
  details: Details10
}

export interface MetricSavings8 {
  CLS: number
}

export interface Details10 {
  headings: Heading5[]
  type: string
  items: Item8[]
}

export interface Heading5 {
  valueType: string
  label: string
  subItemsHeading: SubItemsHeading4
  key?: string
}

export interface SubItemsHeading4 {
  valueType: string
  key: string
}

export interface Item8 {
  subItems: SubItems
  node: Node3
}

export interface SubItems {
  type: string
  items: Item9[]
}

export interface Item9 {
  animation: string
  failureReason: string
}

export interface Node3 {
  lhId: string
  snippet: string
  nodeLabel: string
  boundingRect: BoundingRect2
  path: string
  selector: string
  type: string
}

export interface BoundingRect2 {
  left: number
  right: number
  top: number
  width: number
  height: number
  bottom: number
}

export interface LcpDiscoveryInsight {
  id: string
  title: string
  description: string
  score: any
  scoreDisplayMode: string
}

export interface MainthreadWorkBreakdown {
  id: string
  title: string
  description: string
  score: number
  scoreDisplayMode: string
  displayValue: string
  metricSavings: MetricSavings9
  details: Details11
  numericValue: number
  numericUnit: string
}

export interface MetricSavings9 {
  TBT: number
}

export interface Details11 {
  items: Item10[]
  sortedBy: string[]
  headings: Heading6[]
  type: string
}

export interface Item10 {
  group: string
  duration: number
  groupLabel: string
}

export interface Heading6 {
  label: string
  valueType: string
  key: string
  granularity?: number
}

export interface LayoutShifts {
  id: string
  title: string
  description: string
  score: number
  scoreDisplayMode: string
  displayValue: string
  metricSavings: MetricSavings10
  details: Details12
}

export interface MetricSavings10 {
  CLS: number
}

export interface Details12 {
  headings: Heading7[]
  type: string
  items: Item11[]
}

export interface Heading7 {
  subItemsHeading: SubItemsHeading5
  valueType: string
  label: string
  key: string
  granularity?: number
}

export interface SubItemsHeading5 {
  key: string
  valueType?: string
}

export interface Item11 {
  node: Node4
  score: number
}

export interface Node4 {
  selector: string
  type: string
  lhId: string
  snippet: string
  nodeLabel: string
  boundingRect: BoundingRect3
  path: string
}

export interface BoundingRect3 {
  bottom: number
  width: number
  height: number
  left: number
  top: number
  right: number
}

export interface DomSizeInsight {
  id: string
  title: string
  description: string
  score: number
  scoreDisplayMode: string
  metricSavings: MetricSavings11
  details: Details13
  numericValue: number
  numericUnit: string
}

export interface MetricSavings11 {
  INP: number
}

export interface Details13 {
  items: Item12[]
  debugData: DebugData4
  headings: Heading8[]
  type: string
}

export interface Item12 {
  value: Value2
  statistic: string
  node?: Node5
}

export interface Value2 {
  granularity: number
  type: string
  value: number
}

export interface Node5 {
  type: string
  selector: string
  path: string
  snippet: string
  lhId: string
  nodeLabel: string
  boundingRect: BoundingRect4
}

export interface BoundingRect4 {
  bottom: number
  width: number
  height: number
  left: number
  right: number
  top: number
}

export interface DebugData4 {
  maxChildren: number
  type: string
  maxDepth: number
  totalElements: number
}

export interface Heading8 {
  key: string
  label: string
  valueType: string
}

export interface InpBreakdownInsight {
  id: string
  title: string
  description: string
  score: any
  scoreDisplayMode: string
}

export interface CumulativeLayoutShift {
  id: string
  title: string
  description: string
  score: number
  scoreDisplayMode: string
  displayValue: string
  details: Details14
  numericValue: number
  numericUnit: string
}

export interface Details14 {
  items: Item13[]
  type: string
}

export interface Item13 {
  newEngineResultDiffered: boolean
  newEngineResult: NewEngineResult
  cumulativeLayoutShiftMainFrame: number
}

export interface NewEngineResult {
  cumulativeLayoutShiftMainFrame: number
  cumulativeLayoutShift: number
}

export interface Redirects {
  id: string
  title: string
  description: string
  score: number
  scoreDisplayMode: string
  metricSavings: MetricSavings12
  details: Details15
  numericValue: number
  numericUnit: string
}

export interface MetricSavings12 {
  LCP: number
  FCP: number
}

export interface Details15 {
  overallSavingsMs: number
  items: any[]
  headings: any[]
  type: string
}

export interface Interactive {
  id: string
  title: string
  description: string
  score: number
  scoreDisplayMode: string
  displayValue: string
  numericValue: number
  numericUnit: string
}

export interface UnminifiedJavascript {
  id: string
  title: string
  description: string
  score: number
  scoreDisplayMode: string
  metricSavings: MetricSavings13
  details: Details16
  warnings: any[]
  numericValue: number
  numericUnit: string
}

export interface MetricSavings13 {
  LCP: number
  FCP: number
}

export interface Details16 {
  items: any[]
  headings: any[]
  type: string
  debugData: DebugData5
  overallSavingsMs: number
  overallSavingsBytes: number
  sortedBy: string[]
}

export interface DebugData5 {
  metricSavings: MetricSavings14
  type: string
}

export interface MetricSavings14 {
  FCP: number
  LCP: number
}

export interface Diagnostics {
  id: string
  title: string
  description: string
  score: number
  scoreDisplayMode: string
  details: Details17
}

export interface Details17 {
  items: Item14[]
  type: string
}

export interface Item14 {
  numStylesheets: number
  rtt: number
  numTasks: number
  throughput: number
  totalTaskTime: number
  maxServerLatency: number
  numTasksOver100ms: number
  totalByteWeight: number
  numTasksOver10ms: number
  maxRtt: number
  numTasksOver50ms: number
  numRequests: number
  numTasksOver25ms: number
  numScripts: number
  mainDocumentTransferSize: number
  numTasksOver500ms: number
  numFonts: number
}

export interface LongTasks {
  id: string
  title: string
  description: string
  score: number
  scoreDisplayMode: string
  displayValue: string
  metricSavings: MetricSavings15
  details: Details18
}

export interface MetricSavings15 {
  TBT: number
}

export interface Details18 {
  debugData: DebugData6
  skipSumming: string[]
  sortedBy: string[]
  items: Item15[]
  headings: Heading9[]
  type: string
}

export interface DebugData6 {
  urls: string[]
  type: string
  tasks: Task[]
}

export interface Task {
  urlIndex: number
  duration: number
  styleLayout?: number
  startTime: number
  paintCompositeRender?: number
  other: number
  scriptParseCompile?: number
  scriptEvaluation?: number
}

export interface Item15 {
  startTime: number
  duration: number
  url: string
}

export interface Heading9 {
  key: string
  label: string
  valueType: string
  granularity?: number
}

export interface NetworkRequests {
  id: string
  title: string
  description: string
  score: number
  scoreDisplayMode: string
  details: Details19
}

export interface Details19 {
  items: Item16[]
  debugData: DebugData7
  type: string
  headings: Heading10[]
}

export interface Item16 {
  mimeType: string
  finished: boolean
  statusCode: number
  experimentalFromMainFrame: boolean
  networkRequestTime: number
  priority: string
  resourceType?: string
  networkEndTime: number
  url: string
  transferSize: number
  sessionTargetType: string
  resourceSize: number
  rendererStartTime: number
  protocol: string
  entity: string
}

export interface DebugData7 {
  type: string
  initiators: Initiator[]
  networkStartTimeTs: number
}

export interface Initiator {
  columnNumber?: number
  lineNumber?: number
  url: string
  type: string
}

export interface Heading10 {
  key: string
  label: string
  valueType: string
  granularity?: number
  displayUnit?: string
}

export interface NetworkRtt {
  id: string
  title: string
  description: string
  score: number
  scoreDisplayMode: string
  displayValue: string
  details: Details20
  numericValue: number
  numericUnit: string
}

export interface Details20 {
  items: Item17[]
  type: string
  sortedBy: string[]
  headings: Heading11[]
}

export interface Item17 {
  origin: string
  rtt: number
}

export interface Heading11 {
  key: string
  label: string
  valueType: string
  granularity?: number
}

export interface FirstContentfulPaint {
  id: string
  title: string
  description: string
  score: number
  scoreDisplayMode: string
  displayValue: string
  numericValue: number
  numericUnit: string
}

export interface ImageDeliveryInsight {
  id: string
  title: string
  description: string
  score: number
  scoreDisplayMode: string
  displayValue: string
  metricSavings: MetricSavings16
  details: Details21
}

export interface MetricSavings16 {
  LCP: number
  FCP: number
}

export interface Details21 {
  type: string
  headings: Heading12[]
  items: Item18[]
  debugData: DebugData8
}

export interface Heading12 {
  valueType: string
  key: string
  subItemsHeading?: SubItemsHeading6
  label?: string
}

export interface SubItemsHeading6 {
  valueType: string
  key: string
}

export interface Item18 {
  subItems: SubItems2
  url: string
  node: Node6
  wastedBytes: number
  totalBytes: number
}

export interface SubItems2 {
  items: Item19[]
  type: string
}

export interface Item19 {
  wastedBytes: number
  reason: string
}

export interface Node6 {
  snippet: string
  lhId: string
  nodeLabel: string
  boundingRect: BoundingRect5
  path: string
  selector: string
  type: string
}

export interface BoundingRect5 {
  top: number
  right: number
  left: number
  height: number
  width: number
  bottom: number
}

export interface DebugData8 {
  wastedBytes: number
  type: string
}

export interface UnminifiedCss {
  id: string
  title: string
  description: string
  score: number
  scoreDisplayMode: string
  metricSavings: MetricSavings17
  details: Details22
  numericValue: number
  numericUnit: string
}

export interface MetricSavings17 {
  LCP: number
  FCP: number
}

export interface Details22 {
  overallSavingsMs: number
  debugData: DebugData9
  sortedBy: string[]
  overallSavingsBytes: number
  items: any[]
  headings: any[]
  type: string
}

export interface DebugData9 {
  metricSavings: MetricSavings18
  type: string
}

export interface MetricSavings18 {
  LCP: number
  FCP: number
}

export interface LcpBreakdownInsight {
  id: string
  title: string
  description: string
  score: number
  scoreDisplayMode: string
  metricSavings: MetricSavings19
  details: Details23
}

export interface MetricSavings19 {
  LCP: number
}

export interface Details23 {
  items: Item20[]
  type: string
}

export interface Item20 {
  headings?: Heading13[]
  type: string
  items?: Item21[]
  selector?: string
  path?: string
  boundingRect?: BoundingRect6
  nodeLabel?: string
  lhId?: string
  snippet?: string
}

export interface Heading13 {
  key: string
  label: string
  valueType: string
}

export interface Item21 {
  subpart: string
  label: string
  duration: number
}

export interface BoundingRect6 {
  bottom: number
  width: number
  height: number
  left: number
  top: number
  right: number
}

export interface TotalBlockingTime {
  id: string
  title: string
  description: string
  score: number
  scoreDisplayMode: string
  displayValue: string
  numericValue: number
  numericUnit: string
}

export interface ResourceSummary {
  id: string
  title: string
  description: string
  score: number
  scoreDisplayMode: string
  details: Details24
}

export interface Details24 {
  headings: Heading14[]
  type: string
  items: Item22[]
}

export interface Heading14 {
  valueType: string
  label: string
  key: string
}

export interface Item22 {
  transferSize: number
  requestCount: number
  label: string
  resourceType: string
}

export interface ThirdPartiesInsight {
  id: string
  title: string
  description: string
  score: number
  scoreDisplayMode: string
  details: Details25
}

export interface Details25 {
  isEntityGrouped: boolean
  items: Item23[]
  headings: Heading15[]
  type: string
}

export interface Item23 {
  subItems: SubItems3
  mainThreadTime: number
  transferSize: number
  entity: string
}

export interface SubItems3 {
  items: Item24[]
  type: string
}

export interface Item24 {
  mainThreadTime: number
  url: string
  transferSize: number
}

export interface Heading15 {
  subItemsHeading: SubItemsHeading7
  label: string
  valueType: string
  key: string
  granularity?: number
}

export interface SubItemsHeading7 {
  valueType?: string
  key: string
}

export interface BootupTime {
  id: string
  title: string
  description: string
  score: number
  scoreDisplayMode: string
  displayValue: string
  metricSavings: MetricSavings20
  details: Details26
  numericValue: number
  numericUnit: string
}

export interface MetricSavings20 {
  TBT: number
}

export interface Details26 {
  headings: Heading16[]
  type: string
  summary: Summary
  items: Item25[]
  sortedBy: string[]
}

export interface Heading16 {
  valueType: string
  label: string
  key: string
  granularity?: number
}

export interface Summary {
  wastedMs: number
}

export interface Item25 {
  total: number
  scriptParseCompile: number
  url: string
  scripting: number
}

export interface LargestContentfulPaint {
  id: string
  title: string
  description: string
  score: number
  scoreDisplayMode: string
  displayValue: string
  numericValue: number
  numericUnit: string
}

export interface UnsizedImages {
  id: string
  title: string
  description: string
  score: number
  scoreDisplayMode: string
  metricSavings: MetricSavings21
  details: Details27
}

export interface MetricSavings21 {
  CLS: number
}

export interface Details27 {
  headings: Heading17[]
  type: string
  items: any[]
}

export interface Heading17 {
  valueType: string
  key: string
  label?: string
}

export interface TotalByteWeight {
  id: string
  title: string
  description: string
  score: number
  scoreDisplayMode: string
  displayValue: string
  details: Details28
  numericValue: number
  numericUnit: string
}

export interface Details28 {
  sortedBy: string[]
  headings: Heading18[]
  type: string
  items: Item26[]
}

export interface Heading18 {
  key: string
  label: string
  valueType: string
}

export interface Item26 {
  totalBytes: number
  url: string
}

export interface ViewportInsight {
  id: string
  title: string
  description: string
  score: number
  scoreDisplayMode: string
  metricSavings: MetricSavings22
  details: Details29
}

export interface MetricSavings22 {
  INP: number
}

export interface Details29 {
  headings: Heading19[]
  type: string
  items: Item27[]
}

export interface Heading19 {
  valueType: string
  key: string
}

export interface Item27 {
  node: Node7
}

export interface Node7 {
  path: string
  lhId: string
  snippet: string
  nodeLabel: string
  boundingRect: BoundingRect7
  type: string
  selector: string
}

export interface BoundingRect7 {
  width: number
  height: number
  left: number
  top: number
  right: number
  bottom: number
}

export interface DocumentLatencyInsight {
  id: string
  title: string
  description: string
  score: any
  scoreDisplayMode: string
  errorMessage: string
}

export interface FontDisplayInsight {
  id: string
  title: string
  description: string
  score: number
  scoreDisplayMode: string
  metricSavings: MetricSavings23
  details: Details30
}

export interface MetricSavings23 {
  INP: number
}

export interface Details30 {
  items: any[]
  skipSumming: string[]
  headings: Heading20[]
  type: string
}

export interface Heading20 {
  valueType: string
  label: string
  key: string
}

export interface MainThreadTasks {
  id: string
  title: string
  description: string
  score: number
  scoreDisplayMode: string
  details: Details31
}

export interface Details31 {
  items: Item28[]
  headings: Heading21[]
  type: string
}

export interface Item28 {
  duration: number
  startTime: number
}

export interface Heading21 {
  granularity: number
  key: string
  label: string
  valueType: string
}

export interface CacheInsight {
  id: string
  title: string
  description: string
  score: number
  scoreDisplayMode: string
  displayValue: string
  metricSavings: MetricSavings24
  details: Details32
}

export interface MetricSavings24 {
  LCP: number
  FCP: number
}

export interface Details32 {
  skipSumming: string[]
  sortedBy: string[]
  debugData: DebugData10
  headings: Heading22[]
  type: string
  items: Item29[]
}

export interface DebugData10 {
  type: string
  wastedBytes: number
}

export interface Heading22 {
  key: string
  label: string
  valueType: string
  displayUnit?: string
  granularity?: number
}

export interface Item29 {
  url: string
  totalBytes: number
  wastedBytes: number
  cacheLifetimeMs: number
}

export interface RenderBlockingInsight {
  id: string
  title: string
  description: string
  score: number
  scoreDisplayMode: string
  displayValue: string
  metricSavings: MetricSavings25
  details: Details33
}

export interface MetricSavings25 {
  LCP: number
  FCP: number
}

export interface Details33 {
  items: Item30[]
  headings: Heading23[]
  type: string
}

export interface Item30 {
  totalBytes: number
  url: string
  wastedMs: number
}

export interface Heading23 {
  key: string
  label: string
  valueType: string
}

export interface LegacyJavascriptInsight {
  id: string
  title: string
  description: string
  score: number
  scoreDisplayMode: string
  metricSavings: MetricSavings26
  details: Details34
}

export interface MetricSavings26 {
  LCP: number
  FCP: number
}

export interface Details34 {
  headings: Heading24[]
  type: string
  debugData: DebugData11
  items: any[]
}

export interface Heading24 {
  subItemsHeading?: SubItemsHeading8
  label?: string
  valueType: string
  key?: string
}

export interface SubItemsHeading8 {
  valueType?: string
  key: string
}

export interface DebugData11 {
  wastedBytes: number
  type: string
}

export interface ForcedReflowInsight {
  id: string
  title: string
  description: string
  score: number
  scoreDisplayMode: string
  details: Details35
}

export interface Details35 {
  items: Item31[]
  type: string
}

export interface Item31 {
  headings: Heading25[]
  type: string
  items: any[]
}

export interface Heading25 {
  label: string
  valueType: string
  key: string
  granularity?: number
}

export interface UserTimings {
  id: string
  title: string
  description: string
  score: any
  scoreDisplayMode: string
  details: Details36
}

export interface Details36 {
  items: any[]
  headings: Heading26[]
  type: string
}

export interface Heading26 {
  key: string
  label: string
  valueType: string
  granularity?: number
}

export interface FinalScreenshot {
  id: string
  title: string
  description: string
  score: number
  scoreDisplayMode: string
  details: Details37
}

export interface Details37 {
  data: string
  type: string
  timestamp: number
  timing: number
}

export interface Categories {
  performance: Performance
}

export interface Performance {
  id: string
  title: string
  score: number
  auditRefs: AuditRef[]
}

export interface AuditRef {
  id: string
  weight: number
  group: string
  acronym?: string
}

export interface CategoryGroups {
  "a11y-tables-lists": A11yTablesLists
  "seo-content": SeoContent
  "a11y-audio-video": A11yAudioVideo
  "a11y-names-labels": A11yNamesLabels
  "a11y-navigation": A11yNavigation
  "seo-crawl": SeoCrawl
  "a11y-best-practices": A11yBestPractices
  diagnostics: Diagnostics2
  "best-practices-browser-compat": BestPracticesBrowserCompat
  "a11y-color-contrast": A11yColorContrast
  "best-practices-trust-safety": BestPracticesTrustSafety
  "best-practices-general": BestPracticesGeneral
  "a11y-language": A11yLanguage
  "a11y-aria": A11yAria
  "best-practices-ux": BestPracticesUx
  insights: Insights
  metrics: Metrics2
  "seo-mobile": SeoMobile
}

export interface A11yTablesLists {
  title: string
  description: string
}

export interface SeoContent {
  title: string
  description: string
}

export interface A11yAudioVideo {
  title: string
  description: string
}

export interface A11yNamesLabels {
  title: string
  description: string
}

export interface A11yNavigation {
  title: string
  description: string
}

export interface SeoCrawl {
  title: string
  description: string
}

export interface A11yBestPractices {
  title: string
  description: string
}

export interface Diagnostics2 {
  title: string
  description: string
}

export interface BestPracticesBrowserCompat {
  title: string
}

export interface A11yColorContrast {
  title: string
  description: string
}

export interface BestPracticesTrustSafety {
  title: string
}

export interface BestPracticesGeneral {
  title: string
}

export interface A11yLanguage {
  title: string
  description: string
}

export interface A11yAria {
  title: string
  description: string
}

export interface BestPracticesUx {
  title: string
}

export interface Insights {
  title: string
  description: string
}

export interface Metrics2 {
  title: string
}

export interface SeoMobile {
  title: string
  description: string
}

export interface Timing {
  total: number
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
  passedAuditsGroupTitle: string
  notApplicableAuditsGroupTitle: string
  manualAuditsGroupTitle: string
  toplevelWarningsMessage: string
  crcLongestDurationLabel: string
  crcInitialNavigation: string
  lsPerformanceCategoryDescription: string
  labDataTitle: string
  warningAuditsGroupTitle: string
  snippetExpandButtonLabel: string
  snippetCollapseButtonLabel: string
  thirdPartyResourcesLabel: string
  runtimeDesktopEmulation: string
  runtimeMobileEmulation: string
  runtimeNoEmulation: string
  runtimeSettingsBenchmark: string
  runtimeSettingsCPUThrottling: string
  runtimeSettingsDevice: string
  runtimeSettingsNetworkThrottling: string
  runtimeSettingsUANetwork: string
  runtimeUnknown: string
  dropdownCopyJSON: string
  dropdownDarkTheme: string
  dropdownPrintExpanded: string
  dropdownPrintSummary: string
  dropdownSaveGist: string
  dropdownSaveHTML: string
  dropdownSaveJSON: string
  dropdownViewer: string
  footerIssue: string
  throttlingProvided: string
  calculatorLink: string
  runtimeSettingsAxeVersion: string
  viewTreemapLabel: string
  showRelevantAudits: string
}

export interface Entity {
  name: string
  isFirstParty?: boolean
  isUnrecognized?: boolean
  origins: string[]
  category?: string
}

export interface FullPageScreenshot {
  nodes: Nodes
  screenshot: Screenshot
}

export interface Nodes {
  "page-65-svg": Page65Svg
  "page-23-DIV": Page23Div
  "page-17-DIV": Page17Div
  "page-11-DIV": Page11Div
  "page-12-DIV": Page12Div
  "page-75-svg": Page75Svg
  "page-34-svg": Page34Svg
  "page-44-DIV": Page44Div
  "page-2-DIV": Page2Div
  "page-74-svg": Page74Svg
  "page-43-svg": Page43Svg
  "page-35-::after": Page35After
  "page-18-DIV": Page18Div
  "1-3-IMG": N13Img
  "page-32-A": Page32A
  "page-25-DIV": Page25Div
  "page-6-P": Page6P
  "1-5-DIV": N15Div
  "page-27-A": Page27A
  "page-20-DIV": Page20Div
  "page-57-svg": Page57Svg
  "page-49-svg": Page49Svg
  "page-61-svg": Page61Svg
  "page-79-::after": Page79After
  "page-60-DIV": Page60Div
  "page-72-::after": Page72After
  "page-73-svg": Page73Svg
  "page-46-::after": Page46After
  "page-14-DIV": Page14Div
  "1-6-DIV": N16Div
  "page-7-H1": Page7H1
  "page-21-DIV": Page21Div
  "1-2-IMG": N12Img
  "page-13-DIV": Page13Div
  "page-55-::after": Page55After
  "page-76-::after": Page76After
  "page-38-::after": Page38After
  "page-53-A": Page53A
  "page-64-A": Page64A
  "page-59-::after": Page59After
  "page-15-DIV": Page15Div
  "page-28-::after": Page28After
  "page-42-svg": Page42Svg
  "page-3-IMG": Page3Img
  "page-52-svg": Page52Svg
  "page-39-svg": Page39Svg
  "page-66-svg": Page66Svg
  "page-50-svg": Page50Svg
  "page-41-svg": Page41Svg
  "page-47-svg": Page47Svg
  "page-9-::after": Page9After
  "page-0-IMG": Page0Img
  "1-1-IMG": N11Img
  "page-22-DIV": Page22Div
  "page-16-DIV": Page16Div
  "page-58-::after": Page58After
  "page-29-svg": Page29Svg
  "page-1-DIV": Page1Div
  "page-24-META": Page24Meta
  "page-78-svg": Page78Svg
  "page-37-::after": Page37After
  "page-77-svg": Page77Svg
  "page-70-svg": Page70Svg
  "page-36-svg": Page36Svg
  "page-8-::before": Page8Before
  "1-4-IMG": N14Img
  "1-7-DIV": N17Div
  "page-56-::after": Page56After
  "1-0-IMG": N10Img
  "page-30-svg": Page30Svg
  "page-26-ellipse": Page26Ellipse
  "page-71-svg": Page71Svg
  "page-45-svg": Page45Svg
  "page-40-svg": Page40Svg
  "page-62-::after": Page62After
  "page-51-svg": Page51Svg
  "page-19-DIV": Page19Div
  "page-31-svg": Page31Svg
  "page-54-svg": Page54Svg
  "page-4-IMG": Page4Img
  "page-68-svg": Page68Svg
  "page-5-IMG": Page5Img
  "page-10-DIV": Page10Div
  "page-48-svg": Page48Svg
  "page-69-H2": Page69H2
  "page-67-::after": Page67After
  "page-63-svg": Page63Svg
  "page-33-svg": Page33Svg
}

export interface Page65Svg {
  height: number
  width: number
  right: number
  top: number
  left: number
  bottom: number
}

export interface Page23Div {
  bottom: number
  height: number
  width: number
  right: number
  top: number
  left: number
}

export interface Page17Div {
  bottom: number
  width: number
  height: number
  left: number
  right: number
  top: number
}

export interface Page11Div {
  bottom: number
  height: number
  width: number
  right: number
  top: number
  left: number
}

export interface Page12Div {
  left: number
  top: number
  right: number
  width: number
  height: number
  bottom: number
}

export interface Page75Svg {
  width: number
  height: number
  left: number
  top: number
  right: number
  bottom: number
}

export interface Page34Svg {
  right: number
  top: number
  left: number
  height: number
  width: number
  bottom: number
}

export interface Page44Div {
  right: number
  top: number
  left: number
  height: number
  width: number
  bottom: number
}

export interface Page2Div {
  left: number
  right: number
  top: number
  width: number
  height: number
  bottom: number
}

export interface Page74Svg {
  bottom: number
  width: number
  height: number
  left: number
  top: number
  right: number
}

export interface Page43Svg {
  bottom: number
  height: number
  width: number
  right: number
  top: number
  left: number
}

export interface Page35After {
  height: number
  width: number
  right: number
  top: number
  left: number
  bottom: number
}

export interface Page18Div {
  bottom: number
  left: number
  top: number
  right: number
  width: number
  height: number
}

export interface N13Img {
  width: number
  height: number
  left: number
  right: number
  top: number
  bottom: number
}

export interface Page32A {
  left: number
  right: number
  top: number
  width: number
  height: number
  bottom: number
}

export interface Page25Div {
  bottom: number
  width: number
  height: number
  left: number
  right: number
  top: number
}

export interface Page6P {
  bottom: number
  height: number
  width: number
  right: number
  top: number
  left: number
}

export interface N15Div {
  bottom: number
  width: number
  height: number
  left: number
  right: number
  top: number
}

export interface Page27A {
  bottom: number
  height: number
  width: number
  right: number
  top: number
  left: number
}

export interface Page20Div {
  bottom: number
  height: number
  width: number
  right: number
  top: number
  left: number
}

export interface Page57Svg {
  height: number
  width: number
  right: number
  top: number
  left: number
  bottom: number
}

export interface Page49Svg {
  right: number
  top: number
  left: number
  height: number
  width: number
  bottom: number
}

export interface Page61Svg {
  bottom: number
  right: number
  top: number
  left: number
  height: number
  width: number
}

export interface Page79After {
  width: number
  height: number
  left: number
  top: number
  right: number
  bottom: number
}

export interface Page60Div {
  top: number
  right: number
  left: number
  height: number
  width: number
  bottom: number
}

export interface Page72After {
  bottom: number
  width: number
  height: number
  left: number
  top: number
  right: number
}

export interface Page73Svg {
  bottom: number
  height: number
  width: number
  right: number
  top: number
  left: number
}

export interface Page46After {
  bottom: number
  height: number
  width: number
  top: number
  right: number
  left: number
}

export interface Page14Div {
  right: number
  top: number
  left: number
  height: number
  width: number
  bottom: number
}

export interface N16Div {
  bottom: number
  top: number
  right: number
  left: number
  height: number
  width: number
}

export interface Page7H1 {
  bottom: number
  height: number
  width: number
  right: number
  top: number
  left: number
}

export interface Page21Div {
  bottom: number
  height: number
  width: number
  top: number
  right: number
  left: number
}

export interface N12Img {
  bottom: number
  width: number
  height: number
  left: number
  right: number
  top: number
}

export interface Page13Div {
  right: number
  top: number
  left: number
  height: number
  width: number
  bottom: number
}

export interface Page55After {
  height: number
  width: number
  right: number
  top: number
  left: number
  bottom: number
}

export interface Page76After {
  bottom: number
  left: number
  right: number
  top: number
  width: number
  height: number
}

export interface Page38After {
  width: number
  height: number
  left: number
  top: number
  right: number
  bottom: number
}

export interface Page53A {
  bottom: number
  width: number
  height: number
  left: number
  top: number
  right: number
}

export interface Page64A {
  height: number
  width: number
  top: number
  right: number
  left: number
  bottom: number
}

export interface Page59After {
  bottom: number
  right: number
  top: number
  left: number
  height: number
  width: number
}

export interface Page15Div {
  bottom: number
  left: number
  right: number
  top: number
  width: number
  height: number
}

export interface Page28After {
  bottom: number
  left: number
  right: number
  top: number
  width: number
  height: number
}

export interface Page42Svg {
  left: number
  right: number
  top: number
  width: number
  height: number
  bottom: number
}

export interface Page3Img {
  bottom: number
  height: number
  width: number
  top: number
  right: number
  left: number
}

export interface Page52Svg {
  right: number
  top: number
  left: number
  height: number
  width: number
  bottom: number
}

export interface Page39Svg {
  left: number
  right: number
  top: number
  width: number
  height: number
  bottom: number
}

export interface Page66Svg {
  width: number
  height: number
  left: number
  top: number
  right: number
  bottom: number
}

export interface Page50Svg {
  bottom: number
  height: number
  width: number
  top: number
  right: number
  left: number
}

export interface Page41Svg {
  right: number
  top: number
  left: number
  height: number
  width: number
  bottom: number
}

export interface Page47Svg {
  bottom: number
  right: number
  top: number
  left: number
  height: number
  width: number
}

export interface Page9After {
  left: number
  right: number
  top: number
  width: number
  height: number
  bottom: number
}

export interface Page0Img {
  bottom: number
  left: number
  right: number
  top: number
  width: number
  height: number
}

export interface N11Img {
  height: number
  width: number
  right: number
  top: number
  left: number
  bottom: number
}

export interface Page22Div {
  bottom: number
  left: number
  right: number
  top: number
  width: number
  height: number
}

export interface Page16Div {
  bottom: number
  left: number
  top: number
  right: number
  width: number
  height: number
}

export interface Page58After {
  bottom: number
  left: number
  right: number
  top: number
  width: number
  height: number
}

export interface Page29Svg {
  bottom: number
  left: number
  right: number
  top: number
  width: number
  height: number
}

export interface Page1Div {
  left: number
  right: number
  top: number
  width: number
  height: number
  bottom: number
}

export interface Page24Meta {
  right: number
  top: number
  left: number
  height: number
  width: number
  bottom: number
}

export interface Page78Svg {
  bottom: number
  left: number
  right: number
  top: number
  width: number
  height: number
}

export interface Page37After {
  left: number
  top: number
  right: number
  width: number
  height: number
  bottom: number
}

export interface Page77Svg {
  width: number
  height: number
  left: number
  top: number
  right: number
  bottom: number
}

export interface Page70Svg {
  bottom: number
  left: number
  right: number
  top: number
  width: number
  height: number
}

export interface Page36Svg {
  bottom: number
  height: number
  width: number
  right: number
  top: number
  left: number
}

export interface Page8Before {
  width: number
  height: number
  left: number
  top: number
  right: number
  bottom: number
}

export interface N14Img {
  bottom: number
  right: number
  top: number
  left: number
  height: number
  width: number
}

export interface N17Div {
  height: number
  width: number
  right: number
  top: number
  left: number
  bottom: number
}

export interface Page56After {
  top: number
  right: number
  left: number
  height: number
  width: number
  bottom: number
}

export interface N10Img {
  width: number
  height: number
  left: number
  right: number
  top: number
  bottom: number
}

export interface Page30Svg {
  bottom: number
  height: number
  width: number
  right: number
  top: number
  left: number
}

export interface Page26Ellipse {
  bottom: number
  top: number
  right: number
  left: number
  height: number
  width: number
}

export interface Page71Svg {
  bottom: number
  top: number
  right: number
  left: number
  height: number
  width: number
}

export interface Page45Svg {
  left: number
  right: number
  top: number
  width: number
  height: number
  bottom: number
}

export interface Page40Svg {
  height: number
  width: number
  top: number
  right: number
  left: number
  bottom: number
}

export interface Page62After {
  bottom: number
  left: number
  top: number
  right: number
  width: number
  height: number
}

export interface Page51Svg {
  bottom: number
  width: number
  height: number
  left: number
  right: number
  top: number
}

export interface Page19Div {
  bottom: number
  left: number
  right: number
  top: number
  width: number
  height: number
}

export interface Page31Svg {
  left: number
  top: number
  right: number
  width: number
  height: number
  bottom: number
  id: string
}

export interface Page54Svg {
  bottom: number
  height: number
  width: number
  right: number
  top: number
  left: number
}

export interface Page4Img {
  top: number
  right: number
  left: number
  height: number
  width: number
  bottom: number
}

export interface Page68Svg {
  height: number
  width: number
  top: number
  right: number
  left: number
  bottom: number
}

export interface Page5Img {
  right: number
  top: number
  left: number
  height: number
  width: number
  bottom: number
}

export interface Page10Div {
  bottom: number
  height: number
  width: number
  top: number
  right: number
  left: number
}

export interface Page48Svg {
  top: number
  right: number
  left: number
  height: number
  width: number
  bottom: number
}

export interface Page69H2 {
  height: number
  width: number
  right: number
  top: number
  left: number
  bottom: number
}

export interface Page67After {
  bottom: number
  width: number
  height: number
  left: number
  right: number
  top: number
}

export interface Page63Svg {
  bottom: number
  width: number
  height: number
  left: number
  right: number
  top: number
}

export interface Page33Svg {
  left: number
  top: number
  right: number
  width: number
  height: number
  bottom: number
}

export interface Screenshot {
  height: number
  width: number
  data: string
}

export interface RuntimeError {
  code: string
  message: string
}
