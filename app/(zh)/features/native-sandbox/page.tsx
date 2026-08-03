import { ContentPage, createContentMetadata } from "../../../content-page";
import { getContentPage } from "../../../content-pages";

const page = getContentPage("zh", "native-sandbox");
export const metadata = createContentMetadata(page);

export default function NativeSandboxPage() {
  return <ContentPage page={page} />;
}
