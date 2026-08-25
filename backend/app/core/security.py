# Authentication is intentionally lightweight for this prototype.
# Add JWT/Supabase Auth here when authentication is enabled by the frontend contract.
def redact_secret(value: str | None) -> str:
    if not value:
        return ""
    return "***"
