import { ExtractTextTool } from "@/components/tools/ExtractTextTool";
import { createToolPage } from "@/lib/seo/create-tool-page";

const page = createToolPage("extract-text", ExtractTextTool);

export const generateStaticParams = page.generateStaticParams;
export const generateMetadata = page.generateMetadata;
export default page.default;
