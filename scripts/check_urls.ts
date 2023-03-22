import axios, { AxiosError } from "axios";
import yaml from "js-yaml";
import fs from "fs";
import { EventEmitter } from "events";

class CheckUrl {
  private logger = new EventEmitter();

  constructor() {
    this.logger.on("info", (message: string) =>
      console.info(`[INFO] ${message}`)
    );
    this.logger.on("warn", (message: string) =>
      console.warn(`[WARN] ${message}`)
    );
    this.logger.on("error", (message: string) =>
      console.error(`[ERROR] ${message}`)
    );
    this.logger.on("debug", (message: string) =>
      console.debug(`[DEBUG] ${message}`)
    );
  }

  async check(url: string): Promise<{ ok?: string; error?: string }> {
    this.logger.emit("info", `Fetching ${url}`);

    try {
      const response = await axios.get(url, { timeout: 5000 });

      if (response.status === 200) {
        this.logger.emit("info", `${url} is OK`);
        return { ok: url };
      } else if (response.status === 301) {
        this.logger.emit("warn", `${url} is OK, but redirects`);
        return { error: `${url} is a redirect` };
      } else {
        this.logger.emit(
          "error",
          `${url} returned status code ${response.status}`
        );
        return { error: `${url} returned status code ${response.status}` };
      }
    } catch (error: any) {
      const reason = (error as AxiosError).message;
      this.logger.emit("error", `${url} failed with error ${reason}`);
      return { error: `${url} failed with error ${reason}` };
    }
  }

  loadUrls(filename: string): string[] {
    try {
      const contents = yaml.load(fs.readFileSync(filename, "utf8"));
      const urls = contents
        .filter((entry: any) => "url" in entry)
        .map((entry: any) => entry["url"]);

      this.logger.emit("info", `Loaded ${urls.length} URLs from ${filename}`);
      return urls;
    } catch (error: any) {
      this.logger.emit(
        "error",
        `Failed to load URLs from ${filename}: ${error.message}`
      );
      return [];
    }
  }

  async checkAll(urls: string[]) {
    const results = await Promise.allSettled(
      urls.map((url) => this.check(url))
    );
    const errors = results.filter((result) => result.status === "rejected");

    if (errors.length === 0) {
      this.logger.emit("info", "NO BROKEN LINKS");
    } else {
      this.logger.emit("error", "BROKEN LINKS FOUND:");

      errors.forEach((error) => {
        this.logger.emit("error", (error as PromiseRejectedResult).reason);
      });

      this.logger.emit("debug", "Exiting with errors");
      process.exit(1);
    }
  }
}

const checkUrl = new CheckUrl();
checkUrl
  .loadUrls("./data/resources.yml")
  .then((urls) => checkUrl.checkAll(urls));
