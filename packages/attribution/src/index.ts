import data from "./attribution.json";

/**
 * Whether a source is actually used by Codrona.
 *
 * `not-ingested` entries are recorded deliberately: the public record of what
 * we chose not to use is part of the provenance story, not an omission.
 */
export type AttributionStatus = "ingested" | "not-ingested";

export interface AttributionSource {
  /** Stable key, matching the source name in the Lens warehouse. */
  readonly id: string;
  readonly name: string;
  /** Rights holder, as named in the licence or terms. */
  readonly holder: string;
  readonly licence: string;
  readonly licenceUrl: string;
  readonly sourceUrl: string;
  readonly status: AttributionStatus;
  readonly role: string;
  /** The notice text rendered verbatim on every surface. */
  readonly notice: string;
  /** Operating constraints this source imposes on us. */
  readonly conditions: readonly string[];
  /** Formal citation, where the upstream asks for one. */
  readonly citation?: string;
}

const sources = data.sources as readonly AttributionSource[];

/** Every source considered, whether used or not. */
export const attributionSources: readonly AttributionSource[] = sources;

/**
 * Sources whose notices carry a live obligation and must be rendered on every
 * user-facing surface — web, desktop, mobile, CLI, and the observatory.
 */
export const displayedAttributions: readonly AttributionSource[] = sources.filter(
  (source) => source.status === "ingested",
);

/** Citations the upstream asks us to reproduce. */
export const attributionCitations: readonly string[] = sources
  .map((source) => source.citation)
  .filter((citation): citation is string => typeof citation === "string");

/** Link to the full provenance ledger, where dispositions are recorded. */
export const attributionLedgerUrl: string = data.ledgerUrl;

export function findAttribution(id: string): AttributionSource | undefined {
  return sources.find((source) => source.id === id);
}
