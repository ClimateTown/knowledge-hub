Mix.install([
  {:httpoison, "~> 2.0"},
  {:yaml_elixir, "~> 2.9.0"}
])

defmodule CheckUrl do
  require Logger

  def check(url) do
    Logger.info("Fetching #{url}")

    case HTTPoison.get(url, [], timeout: 5000) do
      {:ok, %{status_code: 200}} ->
        Logger.info("#{url} is OK")
        {:ok, url}

      {:ok, %{status_code: 301} = res} ->
        Logger.warn("#{url} is OK, but redirects")
        {:error, "#{url} is a redirect"}

      {:ok, %{status_code: code}} ->
        Logger.error("#{url} returned status code #{code}")
        {:error, "#{url} returned status code #{code}"}

      {:error, %HTTPoison.Error{reason: reason}} ->
        Logger.error("#{url} failed with error #{reason}")
        {:error, "#{url} failed with error #{reason}"}
    end
  end

  def load_urls(filename) do
    case YamlElixir.read_from_file(filename) do
      {:ok, contents} ->
        urls =
          contents
          |> Enum.filter(fn
            %{"url" => url} -> true
            _ -> false
          end)
          |> Enum.map(& &1["url"])

        Logger.info("Loaded #{length(urls)} URLs from #{filename}")
        urls

      {:error, reason} ->
        Logger.error("Failed to load URLs from #{filename}: #{reason}")
        []
    end
  end

  def check_all(urls) do
    results =
      urls
      |> Task.async_stream(fn url -> check(url) end,
        max_concurrency: 10,
        timeout: min(length(urls) * 1000, 1000 * 60)
      )
      |> Enum.map(fn
        {:ok, result} -> result
        {:error, _} -> nil
      end)
      |> Enum.filter(fn
        {:error, _} -> true
        _ -> false
      end)

    if Enum.empty?(results) do
      Logger.info("NO BROKEN LINKS")
    else
      Logger.error("BROKEN LINKS FOUND:")

      results
      |> Enum.map(&elem(&1, 1))
      |> Enum.each(fn e ->
        Logger.error(e)
      end)

      Logger.debug("Exiting with errors")
      System.stop(1)
    end
  end
end

CheckUrl.load_urls("./data/resources.yml")
|> CheckUrl.check_all()
