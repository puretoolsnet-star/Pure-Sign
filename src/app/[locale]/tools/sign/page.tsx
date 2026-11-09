import { SignTool } from "@/components/tools/SignTool";
import { createToolPage } from "@/lib/seo/create-tool-page";

const page = createToolPage("sign", SignTool);

export const generateStaticParams = page.generateStaticParams;
export const generateMetadata = page.generateMetadata;
export default page.default;
