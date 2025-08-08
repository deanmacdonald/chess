group "default" {
  targets = ["chess"]
}

target "chess" {
  context    = "./"
  dockerfile = "Dockerfile"

  # 🏷️ Multiple tags for versioning and latest
  tags = [
    "deanmacdonald/chess:latest",
    "deanmacdonald/chess:${local.timestamp}"
  ]

  # 🖥️ Build for multiple platforms
  platforms = ["linux/amd64", "linux/arm64"]

  # 🧱 Optional build args (if your Dockerfile uses ARGs)
  args = {
    BUILD_ENV = "production"
  }

  # 🧹 Optional cache settings for faster builds
  cache-from = ["type=local,src=./.build-cache"]
  cache-to   = ["type=local,dest=./.build-cache"]
}

# 🕒 Local variable for timestamped tag
variable "timestamp" {
  default = "${time.now}"
}}
