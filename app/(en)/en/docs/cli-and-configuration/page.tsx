import { ContentPage, createContentMetadata } from "../../../../content-page";
import { getContentPage } from "../../../../content-pages";

const page = getContentPage("en", "cli-and-configuration");
export const metadata = createContentMetadata(page);

export default function CliAndConfigurationPage() {
  return <ContentPage page={page} />;
}
