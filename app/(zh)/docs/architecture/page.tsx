import { ContentPage, createContentMetadata } from "../../../content-page";
import { getContentPage } from "../../../content-pages";

const page = getContentPage("zh", "architecture");
export const metadata = createContentMetadata(page);

export default function ArchitecturePage() {
  return <ContentPage page={page} />;
}
