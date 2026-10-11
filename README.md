# NEXORA DIGITAL — Global Recruitment Platform

NEXORA Digital is a global job marketplace connecting candidates and employers. The application is built with Next.js App Router, React, TypeScript, Prisma, and a database-backed API, and is deployed through Vercel.

## Current platform areas

- Candidate and company registration and sign-in
- Candidate profile, skills, languages, preferred locations, and job matching
- Public vacancy search and vacancy details
- Job applications and candidate application status
- Company dashboard, vacancy management, and applicant review
- Administrative overview and company verification
- Subscription plan limits and Stripe checkout/webhook integration
- Account, pricing, notification/activity, contact, and legal pages

## Access and publishing rules

- Public vacancy listings are limited to published jobs belonging to verified companies.
- Company vacancy publishing requires company verification and an active Business subscription.
- Candidate application and matching limits depend on the active plan.
- Administrative endpoints require an ADMIN account.
- Stripe must be configured with the appropriate server-side environment variables before checkout and webhook processing can operate. Keep real payments disabled until company and tax setup is complete; use Stripe test mode while validating.

## Core technology

- Next.js App Router and React
- TypeScript
- Prisma ORM
- Vercel deployment
- Stripe REST API and signed webhooks

## Environment configuration

Keep secrets out of Git. Configure private values in the deployment environment, not in committed source files. Required configuration depends on the features being enabled and includes the database connection, session/authentication configuration, and Stripe secret, webhook secret, and role-appropriate price IDs.

## Verification

The GitHub Actions workflow checks the repository build on pushes. A successful build confirms compilation/build checks only; it does not replace end-to-end verification of registration, email/session flows, database configuration, billing webhooks, or the deployed production site.

## Deployment workflow

1. Make a focused change.
2. Commit it to the deployment branch.
3. Check the GitHub Actions result.
4. Confirm the corresponding Vercel deployment and inspect the affected flow.
5. Do not enable live payments until the business setup and payment configuration are ready.
