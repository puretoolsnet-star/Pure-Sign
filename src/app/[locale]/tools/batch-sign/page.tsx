import { BatchSignTool } from "@/components/tools/BatchSignTool";
import { createToolPage } from "@/lib/seo/create-tool-page";

const page = createToolPage("batch-sign", BatchSignTool);

export const generateStaticParams = page.generateStaticParams;
export const generateMetadata = page.generateMetadata;
export default page.default;
