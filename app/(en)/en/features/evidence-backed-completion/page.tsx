import { ContentPage, createContentMetadata } from "../../../../content-page";
import { getContentPage } from "../../../../content-pages";

const page = getContentPage("en", "evidence-backed-completion");
export const metadata = createContentMetadata(page);

export default function EvidenceBackedCompletionPage() {
  return <ContentPage page={page} />;
}
