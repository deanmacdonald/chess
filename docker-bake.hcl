group "default" {
  targets = ["myapp"]
}

target "myapp" {
  context = "./"
  dockerfile = "Dockerfile"
  tags = ["myapp:latest"]
}

