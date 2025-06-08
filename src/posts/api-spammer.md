---
title: 'API Spammer : Stress-Testing API Endpoints'
createdAt: '2025-03-03'
updatedAt: '2025-03-03'
category: 'Portfolio'
readTime: '8'
excerpt: "Evening project to spam my API endpoints for stress-testing purposes. It's a simple Go program that sends a lot of requests to an API endpoint."
coverImage: '/posts/placeholder.webp'
coverWidth: 16
coverHeight: 9
metaKeywords: 'golang, go, api, spammer, testing, api testing'
metaDescription: "Evening project to spam my API endpoints for stress-testing purposes. It's a simple Go program that sends a lot of requests to an API endpoint."
tags: ['Go']

githubLink: 'https://github.com/niro58/api-spammer'
---
This was an evening project I built after needing to test my API endpoints to understand their limitations. Specifically, I had an unoptimized mailer service that needed some tuning, and I wanted to see how it would handle a high load of requests. Enter **API Spammer**—a simple tool to stress-test API endpoints.

## How It Works

The config is straightforward. You define the endpoints, the number of concurrent workers (`clients`), and the total number of requests to send. Here’s an example config:

```json
{
	"endpoints": [
		{
			"url": "https://httpbin.org/get",
			"method": "GET",
			"data": {
				"test": "asd",
				"lol": "bruh"
			}
		},
		{
			"url": "https://httpbin.org/post",
			"method": "POST",
			"data": {
				"test": "asd",
				"lol": "bruh"
			}
		}
	],
	"clients": 20,
	"total_requests": 500
}
```

The tool cycles through the endpoints, alternating between them for each request. It uses a worker pool to handle concurrent requests, making it easy to simulate real-world traffic.

## The Core Functionality

The main logic is in `main.go`. Here’s a simplified version:

```go
func worker(jobs <-chan Destination, results chan<- FetchResult) {
	for j := range jobs {
		results <- j.Fetch() // Fetch the request and send the result back
	}
}

func main() {
	config := LoadConfig() // Load the config file
	jobs := make(chan Destination, config.TotalRequests)
	results := make(chan FetchResult, config.TotalRequests)

	// Start workers
	for w := 0; w < config.Clients; w++ {
		go worker(jobs, results)
	}

	// Create jobs for each request
	for j := 0; j < config.TotalRequests; j++ {
		ep := config.Endpoints[j%len(config.Endpoints)] // Cycle through endpoints
		jobs <- Destination{
			Id:     j,
			Url:    ep.Url,
			Method: ep.Method,
			Data:   ep.Data,
		}
	}
	close(jobs)

	// Collect results
	for a := 0; a < config.TotalRequests; a++ {
		res := <-results
		statistics.AddRequest(res) // Update statistics
	}

	statistics.Debug() // Print the results
}
```

The `fetcher.go` file handles the actual HTTP requests, supporting both `GET` and `POST` methods. It also measures the response time and captures the status code and body.

## Logging and Statistics

The `log.go file` adds some color to the terminal output, making it easier to read the logs. The `statistics.go` file tracks the total requests, successful/failed requests, and response times (min, max, and average). Here’s a snippet:

```go
func (s *Statistics) Debug() {
	Logger.Log(logger.ColorSuccess, "Total requests: ", s.TotalRequests)
	Logger.Log(logger.ColorSuccess, "Successful requests: ", s.SuccessfulRequests)
	Logger.Log(logger.ColorError, "Failed requests: ", s.FailedRequests)
	Logger.Log(logger.ColorDefault, fmt.Sprintf("Average time: %d ms", s.AverageTime))
}
```

## Why I Built It

I don't know, just wanted to try it out and have some fun in the evening. It’s not fancy, but it gets the job done. If you’re curious, feel free to check out the code or use it for your own testing.

### What’s Next?

This was a quick project to solve an immediate need, but there’s always room for improvement. Here’s what’s on my TODO list:

1. **Better Statistics Management**:  
   Right now, the tool logs each request to a JSON file for the current session. It’d be nice to have a more robust way to manage and analyze statistics—maybe even export them to a database or a dashboard for easier visualization.

2. **Differentiate Requests by Endpoint**:  
   Currently, all requests are lumped together in the statistics. It’d be more useful to break them down by endpoint, so I can see how each one performs under load.

It’s a small project, but it’s been handy for testing and optimizing my APIs. If you’ve got ideas or suggestions, feel free to reach out or contribute to the code!
