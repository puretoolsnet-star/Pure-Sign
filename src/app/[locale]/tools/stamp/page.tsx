import { StampTool } from "@/components/tools/StampTool";
import { createToolPage } from "@/lib/seo/create-tool-page";

const page = createToolPage("stamp", StampTool);

export const generateStaticParams = page.generateStaticParams;
export const generateMetadata = page.generateMetadata;
export default page.default;
