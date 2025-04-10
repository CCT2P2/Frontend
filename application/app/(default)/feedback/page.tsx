import FeedbackForm from "@/components/forms/feedbackForm";

export default function FeedbackPage() {
  return (
    <div
      className={
        "font-inter flex flex-col items-center justify-center h-[calc(100vh-4rem)]"
      }
    >
      <FeedbackForm />
    </div>
  );
}
