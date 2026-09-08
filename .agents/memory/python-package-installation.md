---
name: Python package installation
description: Environment-specific guidance for adding temporary Python tooling during document or media processing.
---

Use the workspace package installation flow for Python dependencies instead of assuming the system interpreter has pip available.

**Why:** The base Python image can omit pip, so direct pip commands may fail even though Python packages can still be installed through the workspace tooling.

**How to apply:** When a task needs a Python package for processing an uploaded file, install it through the package-management callback and run scripts with the resulting workspace environment.