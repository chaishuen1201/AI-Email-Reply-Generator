import { useState, useEffect } from "react";
import useTypingEffect from "../hooks/useTypingEffect";
import ToneSelector from "../components/ToneSelector";
import LengthSelector from "../components/LengthSelector";
import GenerateButton from "../components/GenerateButton";
import ReplyOutput from "../components/ReplyOutput";
import { useEffect } from "react";

import { generateEmailStream } from "../services/api";


export default function Home() {

    const typingText =
    "A quiet workspace for creating thoughtful, professional emails with a little help.";

  const [displayText, setDisplayText] = useState("");

  useEffect(() => {

    if (!generatedResult) {
      setDisplayedResult("");
      return;
    }


    let index = 0;

    setDisplayedResult("");


    const interval = setInterval(() => {

      setDisplayedResult(
        previous =>
          previous + generatedResult[index]
      );


      index++;


      if (index >= generatedResult.length) {
        clearInterval(interval);
      }


    }, 20);


    return () => clearInterval(interval);


  }, [generatedResult]);

  useEffect(() => {
    let index = 0;

    const timer = setInterval(() => {

      setDisplayText(
        typingText.slice(0, index)
      );

      index++;

      if (index > typingText.length) {
        clearInterval(timer);
      }

    }, 45);


    return () => clearInterval(timer);

  }, []);

  const [actionType, setActionType] = useState("send");


  // Compose
  const [senderName, setSenderName] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [emailPurpose, setEmailPurpose] = useState("");


  // Reply
  const [originalEmail, setOriginalEmail] = useState("");
  const [replyContent, setReplyContent] = useState("");


  // Settings
  const [tone, setTone] = useState("Professional");
  const [length, setLength] = useState("Medium");


  const [generatedResult, setGeneratedResult] = useState("");
  const [displayedResult, setDisplayedResult] = useState("");
  const typedResult = useTypingEffect(
  generatedResult,
  15
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();



  const handleGenerate = async () => {

    setError("");
    setGeneratedResult("");


    if (actionType === "send") {

      if (
        !senderName.trim() ||
        !receiverName.trim() ||
        !emailPurpose.trim()
      ) {

        setError(
          "Please complete the sender, recipient and message purpose."
        );

        return;
      }

    } else {


      if (
        !originalEmail.trim() ||
        !replyContent.trim()
      ) {

        setError(
          "Please provide the email and your reply points."
        );

        return;
      }

    }



    setIsLoading(true);


    try {

      await generateEmailStream(
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

        (chunk) => {

          setGeneratedResult(
            previous => previous + chunk
          );

        }
      );


    } catch(error) {


      setError(
        error.message ||
        "Something went wrong."
      );


    } finally {

      setIsLoading(false);

    }

  };



  return (

    <main
      className="
      min-h-screen
      bg-[#F7F4EE]
      text-[#242424]
      px-6
      py-12
      "
    >


      <div
        className="
        max-w-3xl
        mx-auto
        "
      >



        {/* Header */}

        <header
          className="
          mb-12
          text-center
          flex
          flex-col
          items-center
          "
        >

          <h1
            className="
            font-serif
            text-5xl
            tracking-tight
            mb-4
            "
          >
            Correspondence Desk
          </h1>


          <p
            className="
            text-neutral-500
            max-w-xl
            leading-relaxed
            min-h-[48px]
            "
          >
            {displayText}
            <span
              className="
              animate-pulse
              text-neutral-400
              "
            >
              |
            </span>
          </p>

        </header>




        {/* Main Editor */}

        <section
          className="
          bg-[#FFFCF7]
          border
          border-neutral-200
          rounded-lg
          shadow-sm
          p-8
          "
        >



          {/* Switch */}

          <div
            className="
            flex
            gap-8
            border-b
            border-neutral-200
            mb-8
            "
          >

            <button

              onClick={()=>{
                setActionType("send");
                setError("");
              }}

              className={`
              pb-3
              text-sm
              ${
                actionType==="send"
                ?
                "border-b-2 border-neutral-900 text-neutral-900"
                :
                "text-neutral-400"
              }
              `}
            >
              Compose
            </button>



            <button

              onClick={()=>{
                setActionType("reply");
                setError("");
              }}

              className={`
              pb-3
              text-sm
              ${
                actionType==="reply"
                ?
                "border-b-2 border-neutral-900 text-neutral-900"
                :
                "text-neutral-400"
              }
              `}
            >

              Reply

            </button>


          </div>





          <div
            className="
            space-y-7
            "
          >



          {
            actionType==="send"
            ?

            <>

            <div className="grid md:grid-cols-2 gap-6">


              <InputLine
                label="From"
                value={senderName}
                setValue={setSenderName}
                placeholder="Your name"
              />


              <InputLine
                label="To"
                value={receiverName}
                setValue={setReceiverName}
                placeholder="Recipient name"
              />


            </div>


            <TextAreaLine

              label="What would you like to say?"

              value={emailPurpose}

              setValue={setEmailPurpose}

              placeholder="Describe the purpose of this email..."

            />


            </>


            :


            <>

            <TextAreaLine

              label="Original email"

              value={originalEmail}

              setValue={setOriginalEmail}

              placeholder="Paste the email here..."

            />


            <TextAreaLine

              label="Your response"

              value={replyContent}

              setValue={setReplyContent}

              placeholder="What should your reply communicate?"

            />


            </>

          }





          <div
            className="
            grid
            md:grid-cols-2
            gap-6
            pt-4
            "
          >

            <ToneSelector
              value={tone}
              onChange={setTone}
            />


            <LengthSelector
              value={length}
              onChange={setLength}
            />


          </div>





          {
            error &&

            <p
              className="
              text-sm
              text-red-600
              "
            >
              {error}
            </p>

          }




          <GenerateButton

            onClick={handleGenerate}

            isLoading={isLoading}

          />




          </div>


        </section>





        {
          generatedResult &&

          <section
            className="
            mt-10
            bg-[#FFFCF7]
            border
            border-neutral-200
            rounded-lg
            p-8
            "
          >

            <p
              className="
              uppercase
              text-xs
              tracking-widest
              text-neutral-400
              mb-5
              "
            >
              Draft Preview
            </p>


            <ReplyOutput
              reply={generatedResult}
              isGenerating={isLoading}
            />


          </section>

        }


      </div>


    </main>

  );

}





function InputLine({
  label,
  value,
  setValue,
  placeholder
}){


return (

<div>

<label
className="
text-xs
uppercase
tracking-widest
text-neutral-400
"
>
{label}
</label>


<input

value={value}

onChange={
(e)=>setValue(e.target.value)
}

placeholder={placeholder}

className="
w-full
bg-transparent
border-b
border-neutral-300
py-3
outline-none
focus:border-neutral-900
transition
"

/>

</div>

)

}




function TextAreaLine({
label,
value,
setValue,
placeholder
}){


return (

<div>

<label

className="
text-xs
uppercase
tracking-widest
text-neutral-400
"

>

{label}

</label>


<textarea

rows={5}

value={value}

onChange={
(e)=>setValue(e.target.value)
}


placeholder={placeholder}


className="
w-full
bg-transparent
border-b
border-neutral-300
py-3
resize-none
outline-none
focus:border-neutral-900
transition
"

/>


</div>


)

}