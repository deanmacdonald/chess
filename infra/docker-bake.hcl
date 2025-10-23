group "default" {
  targets = ["dev"]
}

target "base" {
  dockerfile = "Dockerfile"
  context = "."
  cache-from = ["type=local,src=./.buildx-cache"]
  cache-to = ["type=local,dest=./.buildx-cache"]
}

target "dev" {
  inherits = ["base"]
  tags = ["chess-app:dev"]
  args = {
    ENV = "development"
  }
}

target "prod" {
  inherits = ["base"]
  tags = ["chess-app:latest"]
  args = {
    ENV = "production"
  }
}

