---
id: page_scopecam
type: page
source_file: projects/scopecam.html
source_selector: main
route: /projects/scopecam.html
content_hash: 75247bc57facb683136992a8053b9898070aca28c74444d0d0c904b0978decb5
html_hash: a0d174b97013b394cb7f672982ebc7c57ab724bca170dd59393a311a7058e5f8
normalizer_version: 1
sync_direction: html_to_markdown
protected_fields: [id, type, source_file, source_selector, normalizer_version]
---

← Back to work

[Evidence](/#evidence) · Safety-Critical Systems

# ScopeCam

USB Microscope Camera App

Alpha · v0.1

## Overview

Alpha-stage Android app and multi-module runtime for USB microscope cameras (UVC standard) — built for serious microscopy workflows, not generic phone-camera use. Solo-built; currently a personal-profile v0.1-alpha.

The work lives in the boundary between Android, USB camera behavior, and native libraries: a vendored stack (libusb, libuvc, libjpeg-turbo) behind a descriptor-first capability layer, with session-based capture that records scientific metadata (sample IDs, magnification, calibration, operator identity).

## Technical Details

### Platform & Stack

- Android (Kotlin), Jetpack Compose UI, foreground camera service
- Vendored native stack (libusb, libuvc, libjpeg-turbo) via JNI/NDK
- Six Gradle modules plus an ArchUnit architecture-test module
- Room + MediaStore persistence; descriptor-first UVC handling

### Technical Challenges

- USB OTG communication protocols
- Native library integration (C → Kotlin via JNI)
- Memory pooling for efficient frame processing
- Camera initialization and configuration management
- Real-time frame delivery pipeline

## Why This Matters

### Architecture Discipline

Six Gradle modules with ArchUnit guardrails enforcing boundaries between app, domain, native, and platform code.

### Hardware Integration

Working with USB protocols and native hardware interfaces, not just high-level APIs.

### Performance Optimization

Real-time frame processing with memory management constraints on mobile hardware.

### Test Coverage

1,790 tests passing on the verified baseline, with Crashlytics and OpenTelemetry instrumentation.

## Development Context

This project emerged from a practical need: getting USB microscope cameras to work reliably on Android for real microscopy workflows. The hard parts are real — UVC descriptor handling, the Kotlin-to-native boundary, memory churn during real-time capture, and physical-device testing.

It sits at the intersection of hardware protocols, native libraries, and Android development, and is governed like a serious system: ADRs (a kotlin-Result migration, a design-system ontology), an SDK-extraction plan, and a documentation-governance plan. Apache 2.0.

## Technical Depth

This project demonstrates understanding of:

- Android platform development and architecture
- USB OTG protocols and device communication
- JNI/NDK for native library integration
- Memory management in performance-critical contexts
- Real-time data processing pipelines
- Hardware compatibility and driver-level work

## Interested in this work?

Happy to talk about this project or the research practice behind it.

Email me about this →

← Back to Evidence
