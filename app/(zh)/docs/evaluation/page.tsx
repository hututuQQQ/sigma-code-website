import { ContentPage, createContentMetadata } from "../../../content-page";
import { getContentPage } from "../../../content-pages";

const page = getContentPage("zh", "evaluation");
export const metadata = createContentMetadata(page);

export default function EvaluationPage() {
  return <ContentPage page={page} />;
}
