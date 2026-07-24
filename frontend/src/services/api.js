/**
 * api.js
 *
 * Handles communication with FastAPI backend.
 *
 * Sends requests to:
 * POST /generate/stream
 *
 * Supports:
 * - Compose New Email
 * - Reply to Email
 *
 * Uses native Fetch API streaming
 * to display AI response progressively.
 */


const BASE_URL = "http://localhost:8000";



/**
 * Generate email with streaming response.
 *
 * @param {Object} params
 *
 * @param {"send"|"reply"} params.actionType
 *
 * Compose mode:
 * @param {string} params.senderName
 * @param {string} params.receiverName
 * @param {string} params.emailPurpose
 *
 * Reply mode:
 * @param {string} params.originalEmail
 * @param {string} params.replyContent
 *
 * Common:
 * @param {string} params.tone
 * @param {string} params.length
 *
 * @param {(chunk:string)=>void} onChunk
 */
export async function generateEmailStream(
  {
    actionType,

    senderName,
    receiverName,
    emailPurpose,

    originalEmail,
    replyContent,

    tone,
    length,
  },

  onChunk
) {


  const body = {

    action_type: actionType,

    tone,
    length,

  };



  if (actionType === "send") {

    body.sender_name = senderName;

    body.receiver_name = receiverName;

    body.email_purpose = emailPurpose;


  } else {


    body.original_email = originalEmail;

    body.reply_content = replyContent;

  }




  let response;


  try {


    response = await fetch(
      `${BASE_URL}/generate/stream`,
      {

        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(body),

      }
    );


  } catch (error) {


    throw new Error(
      "Cannot connect to server. Please make sure the backend is running."
    );

  }




  if (!response.ok) {


    let message =
      "Failed to generate email.";


    try {

      const data = await response.json();

      if (data?.detail) {
        message = data.detail;
      }


    } catch {

      // ignore JSON parse errors

    }


    throw new Error(message);

  }





  if (!response.body) {

    throw new Error(
      "Server returned an empty response."
    );

  }




  const reader =
    response.body.getReader();


  const decoder =
    new TextDecoder();



  let accumulated = "";



  while (true) {


    const {
      done,
      value

    } = await reader.read();



    if (done) {
      break;
    }




    const chunk =
      decoder.decode(
        value,
        {
          stream: true
        }
      );



    accumulated += chunk;




    /*
      Backend sends:
      [ERROR] message

      when Gemini fails during streaming.
    */

    if (accumulated.startsWith("[ERROR]")) {


      throw new Error(
        accumulated
          .replace("[ERROR]", "")
          .trim()
      );


    }




    onChunk(chunk);


  }

}