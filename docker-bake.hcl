group "default" {
  targets = ["myapp"]
}

target "myapp" {
  context    = "."
  dockerfile = "Dockerfile"
  tags       = ["myapp:latest"]

  # Platforms for multi-architecture builds (ensure builder supports this)
  platforms  = [
    "linux/amd64",
    "linux/arm64"
  ]

  # Build arguments
  args = {
    GIT_COMMIT = "override-me"
  }

  # Uncomment if you need SSH access during the build
  # ssh = [
  #   "default=/home/deanmacdonald/.ssh/id_rsa"
  # ]

  # Uncomment to pass a secret for use in Dockerfile
  # secret = [
  #   "id=ssh_key,src=/home/deanmacdonald/.ssh/id_rsa"
  # ]

  # Enable caching from registry
  cache-from = [
    "type=registry,ref=myapp:latest"
  ]

  # Push resulting image to local or remote registry
  output = [
    "type=image,name=myapp:latest,push=true"
  ]
}

