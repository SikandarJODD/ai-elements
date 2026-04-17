**Phase-By-Phase Message Conversion Plan**

**Summary**
Implement the rename in small, verifiable phases: preserve old `message` as `message-old`, promote `new-message` to `message`, then update imports, docs, registry metadata, and generated files.

**Phase 1: Create The Checklist**

- Add `message-conversion-files.md` at repo root with the short file list already identified.
- No component behavior changes in this phase.
- Verify with `git diff -- message-conversion-files.md`.

**Phase 2: Preserve Old Message**

- Rename/copy current `src/lib/components/ai-elements/message` to `src/lib/components/ai-elements/message-old`.
- Keep old exports unchanged: `Message`, `MessageContent`, `MessageAvatar`.
- Add/update registry metadata so `message-old` points to the preserved old files.
- Verify no current imports are changed yet.

**Phase 3: Promote New Message**

- Move `src/lib/components/ai-elements/new-message` into `src/lib/components/ai-elements/message`.
- The public `ai-elements/message` API becomes the enhanced implementation currently exported by `new-message`.
- Temporarily keep `ai-elements/new-message` as a compatibility re-export only if needed during the transition; remove it after all internal references are migrated.

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
