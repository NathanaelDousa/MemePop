import { action, KeyDownEvent, SingletonAction, WillAppearEvent } from "@elgato/streamdeck";
import fetch from "node-fetch";
import fs from "fs";
import path from "path";
import os from "os";
import open from "open";


interface MemeData {
    url: string;
    preview: string[];
}

@action({ UUID: "com.nathan-dousa.memetrigger.increment" })
export class IncrementCounter extends SingletonAction<CounterSettings> {
    private apiUrl: string = "https://meme-api.com/gimme";

    override async onKeyDown(ev: KeyDownEvent<CounterSettings>): Promise<void> {
        try {
            const response = await fetch(this.apiUrl);
            if (!response.ok) throw new Error("Network response was not ok");

            const memeData = (await response.json()) as MemeData;
            const imageUrl = memeData.url;

            // 🧩 Step 1: Create a directory inside user's Pictures
            const homeDir = os.homedir();
            const memesDir = path.join(homeDir, "Pictures", "StreamDeckMemes");
            if (!fs.existsSync(memesDir)) {
                fs.mkdirSync(memesDir, { recursive: true });
                console.log("✅ Created folder:", memesDir);
            }

            // 🧩 Step 2: Download and save image
            const imageResponse = await fetch(imageUrl);
            if (!imageResponse.ok) throw new Error("Failed to download image.");

            const arrayBuffer = await imageResponse.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            // Extract filename from URL
            const fileName = path.basename(new URL(imageUrl).pathname);
            const filePath = path.join(memesDir, fileName);

            fs.writeFileSync(filePath, buffer);
            console.log("🖼️ Meme saved at:", filePath);

            // ✅ Open the image in the default viewer
            await open(filePath);
            console.log("📂 Opened image:", filePath);

            // Optionally update title or give feedback
            await ev.action.setTitle("✅ Saved");


        } catch (error) {
            console.error("❌ Error:", error);
            await ev.action.setTitle("❌ Failed");
        }
    }
}

type CounterSettings = {
    count?: number;
    incrementBy?: number;
};
