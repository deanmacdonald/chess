group "default" {
  targets = ["chess"]
}

target "chess" {
  context    = "./"
  dockerfile = "Dockerfile"
  tags       = ["chess:latest"]
  platforms  = ["linux/amd64", "linux/arm64"]
  cache-from = ["type=local,src=./.build-cache"]
  cache-to   = ["type=local,dest=./.build-cache"]
  output     = ["type=docker"]
  labels = {
    "maintainer" = "Dean <dean@example.com>"
    "org.opencontainers.image.source" = "https://github.com/dean/chess"
    "org.opencontainers.image.description" = "Multi-platform chess engine build"
  }
}

