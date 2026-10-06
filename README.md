# NEXORA DIGITAL

Modern AI-powered digital platform for creating, renewing, and managing websites with intelligent automation.

## Project Foundation

NEXORA DIGITAL is being rebuilt from a clean foundation as a modern SaaS platform.

The new project is developed step by step, with each foundation layer verified before additional services or advanced features are introduced.

### Core Technology

* Next.js
* App Router
* React
* TypeScript
* Modern responsive UI
* Vercel deployment
* Modular architecture
* Secure environment configuration

### Development Principles

* Clean project foundation
* Minimal dependencies
* No legacy authentication system
* No legacy database architecture
* No unused services
* No secrets stored in Git
* No unnecessary middleware
* No production service is added before it is required
* Every major development step must pass the production build before continuing

## Platform Direction

NEXORA DIGITAL will provide an AI-powered environment for:

* Creating modern websites
* Renewing and modernizing existing websites
* AI-assisted website development
* Project management
* AI Studio
* Customer workspace
* Account management
* Usage management
* Subscription plans
* Secure payments
* AI-powered automation
* Future multi-tenant business functionality

## Development Stages

### Stage 1 — Clean Foundation

The first stage contains only the essential project structure required to run NEXORA DIGITAL reliably.

The objective is:

* Project starts correctly
* Production build succeeds
* Vercel deployment succeeds
* Main page loads correctly
* No unnecessary external services
* No legacy code

### Stage 2 — User Experience

After the foundation is verified:

* Navigation
* Landing page
* Authentication interface
* Account pages
* Pricing
* Legal pages
* Responsive design
* NEXORA branding

### Stage 3 — Account and Workspace

After the UI foundation is stable:

* User accounts
* Customer dashboard
* Workspace
* Projects
* Usage information
* Account settings

### Stage 4 — AI Studio

After the account system is verified:

* AI Studio
* AI website generation
* AI website renewal
* Project conversations
* AI task management
* Usage limits

### Stage 5 — Database and Services

Only when required by the application:

* Managed database
* Authentication service
* AI provider
* File/storage service
* Email service
* Background processing

External services are introduced individually and tested independently.

### Stage 6 — Payments

After accounts and subscriptions are stable:

* Stripe integration
* Subscription plans
* Payment status
* Plan management
* Usage limits
* Billing management

### Stage 7 — Production Platform

The final production layer will include:

* Multi-tenant architecture
* Security hardening
* Monitoring
* Error handling
* Production environment configuration
* Performance optimization
* Full acceptance testing

## Environment Variables

Secrets and private configuration must never be committed to Git.

Environment variables belong in the deployment environment and local `.env` files.

An `.env.example` file may document required variable names without containing real credentials.

## Development Workflow

Every major change follows this process:

1. Implement one controlled feature.
2. Run the production build.
3. Fix any build or runtime errors.
4. Verify the deployment.
5. Con

