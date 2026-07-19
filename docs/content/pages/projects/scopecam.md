---
id: page_scopecam
type: page
source_file: projects/scopecam.html
source_selector: main
route: /projects/scopecam.html
content_hash: 212312907ab540c0c4bf8f926bcf2b1bef49f2c366e01d340971b25275f97e27
html_hash: a1e94c4441856c2b366140c16868cbb0201b92d541e3cb18306e061e54713857
normalizer_version: 1
sync_direction: html_to_markdown
protected_fields: [id, type, source_file, source_selector, normalizer_version]
---

← Back to work

[Evidence](/#evidence) · Native Android and physical-device engineering

# ScopeCam

Private Android UVC microscope application

Client-delivered alpha · Current app 0.1.1-alpha

## What is this?

ScopeCam is a private proprietary Android application and multi-module camera runtime for UVC USB microscope cameras. It combines a Jetpack Compose interface, Kotlin orchestration, and a C++/JNI camera engine.

## What is it for?

It supports mobile microscopy workflows that standard phone-camera APIs do not address: discovering and connecting a specialized USB camera, reaching live preview, capturing photos or video, preserving session and scientific metadata, and reviewing committed media.

## How is it used?

An Android device acts as the USB host. The operator connects a supported microscope camera, grants permission, previews the stream, captures or records, and reviews the result. Debug and QA builds add local REST/WebSocket telemetry and diagnostics; release builds bind a no-op implementation instead of starting that service.

## Why does it matter?

The project crosses Android UI, Kotlin orchestration, native C++, USB lifecycle, render synchronization, persistence, observability, and physical-device testing. Its strongest case study traced a camera-replug ANR across the JVM/native boundary and implemented a bounded, device-verified recovery while documenting the remaining leak tradeoff.

## Evidence and status

- A signed `0.1-alpha` client build was delivered on 2026-06-09; the current application is `0.1.1-alpha`.
- Fresh `just verify` and native-inclusive QA APK builds passed on 2026-07-14, packaging the native engine for both supported ABIs.
- Device verification recovered streaming after the replug deadlock without a new ANR. A timed-out recovery can still leave the stuck camera and threads until process restart.
- The source is private and intentionally unlinked; the application is not broadly released.
- Broader hardware and release acceptance remain open.

### What this does not demonstrate

No arbitrary UVC compatibility, general performance guarantee, end-to-end zero-copy pipeline, seamless or leak-free hot-plug recovery, shipped SDK, or production readiness is claimed.

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

## What the work demonstrates

- Native Android, Kotlin, C++, JNI, and NDK systems engineering.
- USB lifecycle and physical-device integration.
- Cross-boundary concurrency and teardown debugging.
- Evidence-oriented diagnostics and device verification.
- Client delivery with explicit compatibility and maturity boundaries.

## Interested in this work?

Happy to discuss the public-safe engineering case study, verification approach, and documented limits.

Email me about this →
