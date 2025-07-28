group "default" {
  targets = ["chess"]
}

target "chess" {
  context = "./"
  dockerfile = "Dockerfile"
  tags = ["deanmacdonald/chess:latest"]
  platforms = ["linux/amd64"]
}
