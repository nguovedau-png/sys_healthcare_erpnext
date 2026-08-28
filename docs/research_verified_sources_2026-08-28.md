# Verified market observations — 28 August 2026

## Medpro official page
Source: https://medpro.vn/

The official Medpro page presents appointment booking by facility and specialty, online queue-number booking, remote video consultation, laboratory booking, after-hours booking, corporate health checks, home healthcare, vaccination, provider/service discovery, cancellation with refund messaging, and a phone-assisted booking channel (1900 2115). This validates that Vietnamese users may expect a connected patient journey rather than a standalone calendar.

## BookingCare official page
Source: https://bookingcare.vn/

The official BookingCare page presents search for doctors, hospitals, clinics, and services; at-home and in-facility care; remote consultation; specialty and wellness discovery; provider and facility listings; health content/tests; and AI-assisted discovery and deeper provider/facility search. This validates discovery, trust/content, remote care, and AI-assisted search as competitive expectations, while not proving that an outpatient clinic operating system should copy its consumer marketplace scope.

## Product implications

The repository’s narrow outpatient operating-system wedge remains defensible, but it must expose real availability, queue state, provider/service details, assisted channels, cancellation/refund policy, and verified trust signals. AI should initially support search and operational assistance, not diagnosis or autonomous clinical decisions. Family/dependent profiles, consent, facility-scoped access, and receptionist workflows are differentiated operational needs that consumer discovery platforms do not replace.

## NAPAS official VietQR page
Source: https://napas.com.vn/dich-vu-thanh-toan-bang-ma-qr

NAPAS describes VietQR as infrastructure connecting payment intermediaries and banks for QR transactions, with merchant-presented QR, standards aligned to State Bank standards, and support for offline and online merchants. The product should therefore implement a provider/merchant adapter and reconciliation model rather than hard-code a bank or treat a QR image as proof of settlement. Payment confirmation must come from authenticated provider events or controlled reconciliation, with idempotency and a manual exception path.
