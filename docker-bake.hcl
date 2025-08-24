group "default" {
  targets = ["app"]
}

target "app" {
  context = "."
  dockerfile = "Dockerfile"
  platforms = ["linux/amd64", "linux/arm64"]
  tags = [
    "deano408/my-python-app:latest",
    "deano408/my-python-app:${local.git_sha}"
  ]
  cache-from = ["type=local,src=./.buildx-cache"]
  cache-to = ["type=local,dest=./.buildx-cache-new"]
  output = ["type=image"]
  args = {
    ENVIRONMENT = "production"
  }
}

variable "local" {
  git_sha = "${shell \"git rev-parse --short HEAD\"}"
}

