**Phase-By-Phase Message Conversion Plan**

**Summary**
Implement the rename in small, verifiable phases: preserve old `message` as `message-old`, promote `new-message` to `message`, then update imports, docs, registry metadata, and generated files.


**Phase 4: Update References One Batch At A Time**

- Update source imports from `new-message` to `message`.
- Update old-message references, docs, and registry entries from `message` to `message-old` only where they intentionally refer to the old component.
- Rename docs route content so the enhanced component lives at `/components/message`; preserve old docs as `/components/message-old` only if we still want it visible.
- Update `src/lib/config/ai-elements-data.ts`, `src/lib/config/github-paths.ts`, `ai-elements.json`, `registry.json`, and `registry-storage.json`.

**Phase 5: Regenerate And Verify**

- Run `pnpm build:ai-elements` to regenerate `static/r`.
- Run `pnpm check`.
- Search for stale paths:
  - `rg "ai-elements/new-message"`
  - `rg "components/new-message"`
  - `rg "ai-elements/message-old"`
  - `rg "ai-elements/message"`
- Confirm remaining matches are intentional.

**Assumptions**

- `ai-elements/message` should become the main public import path for the enhanced message component.
- The old component should remain available as `ai-elements/message-old`.
- We should migrate docs and registry metadata along with source imports, not just rename folders.
