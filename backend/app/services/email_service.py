import os
import resend

resend.api_key = os.getenv("RESEND_API_KEY", "")

TO_EMAIL   = os.getenv("SUGGESTION_TO_EMAIL", "")
FROM_EMAIL = os.getenv("SUGGESTION_FROM_EMAIL", "noreply@sp0kn.com")


async def send_suggestion(message: str, pseudonyme: str | None = None) -> bool:
    if not resend.api_key or not TO_EMAIL:
        return False

    sender_label = pseudonyme if pseudonyme else "Anonyme"
    subject = f"[Sp0kn] Suggestion de {sender_label}"

    html_body = f"""
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:20px;">
      <h2 style="color:#F5A623;margin-bottom:4px;">Nouvelle suggestion</h2>
      <p style="color:#8B949E;font-size:13px;margin-top:0;">Via sp0kn.com</p>
      <hr style="border:none;border-top:1px solid #30363D;margin:16px 0;" />
      <p><strong>Pseudo :</strong> {sender_label}</p>
      <div style="background:#161B22;border:1px solid #30363D;border-radius:8px;padding:16px;margin-top:12px;">
        <p style="margin:0;white-space:pre-wrap;color:#E6EDF3;">{message}</p>
      </div>
    </div>
    """

    try:
        resend.Emails.send({
            "from": FROM_EMAIL,
            "to": [TO_EMAIL],
            "subject": subject,
            "html": html_body,
        })
        return True
    except Exception:
        return False
