import { ContentPage, createContentMetadata } from "../../../../content-page";
import { getContentPage } from "../../../../content-pages";

const page = getContentPage("en", "security-and-recovery");
export const metadata = createContentMetadata(page);

export default function SecurityAndRecoveryPage() {
  return <ContentPage page={page} />;
}
