group "default" {
  targets = ["myapp"]
}

target "myapp" {
  context    = "."
  dockerfile = "Dockerfile"

  tags = [
    "myapp:latest"
  ]

  platforms = [
    "linux/amd64",
    "linux/arm64"
  ]

  args = {
    DOTNET_VERSION = "8.0"
    PORT           = "8000"
  }

  cache-from = [
    "type=registry,ref=myapp:latest"
  ]

  cache-to = [
    "type=inline"
  ]

  output = [
    "type=image,name=myapp:latest,push=true"
  ]
}

