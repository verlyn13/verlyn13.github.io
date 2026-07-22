---
id: page_scopecam
type: page
source_file: projects/scopecam.html
source_selector: main
route: /projects/scopecam.html
content_hash: 70c6da222d5abf5c88a999ccbd32c6ef45d9e18fa82d53160d81bf6545664d1c
html_hash: 48d2ba8b8c85ac3b3f23094b971ee885e25d0ef184070a24e26d3dc1962a0265
normalizer_version: 1
sync_direction: html_to_markdown
protected_fields: [id, type, source_file, source_selector, normalizer_version]
---

← Back to work

[Evidence](/#evidence) · Native Android and physical-device engineering

# ScopeCam

Private Android UVC microscope application

Client-delivered alpha · Current app 0.1.1-alpha

## Summary

ScopeCam is a private proprietary Android application and multi-module camera runtime for UVC USB microscope cameras. It combines a Jetpack Compose interface, Kotlin orchestration, and a C++/JNI camera engine.

## Strongest proof

A signed `0.1-alpha` client build was delivered on 2026-06-09. Physical-device testing also verified recovery from a camera-replug deadlock without a new application-not-responding failure.

## Technical decision

The application separates Android UI and Kotlin orchestration from a C++/JNI camera engine. Debug and QA builds include local diagnostics, while release builds bind a no-op implementation instead of starting that service.

## Current limit

The source is private and the application is not broadly released. Hardware coverage remains limited, and a timed-out camera recovery can still require a process restart.

## Technical shape

### Android and native camera stack

- Android, Kotlin, Jetpack Compose, and a foreground camera service.
- C++20 JNI/NDK engine built with CMake for ARM64 and ARMv7.
- Vendored `libusb`, `libuvc`, and `libjpeg-turbo` linked into the native engine.
- Room and MediaStore persistence with descriptor-first UVC handling.

### Scoped render-path optimization

An `AHardwareBuffer`-backed triple-buffer path uses EGLImage texture binding and fence synchronization to avoid an additional CPU copy between the native frame buffer and GPU texture. This is a boundary-specific optimization, not an end-to-end zero-copy claim.

### Evidence-oriented diagnostics

Debug and QA builds expose local telemetry, snapshots, and protected diagnostic actions. Release builds use a no-op implementation, so this is not a production REST-service claim.

### Specification and handback discipline

A repository operating contract separates source validation from physical-device evidence. Specialized workflows return explicit PASS or FAIL handbacks with the observation method, unresolved risks, and the next responsible actor, so a static check cannot silently stand in for USB negotiation or camera behavior.

## What the work demonstrates

- Native Android, Kotlin, C++, JNI, and NDK systems engineering.
- USB lifecycle and physical-device integration.
- Cross-boundary concurrency and teardown debugging.
- Specification-driven, cross-tool agent workflows with evidence-preserving handbacks.
- Evidence-oriented diagnostics and device verification.
- Client delivery with explicit compatibility and maturity boundaries.

## Interested in this work?

Happy to discuss the public-safe engineering case study, verification approach, and documented limits.

Email me about this →
