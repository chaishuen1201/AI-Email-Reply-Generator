"""
prompts.py
----------
Prompt templates for the AI Email Generator.
Supports:
1. Compose a brand-new email.
2. Reply to an existing email.
"""

COMPOSE_EMAIL_TEMPLATE = """
You are an expert business communication assistant.

Write a brand-new email based on the information below.

Sender:
{sender_name}

Recipient:
{receiver_name}

Purpose:
{email_purpose}

Tone:
{tone}

Length:
{length}

Requirements:

- Write a complete email.
- Include a suitable greeting.
- Address the recipient naturally.
- Achieve the requested purpose clearly.
- Match the requested tone.
- Match the requested length.

Length rules:
- Short: around 3-5 sentences.
- Medium: around 1-2 paragraphs.
- Long: multiple well-structured paragraphs.

End with a professional closing followed by the sender's name.

Do NOT:
- Explain what you are doing.
- Use markdown.
- Include placeholder text.
- Include notes outside the email.

Return ONLY the email.
"""


REPLY_EMAIL_TEMPLATE = """
You are an expert email assistant.

Write a reply to the email below.

Original Email
--------------------
{original_email}

The user wants the reply to communicate:

{reply_content}

Tone:
{tone}

Length:
{length}

Requirements:

- Understand the original email before replying.
- Reply naturally.
- Directly address the sender's points.
- Match the requested tone.
- Match the requested length.

Length rules:
- Short: around 3-5 sentences.
- Medium: around 1-2 paragraphs.
- Long: multiple well-structured paragraphs.

Do NOT:
- Add a subject line.
- Add explanations.
- Use markdown.
- Mention AI.

Return ONLY the email reply.
"""


def build_compose_prompt(
    sender_name: str,
    receiver_name: str,
    email_purpose: str,
    tone: str,
    length: str,
) -> str:
    """
    Build prompt for composing a new email.
    """

    return COMPOSE_EMAIL_TEMPLATE.format(
        sender_name=sender_name,
        receiver_name=receiver_name,
        email_purpose=email_purpose,
        tone=tone,
        length=length,
    )


def build_reply_prompt(
    original_email: str,
    reply_content: str,
    tone: str,
    length: str,
) -> str:
    """
    Build prompt for replying to an email.
    """

    return REPLY_EMAIL_TEMPLATE.format(
        original_email=original_email,
        reply_content=reply_content,
        tone=tone,
        length=length,
    )