group "default" {
  targets = ["app"]
}

target "app" {
  context = "."
  dockerfile = "Dockerfile"
  platforms = ["linux/amd64", "linux/arm64"]
  tags = [
    "deano408/my-python-app:latest",
    "deano408/my-python-app:placeholder"
  ]
  cache-from = ["type=local,src=./.buildx-cache"]
  cache-to = ["type=local,dest=./.buildx-cache-new"]
  output = ["type=image"]
  args = {
    ENVIRONMENT = "production"
  }
}

