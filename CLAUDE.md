# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Early-stage TypeScript project with Linear API integration. No build system or dependencies are configured yet.

## Environment Variables

Managed via [Varlock](https://varlock.dev) with `@env-spec` schema format:
- **Schema**: `.env.schema` defines variables with type/sensitivity annotations
- **Types**: `env.d.ts` is auto-generated from the schema (`@generateTypes(lang=ts, path=env.d.ts)`)
- **Never** read `.env` directly — use Varlock commands to inspect

Current variables:
- `LINEAR_API_KEY` — sensitive, used for Linear API access

## Varlock Commands

| Command | Purpose |
|---------|---------|
| `varlock load` | Validate all env vars and show masked values |
| `varlock load --quiet` | Validate silently (exits non-zero on failure) |
| `varlock load \| grep VAR_NAME` | Check a specific variable safely |
| `varlock run -- <cmd>` | Run a command with validated env vars injected |
| `varlock init` | Generate `.env.schema` from an existing `.env` |
| `cat .env.schema` | View the schema (safe — contains no secret values) |

**Security rules:**
- Never use `cat .env`, `echo $SECRET`, or `printenv` — these expose secrets to Claude's context
- Always use `varlock load` to inspect env state
- Use `varlock run -- <cmd>` to pass secrets to commands
