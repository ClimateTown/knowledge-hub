import fs from "fs";
import YAML from "yaml";
import partition from "lodash.partition";
import { parse } from "tldts";
interface UrlObject {
  description: string;
  tags: string[];
  title: string;
  url: string;
}
interface ProcessedUrl {
  url: string;
  status: number | string;
  redirect?: string;
}
const filePath = "./data/resources.yml";

// Read the contents of the file specified by filePath using utf-8 encoding
fs.readFile(filePath, "utf-8", (err, data) => {
  // Log the contents of the file
  console.log(data);

  // Parse the file contents as YAML and store it as an array of UrlObjects
  const urls: UrlObject[] = YAML.parse(data);

  // Function to check the status of a URL
  const checkUrl = async (url: UrlObject) => {
    try {
      // Perform a HEAD request to the URL
      const response = await fetch(new URL(url.url).toString(), {
        method: "HEAD",
      });

      // If the response status is 200 and not redirected, return the URL and status
      if (response.status == 200 && !response.redirected) {
        return { url: url.url, status: response.status };
      } else if (response.redirected) {
        // If the URL is redirected, return the URL, status 301, and the new URL
        return {
          url: url.url,
          status: 301,
          redirect: response.url,
        };
      } else {
        // For other response statuses, return the URL and status
        return { url: url.url, status: response.status };
      }
    } catch (err) {
      // If there's an error, log it and return the URL with an "Error" status
      console.error(err);
      return { url: url.url, status: "Error" };
    }
  };

  // Use Promise.all to process all URLs in parallel and then handle the results
  Promise.all(urls.map(checkUrl)).then((links) => {
    // Partition the links into liveLinks and deadLinks
    const [liveLinks, deadLinks] = partition(links, function (l: ProcessedUrl) {
      return isLiveLink(l);
    });

    // Log the live links with their statuses
    liveLinks.forEach((link) => {
      if (link.status == 200) {
        console.log(`${link.url} - OK ${link.status}`);
      } else if (link.status == 301) {
        console.log(`${link.url} - OK ${link.status} -> ${link.redirect}`);
      }
    });

    // If there are dead links, log them and exit the process with a non-zero status
    if (deadLinks.length > 0) {
      console.error("The following links are broken:");
      deadLinks.forEach((link) => {
        if (link.status == 301) {
          console.warn(`${link.url} redirects to -> ${link.redirect}`);
        } else {
          console.error(`${link.url} - ${link.status}`);
        }
      });
      process.exit(1);
    } else {
      console.log("All links are OK! 🥳");
    }
  });
});

// Function to determine if a link is live
function isLiveLink(link: ProcessedUrl) {
  return link.status == 200 || (link.status == 301 && hasSameDomain(link));
}

// Function to check if a link and its redirect have the same domain
function hasSameDomain(link: ProcessedUrl) {
  return (
    parse(link.url).domainWithoutSuffix ==
    parse(link.redirect ?? "").domainWithoutSuffix
  );
}
