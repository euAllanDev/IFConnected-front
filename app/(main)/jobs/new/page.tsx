import CreateJobForm from "@/features/jobs/CreateJobForm";

export default function NewJobPage() {
  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-white mb-6">Nova Vaga</h1>
      <CreateJobForm />
    </div>
  );
}