import { ContentPage, createContentMetadata } from "../../../content-page";
import { getContentPage } from "../../../content-pages";

const page = getContentPage("zh", "durable-sessions");
export const metadata = createContentMetadata(page);

export default function DurableSessionsPage() {
  return <ContentPage page={page} />;
}
