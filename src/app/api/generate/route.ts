import { NextResponse } from "next/server";
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  try {
    console.log("[SYSTEM] 1. API hit. Receiving prompt from frontend...");
    const body = await req.json();
    const { prompt } = body;

    if (!prompt) {
      return NextResponse.json({ success: false, error: "Prompt is required" }, { status: 400 });
    }

    // --- DYNAMIC FILE READ & CACHE BYPASS LOGIC ---
    const filePath = path.join(process.cwd(), 'src', 'app', 'api', 'generate', 'workflow_api.json');
    const rawFileData = fs.readFileSync(filePath, 'utf-8');
    const workflow = JSON.parse(rawFileData);
    console.log("[SYSTEM] 1.5. Fresh workflow JSON successfully loaded from disk.");

    // --- FIX 1: RANDOMIZE THE SEED ---
    const randomSeed = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
    workflow["3"].inputs.seed = randomSeed;
    console.log(`[SYSTEM] 1.6. Injected Random Seed: ${randomSeed}`);

    // --- FIX 2: PROMPT CORRECTION ---
    // Removed the negative prompt words you accidentally pasted here!
    // We are passing exactly what the user typed to match your successful ComfyUI local tests.
    const positivePromptNodeId = "6"; 
    workflow[positivePromptNodeId].inputs.text = prompt;

    console.log("[SYSTEM] 2. Sending blueprint to RTX 4060...");
    const comfyUrl = "http://127.0.0.1:8188";
    const queueRes = await fetch(`${comfyUrl}/prompt`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: workflow }),
    });
    
    const queueData = await queueRes.json();
    const promptId = queueData.prompt_id;
    console.log(`[SYSTEM] 3. Job queued successfully! Prompt ID: ${promptId}`);

    let isDone = false;
    let imageUrl = "";

    console.log("[SYSTEM] 4. Starting polling loop to wait for GPU...");
    while (!isDone) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      process.stdout.write("."); 
      
      const historyRes = await fetch(`${comfyUrl}/history/${promptId}`);
      const historyData = await historyRes.json();

      if (historyData[promptId]) {
        console.log("\n[SYSTEM] 5. History found! Generation complete.");
        const promptHistory = historyData[promptId];
        
        for (const nodeId in promptHistory.outputs) {
          const nodeOutput = promptHistory.outputs[nodeId];
          
          if (nodeOutput.images && nodeOutput.images.length > 0) {
            const imgInfo = nodeOutput.images[0];
            const filename = imgInfo.filename;
            const subfolder = imgInfo.subfolder || ""; 
            
            console.log(`[SYSTEM] 6. Found image file: ${filename} in node ${nodeId}`);
            
            imageUrl = `${comfyUrl}/view?filename=${filename}&type=output`;
            if (subfolder) {
                imageUrl += `&subfolder=${subfolder}`;
            }
            
            console.log(`[SYSTEM] 7. Final extraction URL: ${imageUrl}`);
            isDone = true; 
            break; 
          }
        }
      }
    }
    
    if (!imageUrl) {
        throw new Error("ComfyUI finished, but output parsing failed.");
    }

    console.log("[SYSTEM] 8. Sending image directly to frontend!");
    return NextResponse.json({ success: true, imageUrl });

  } catch (error) {
    console.error("\n[ERROR] AI Generation failed:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}