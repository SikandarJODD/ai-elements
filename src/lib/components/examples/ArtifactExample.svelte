<script>
  import {
    Artifact,
    ArtifactHeader,
    ArtifactTitle,
    ArtifactClose,
    ArtifactContent
  } from "$lib/components/ai-elements/artifact";
</script>

<Artifact>
  <ArtifactHeader>
    <ArtifactTitle>My Artifact</ArtifactTitle>
    <ArtifactClose onclick={() => console.log('Close clicked')} />
  </ArtifactHeader>
  <ArtifactContent>
    <!-- Your content here -->
  </ArtifactContent>
</Artifact>