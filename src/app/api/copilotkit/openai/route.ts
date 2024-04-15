import { CopilotBackend, OpenAIAdapter } from "@copilotkit/backend";

export const runtime = "edge";

export async function POST(req: Request): Promise<Response> {
  const copilotKit = new CopilotBackend();
  const res = await copilotKit.response(req, new OpenAIAdapter());

  return res; 
}