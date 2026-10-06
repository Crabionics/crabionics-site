"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { answerQuestion, assistantAnswers } from "../../lib/faq-assistant";
import v from "./Refinements.module.css";
export default function FaqPanel({ close }: { close: () => void }) {
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState<ReturnType<typeof answerQuestion>[]>(
    [],
  );
  const input = useRef<HTMLInputElement>(null);
  const end = useRef<HTMLDivElement>(null);
  useEffect(() => {
    input.current?.focus();
  }, []);
  useEffect(() => {
    end.current?.scrollIntoView({ block: "nearest" });
  }, [answers]);
  function ask(text: string) {
    if (!text.trim()) return;
    setAnswers((items) => [
      ...items.slice(-5),
      { ...answerQuestion(text), question: text },
    ]);
    setQuestion("");
  }
  function submit(event: FormEvent) {
    event.preventDefault();
    ask(question);
  }
  return (
    <aside
      className={v.chat}
      role="dialog"
      aria-label="Ask Crabionics"
      onKeyDown={(event) => {
        if (event.key === "Escape") close();
      }}
    >
      <div className={v.chatTop}>
        <strong>Ask Crabionics</strong>
        <button aria-label="Close assistant" onClick={close}>
          ×
        </button>
      </div>
      <div className={v.chatBody}>
        <p>
          Quick answers from approved website content. No live operator or farm
          diagnosis. Your questions stay in this browser session.
        </p>
        <div className={v.suggestions}>
          {assistantAnswers.slice(0, 4).map((answer) => (
            <button onClick={() => ask(answer.question)} key={answer.id}>
              {answer.question} ↗
            </button>
          ))}
        </div>
        <div aria-live="polite" aria-relevant="additions">
          {answers.map((answer, i) => (
            <div className={v.chatAnswer} key={i}>
              <strong>{answer.question}</strong>
              <p>{answer.answer}</p>
              {answer.links.map(([label, href]) => (
                <Link key={href} href={href} onClick={close}>
                  {label} →
                </Link>
              ))}
            </div>
          ))}
        </div>
        <div ref={end} />
      </div>
      <form className={v.chatForm} onSubmit={submit}>
        <label className="sr-only" htmlFor="assistant-question">
          Your question
        </label>
        <input
          id="assistant-question"
          ref={input}
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          maxLength={250}
          placeholder="Ask about Crabionics…"
        />
        <button type="submit" aria-label="Ask question">
          Ask
        </button>
      </form>
    </aside>
  );
}
