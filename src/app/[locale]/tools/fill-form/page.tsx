import { FillFormTool } from "@/components/tools/FillFormTool";
import { createToolPage } from "@/lib/seo/create-tool-page";

const page = createToolPage("fill-form", FillFormTool);

export const generateStaticParams = page.generateStaticParams;
export const generateMetadata = page.generateMetadata;
export default page.default;
