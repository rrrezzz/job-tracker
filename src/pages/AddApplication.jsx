import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAppContext } from "../context/ApplicationContext";
import { STATUS_OPTIONS, PLATFORM_OPTIONS, LOCATION_OPTIONS } from "../utils/helpers";

const schema = yup.object({
  company: yup.string().required("Company name is required"),
  role: yup.string().required("Role is required"),
  appliedDate: yup.string().required("Applied date is required"),
  location: yup.string().required(),
  salary: yup.number().typeError("Must be a number").min(0).optional(),
  platform: yup.string().required(),
  status: yup.string().required(),
  interviewDate: yup.string().optional(),
  notes: yup.string().optional(),
});

const inputCls =
  "w-full bg-zinc-800 border border-white/5 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-green-500/40 transition-colors";

function Field({ label, error, children }) {
  return (
    <div>
      <label className="block text-xs font-medium text-zinc-400 mb-1">{label}</label>
      {children}
      {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
    </div>
  );
}

export default function AddApplication() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { applications, addApplication, updateApplication } = useAppContext();

  const isEditing = Boolean(id);
  const existing = isEditing ? applications.find((a) => a.id === id) : null;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      company: "",
      role: "",
      location: "Remote",
      salary: "",
      platform: "LinkedIn",
      status: "Applied",
      appliedDate: new Date().toISOString().split("T")[0],
      interviewDate: "",
      notes: "",
    },
  });

  useEffect(() => {
    if (existing) reset(existing);
  }, [existing, reset]);

  const onSubmit = (data) => {
    if (isEditing) {
      updateApplication(id, data);
    } else {
      addApplication(data);
    }
    navigate("/applications");
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">
          {isEditing ? "Edit Application" : "Add Application"}
        </h1>
        <p className="text-zinc-500 text-sm mt-1">
          {isEditing ? "Update the details below." : "Track a new job you applied for."}
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-zinc-900 border border-white/5 rounded-xl p-6 space-y-4"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Company Name *" error={errors.company?.message}>
            <input {...register("company")} placeholder="e.g. Google" className={inputCls} />
          </Field>

          <Field label="Job Role *" error={errors.role?.message}>
            <input {...register("role")} placeholder="e.g. Frontend Engineer" className={inputCls} />
          </Field>

          <Field label="Location" error={errors.location?.message}>
            <select {...register("location")} className={inputCls}>
              {LOCATION_OPTIONS.map((o) => <option key={o}>{o}</option>)}
            </select>
          </Field>

          <Field label="Salary (Annual)" error={errors.salary?.message}>
            <input {...register("salary")} type="number" placeholder="e.g. 120000" className={inputCls} />
          </Field>

          <Field label="Platform" error={errors.platform?.message}>
            <select {...register("platform")} className={inputCls}>
              {PLATFORM_OPTIONS.map((o) => <option key={o}>{o}</option>)}
            </select>
          </Field>

          <Field label="Status" error={errors.status?.message}>
            <select {...register("status")} className={inputCls}>
              {STATUS_OPTIONS.map((o) => <option key={o}>{o}</option>)}
            </select>
          </Field>

          <Field label="Applied Date *" error={errors.appliedDate?.message}>
            <input {...register("appliedDate")} type="date" className={inputCls} />
          </Field>

          <Field label="Interview Date" error={errors.interviewDate?.message}>
            <input {...register("interviewDate")} type="date" className={inputCls} />
          </Field>
        </div>

        <Field label="Notes">
          <textarea
            {...register("notes")}
            rows={3}
            placeholder="Any notes about this application..."
            className={inputCls}
          />
        </Field>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="px-5 py-2.5 rounded-lg bg-green-500 hover:bg-green-600 text-white text-sm font-semibold transition-colors"
          >
            {isEditing ? "Save Changes" : "Add Application"}
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-5 py-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm font-medium transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}