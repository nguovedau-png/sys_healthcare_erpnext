# Milestone report — 2026-08-27

## Scope completed

This milestone stabilized the existing healthcare monorepo rather than creating a demo. It added a deterministic Prisma-client generation script for backend services, removed unused React packages with incompatible peer ranges, migrated active clients to React 19-compatible packages, replaced legacy lightbox and HTML rendering, added rich-text sanitization, migrated the visible react-hook-form registrations to v7 syntax, added Suspense boundaries for Next.js `useSearchParams` pages, added the missing `outline` button variant, and fixed a missing product-page icon import.

The repository also contains the research baseline covering Vietnamese healthcare software benchmarks, patient-access flows, ERPNext alignment, and publicly reviewed legal/EMR considerations. The research notes are in `docs/agent-baseline-2026-08-27.md`.

## Verification

| Area | Result |
|---|---|
| Backend unit/integration tests | 4 suites passed; 11 tests passed |
| Backend production build | Passed (`nest build`) |
| web-admin typecheck/build | Passed during the milestone |
| web-public typecheck | Passed |
| web-public production build | Passed after adding Suspense boundaries for `/payment` and `/shop/products` |
| web-partner dependency install | Passed with Yarn after correcting an invalid `@rc-component/portal` tarball URL |
| web-partner typecheck | Reached and reported only the previously missing `@/lib/sanitize-html`; fixed by adding the module, then typecheck proceeded without the reported sanitizer errors |
| web-partner production build | Interrupted by process exit 143 during Next compilation under sandbox memory pressure; requires rerun in CI or a larger build runner |
| ERPNext live synchronization | Not executed: no ERPNext instance credential/endpoint is configured in the current session |

## Known release blockers

The repository is not declared fully production-ready yet. `npm install` reports dependency advisories, including 36 vulnerabilities in the public client at the time of the run, and warns that `@zoomus/websdk` is deprecated and that the pinned Next.js version has a published security warning. These need a dedicated dependency-upgrade and compatibility pass before go-live.

A real ERPNext synchronization test still requires a reachable ERPNext base URL, API key/secret or OAuth credentials, and a representative test tenant. Until those are supplied through the deployment environment, the integration can only be validated with repository-level mocks and existing retry tests.

The changes were committed and pushed to the linked GitHub repository in commit `8f9a3e1` (`chore: harden healthcare clients for React 19 and reproducible builds`).
