'use client';
import Header from "@/components/header";
import PreviewScreen from "@/components/preview-screen";
import Sidebar from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  CopilotTask,
  useCopilotContext,
} from "@copilotkit/react-core";
import { useEffect, useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live';


export default function Home() {
  const [code, setCode] = useState<string[]>([
    `<h1 className="text-red-500">Hello World</h1>`,
  ]);
  const [codeToDisplay, setCodeToDisplay] = useState<string>(code[0] || "");

  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [codeCommand, setCodeCommand] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const context = useCopilotContext();

  const generateCode = new CopilotTask({
    instructions: codeCommand,
    actions: [
      {
        name: "generateCode",
        description: "Create Code Snippet with HTML andtailwindcss written in React. There should be no imports. className should be used instead of class. No comment should be added.",
        parameters: [
          {
            name: "code",
            type: "string",
            description: "Code to be generated",
            required: true,
          },
        ],
        handler: async ({ code }) => {
          setCode((prev) => [...prev, code]);
          setCodeToDisplay(code);
          setIsLoading(false);
        },
      },
    ],
  });


  
  /**
   * Handler for the generateCode task  
   */
  const handleGenerateCode = () => {
    if(isLoading) return; // do nothing if loading
    setIsLoading(true);
    generateCode.run(context);
  }


  return (
    <>
      <main className="bg-white min-h-screen px-4" suppressHydrationWarning>
        <Header openCode={() => setShowDialog(true)} />
        <div className="w-full h-full min-h-[70vh] flex justify-between gap-x-1 ">
          <Sidebar>
            <div className="space-y-2">
              {code.map((c, i) => (
                <div
                  key={i}
                  className="w-full h-20 p-1 rounded-md bg-white border border-blue-600"
                  onClick={() => setCodeToDisplay(c)}
                >
                  v{i}
                </div>
              ))}
            </div>
          </Sidebar>

          <div className="w-10/12">
            <PreviewScreen html_code={codeToDisplay || ""} />
          </div>
        </div>
        <div className="w-8/12 mx-auto p-1 rounded-full bg-primary flex my-4 outline-0">
          <Input
            type="text"
            placeholder="Enter your code command"
            className="w-10/12 p-6 rounded-l-full  outline-0 bg-primary text-white"
            value={codeCommand}
            onChange={(e) => setCodeCommand(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleGenerateCode();
            }}
          />
          <Button
            onClick={handleGenerateCode}
            className="w-2/12 p-6 rounded-r-full outline-0 bg-black text-white"
            type="submit"
          >
            {isLoading ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> : "GENERATE"}
          </Button>
        </div>
      </main>
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>View Code.</DialogTitle>
            <DialogDescription>
              You can use the following code to start integrating into your
              application.
            </DialogDescription>
            <LiveProvider code={codeToDisplay || '' } scope={{}}>
              <LiveEditor/>
            </LiveProvider>

          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}