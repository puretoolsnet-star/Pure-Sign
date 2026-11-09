import { RedactTool } from "@/components/tools/RedactTool";
import { createToolPage } from "@/lib/seo/create-tool-page";

const page = createToolPage("redact", RedactTool);

export const generateStaticParams = page.generateStaticParams;
export const generateMetadata = page.generateMetadata;
export default page.default;
