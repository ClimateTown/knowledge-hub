import fs from "fs";
import YAML from "yaml";

// Define the interface for each URL object
interface UrlObject {
  description: string;
  tags: string[];
  title: string;
  url: string;
}
const filePath = "../../data/resources.yml";

fs.readFile(filePath, "utf-8", (err, data) => {
  const urls: UrlObject[] = YAML.parse(data);

  const checkUrl = async (url: UrlObject) => {
    try {
      const response = await fetch(new URL(url.url).toString());
      if (response.status == 200 && !response.redirected) {
        return { url: url.url, status: response.status };
      } else if (response.redirected) {
        return {
          url: url.url,
          status: 301,
          redirect: response.url,
        };
      } else {
        return { url: url.url, status: response.status };
      }
    } catch {
      return { url: url.url, status: "Error" };
    }
  };

  // Use Promise.all to check multiple URLs concurrently
  Promise.all(urls.map(checkUrl)).then((links) => {
    // Print the list of failing links
    links
      .filter((l) => l.status == 200)
      .forEach((link) => {
        console.log(`${link.url} - OK ${link.status}`);
      });

    const errorLinks = links.filter((l) => l.status != 200);
    if (errorLinks.length > 0) {
      console.log(" ");
      console.error("The following links are broken:");
      errorLinks.forEach((link) => {
        if (link.status == 301) {
          console.warn(`${link.url} redirects to -> ${link.redirect}`);
        }
        console.error(`${link.url} - ${link.status}`);
      });
      process.exit(1);
    }
  });
});
