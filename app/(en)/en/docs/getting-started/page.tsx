import { ContentPage, createContentMetadata } from "../../../../content-page";
import { getContentPage } from "../../../../content-pages";

const page = getContentPage("en", "getting-started");
export const metadata = createContentMetadata(page);

export default function GettingStartedPage() {
  return <ContentPage page={page} />;
}
