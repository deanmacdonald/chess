// 🔧 Define shared variables
variable "APP_ENV" {
  default = "production"
}

variable "VERSION" {
  default = "latest"
}

// 🧵 Common output configuration
group "default" {
  targets = ["myapp"]
}

group "all" {
  targets = ["myapp", "myapp-dev", "myapp-debug"]
}

// 🚀 Base target configuration
target "base" {
  context    = "./"
  dockerfile = "Dockerfile"
  output     = ["type=docker"]
}

// 📦 Production build
target "myapp" {
  inherits = ["base"]
  tags     = ["myapp:${VERSION}"]
  args = {
    APP_ENV = "${APP_ENV}"
  }
}

// 🧪 Development build with caching
target "myapp-dev" {
  inherits   = ["base"]
  tags       = ["myapp:dev"]
  cache-from = ["type=local,src=.build-cache"]
  cache-to   = ["type=local,dest=.build-cache"]
  args = {
    APP_ENV = "development"
  }
}

// 🕵️ Debug build (optional add-on for verbose logging)
target "myapp-debug" {
  inherits   = ["base"]
  tags       = ["myapp:debug"]
  args = {
    APP_ENV = "debug"
    ENABLE_DEBUG = "true"
  }
}

