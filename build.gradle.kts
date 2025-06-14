plugins {
    kotlin("jvm") version "2.2.0" // Latest stable Kotlin version
    application
    `maven-publish` // Enables publishing to Maven
}

repositories {
    mavenCentral()
    google()
}

dependencies {
    implementation("org.jetbrains.kotlin:kotlin-stdlib:2.2.0")
    implementation("org.jetbrains.kotlin:kotlin-reflect:2.2.0")
}

application {
    mainClass.set("your.package.MainKt") // Ensure this matches your actual package name
}

configurations.all {
    resolutionStrategy.force("org.jetbrains.kotlin:kotlin-stdlib:2.2.0")
}

tasks.jar {
    manifest {
        attributes["Main-Class"] = "your.package.MainKt" // Set your actual main class
    }
    archiveFileName.set("main.jar")
}

publishing {
    publications {
        create<MavenPublication>("mavenJava") {
            from(components["java"])
            groupId = "com.example"
            artifactId = "my-library"
            version = "1.0.0"
        }
    }
}
