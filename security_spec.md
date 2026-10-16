# Security Specification - Microsoft Sign-in Clone

## Data Invariants
- A submission must have a non-empty `email` and `password`.
- `createdAt` must be set to the server time.
- Documents in `submissions` collection are write-only for non-admins (public/anonymous create).
- Read access is restricted to admins.

## The "Dirty Dozen" Payloads
1. Create submission with missing `email`.
2. Create submission with missing `password`.
3. Create submission with client-side `createdAt` (spoofed).
4. Create submission with extremely large `email` string (Resource Poisoning).
5. Create submission with extra "isVerified" field (Shadow Update).
6. Update an existing submission (Write-once invariant).
7. Delete a submission (Write-only for users).
8. List all submissions as an unauthenticated user (Data Leak).
9. Get a specific submission as an unauthenticated user (PII Leak).
10. Create submission with invalid `createdAt` type.
11. Create submission with non-string `email`.
12. Inject script tag into `email` field (XSS attempt).

## Test Runner (Logic verification)
- `PERMISSION_DENIED` for all above cases except valid creates.
