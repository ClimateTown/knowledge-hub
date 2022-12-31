import { parse } from 'yaml'
import fs from 'fs'
import { test, expect, CustomMatcherResult } from 'vitest'

const resources_path: string = 'data/resources.yml'

// Defining tests
// type resource = { title: string, url: string, tags: string[] }

interface Resource {
    title: string,
    url: string,
    tags: string[],
}

function toBeResource(toBeDetermined: any): CustomMatcherResult {
    const { title, url, description, tags } = toBeDetermined;

    // Checking that resource has 4 keys
    if (!(Object.keys(toBeDetermined).length === 4)) {
        throw new Error(`resource url ${url} has ${Object.keys(toBeDetermined).length} keys (should have 4; title, url, description, and tags)`)
    }

    // Checking that resource has the correct keys, with the correct types
    if (!(typeof url === 'string')) {
        throw new Error(`url '${url}' (for title '${title}') is not a string (is ${typeof url})`)
    } else if (!(typeof title === 'string')) {
        throw new Error(`title '${title}' (for url ${url}) is not a string`)
    } else if (!(typeof description === 'string')) {
        throw new Error(`description (for url ${url}) is not a string`)
    } else if (!(tags instanceof Array)) {
        throw new Error(`tags '${tags}' (for url ${url}) is not an array`)
    }

    // Error with empty tags
    if (tags.length === 0) {
        throw new Error(`tags '${tags}' (for url ${url}) is empty. Please give tags`)
    }

    // Checking that tags are strings
    for (let tag of toBeDetermined.tags) {
        if (!(typeof tag === 'string')) {
            throw new Error(`tag '${tag}' (for url ${url}) is not a string`)
        }
    }

    return {
        message: () => `resource '${title}' (${url}) is valid`,
        pass: true,
    }
}

expect.extend({
    toBeResource,
});

const file = fs.readFileSync(resources_path, 'utf8')
const yml_data = parse(file)

console.log(yml_data)

// check yml_data is of type resources
test('testing resources in YAML file...', () => {
    for (let resource of yml_data) {
        expect(resource).toBeResource()
    }
})


