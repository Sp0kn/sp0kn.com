from fastapi import APIRouter, HTTPException, status
from ..models.schemas import SuggestionRequest
from ..services import email_service

router = APIRouter()


@router.post("", status_code=status.HTTP_204_NO_CONTENT)
async def submit_suggestion(payload: SuggestionRequest):
    """Send an anonymous suggestion by email."""
    sent = await email_service.send_suggestion(
        message=payload.message,
        pseudonyme=payload.pseudonyme,
    )
    if not sent:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Email service not configured or unavailable",
        )
