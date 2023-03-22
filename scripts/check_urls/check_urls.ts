import fs from "fs";
import YAML from "yaml";

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
      const response = await fetch(new URL(url.url).toString(), {
        method: "HEAD",
      });
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
    } catch (err) {
      console.error(err);
      return { url: url.url, status: "Error" };
    }
  };

  Promise.all(urls.map(checkUrl)).then((links) => {
    links
      .filter((l) => l.status == 200)
      .forEach((link) => {
        console.log(`${link.url} - OK ${link.status}`);
      });

    const errorLinks = links.filter((l) => l.status != 200);
    if (errorLinks.length > 0) {
      console.error("The following links are broken:");
      errorLinks.forEach((link) => {
        if (link.status == 301) {
          console.warn(`${link.url} redirects to -> ${link.redirect}`);
        } else {
          console.error(`${link.url} - ${link.status}`);
        }
      });
      process.exit(1);
    }
  });
});
