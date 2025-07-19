import { action, KeyDownEvent, SingletonAction, WillAppearEvent } from "@elgato/streamdeck";
import open from "open"; // Import the open package

/**
 * An example action class that opens the MemeTrigger website.
 */
@action({ UUID: "com.nathan-dousa.memetrigger.increment" })
export class IncrementCounter extends SingletonAction<CounterSettings> {
    private memeTriggerUrl: string = "http://memetrigger.nathanaeldousa.com/"; // Your subdomain URL

    override onWillAppear(ev: WillAppearEvent<CounterSettings>): void | Promise<void> {
        // Optionally set a title when the action appears
        return ev.action.setTitle("Click me");
    }

    override async onKeyDown(ev: KeyDownEvent<CounterSettings>): Promise<void> {
        try {
            // Open the meme trigger URL in the web browser
            await this.openWebBrowser(this.memeTriggerUrl);
        } catch (error) {
            console.error("Error opening browser:", error); // Log any errors
            await ev.action.setTitle("Error opening");
        }
    }

    private async openWebBrowser(url: string): Promise<void> {
        try {
            await open(url); // Open the URL in the default web browser
            console.log("Opening link:", url); // Log the URL for debugging
        } catch (error) {
            console.error("Error opening browser:", error); // Log any errors
        }
    }
}

/**
 * Settings for {@link IncrementCounter}.
 */
type CounterSettings = {
    count?: number;
    incrementBy?: number;
};
