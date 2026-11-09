import { PageNumbersTool } from "@/components/tools/PageNumbersTool";
import { createToolPage } from "@/lib/seo/create-tool-page";

const page = createToolPage("page-numbers", PageNumbersTool);

export const generateStaticParams = page.generateStaticParams;
export const generateMetadata = page.generateMetadata;
export default page.default;
