// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
  // interface Error {}
  // interface Locals {}

  // TODO: Need to learn how to use these interfaces
  interface PageData {
    payload: {
      resources: [
        {
          title: string
          url: string
          summary: string
          tags: string[]
        },
      ]
    }
  }

  interface PageDataYouTube {
    resources: [
      {
        title: string
        channel_name: string
        channel_username: string
        channel_id: string
        upload_date: Date
      },
    ]
  }
  // interface Platform {}
}
