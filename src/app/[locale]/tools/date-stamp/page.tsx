import { DateStampTool } from "@/components/tools/DateStampTool";
import { createToolPage } from "@/lib/seo/create-tool-page";

const page = createToolPage("date-stamp", DateStampTool);

export const generateStaticParams = page.generateStaticParams;
export const generateMetadata = page.generateMetadata;
export default page.default;
