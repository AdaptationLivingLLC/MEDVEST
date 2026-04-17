"use client";

import { useLocale } from "next-intl";
import { useMemo, useRef, useState } from "react";

// -----------------------------------------------------------------------------
// Copy
// -----------------------------------------------------------------------------

const labels = {
  en: {
    eyebrow: "Secure Patient Intake",
    title: "Start Your Case in 3 Minutes",
    subtitle:
      "Snap a photo of your ID and insurance card. We'll fill in the rest automatically.",
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    phone: "Phone",
    dob: "Date of Birth",
    address: "Street Address",
    city: "City",
    state: "State",
    postalCode: "ZIP",
    reason: "What brings you to Medvst?",
    license: "Driver's License / State ID",
    licenseHint: "Front of ID — we'll auto-fill your address and DOB",
    insuranceFront: "Insurance Card (Front)",
    insuranceFrontHint:
      "We'll auto-fill carrier, member ID, group, and RX info",
    insuranceBack: "Insurance Card (Back)",
    insuranceBackHint: "Optional, if there's info on the back",
    medicare: "Medicare Card",
    medicareHint: "If applicable — we'll extract your MBI and effective dates",
    medical: "Medical Records / Other Documents",
    medicalHint: "Optional — you can add more later from the mobile app",
    submit: "Submit Intake",
    submitting: "Uploading and processing…",
    analyzing: "Reading card…",
    scanSuccess: "Info extracted automatically.",
    scanFailed: "Could not read card — please type manually.",
    success: "Thank you. Your intake is received.",
    successDetail:
      "We've sent a confirmation to your email. You'll be contacted within one business day.",
    error: "Something went wrong. Please try again or call us directly.",
    required: "Required",
    optional: "Optional",
    dropOrClick: "Tap to upload or drag a file here",
    replaceFile: "Replace",
    consent:
      "By submitting, you consent to Medvst processing the information and documents you provide.",
  },
  es: {
    eyebrow: "Admisión Segura de Pacientes",
    title: "Inicie Su Caso en 3 Minutos",
    subtitle:
      "Tome una foto de su identificación y tarjeta de seguro. Llenamos el resto automáticamente.",
    firstName: "Nombre",
    lastName: "Apellido",
    email: "Correo Electrónico",
    phone: "Teléfono",
    dob: "Fecha de Nacimiento",
    address: "Dirección",
    city: "Ciudad",
    state: "Estado",
    postalCode: "Código Postal",
    reason: "¿Qué lo trae a Medvst?",
    license: "Licencia de Conducir / Identificación",
    licenseHint:
      "Frente de la identificación — llenamos su dirección y fecha de nacimiento",
    insuranceFront: "Tarjeta de Seguro (Frente)",
    insuranceFrontHint:
      "Llenamos la aseguradora, ID de miembro, grupo y datos de farmacia",
    insuranceBack: "Tarjeta de Seguro (Reverso)",
    insuranceBackHint: "Opcional, si hay información al reverso",
    medicare: "Tarjeta de Medicare",
    medicareHint:
      "Si aplica — extraemos su MBI y fechas de vigencia",
    medical: "Registros Médicos / Otros Documentos",
    medicalHint:
      "Opcional — puede agregar más luego desde la aplicación móvil",
    submit: "Enviar Admisión",
    submitting: "Subiendo y procesando…",
    analyzing: "Leyendo tarjeta…",
    scanSuccess: "Información extraída automáticamente.",
    scanFailed: "No se pudo leer — por favor escriba manualmente.",
    success: "Gracias. Su admisión fue recibida.",
    successDetail:
      "Hemos enviado una confirmación a su correo. Lo contactaremos dentro de un día hábil.",
    error: "Algo salió mal. Inténtelo de nuevo o llámenos directamente.",
    required: "Requerido",
    optional: "Opcional",
    dropOrClick: "Toque para subir o arrastre un archivo aquí",
    replaceFile: "Reemplazar",
    consent:
      "Al enviar, usted da su consentimiento para que Medvst procese la información y los documentos proporcionados.",
  },
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

type ScanStatus = "idle" | "analyzing" | "success" | "failed";

type FieldState = {
  file: File | null;
  status: ScanStatus;
};

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
  address1: string;
  city: string;
  state: string;
  postalCode: string;
  reason: string;
};

const EMPTY_FORM: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  dob: "",
  address1: "",
  city: "",
  state: "",
  postalCode: "",
  reason: "",
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export default function IntakeForm({
  variant = "full",
}: {
  variant?: "full" | "hero";
}) {
  const locale = useLocale();
  const isEs = locale === "es";
  const l = isEs ? labels.es : labels.en;

  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [licenseField, setLicenseField] = useState<FieldState>({
    file: null,
    status: "idle",
  });
  const [insuranceFront, setInsuranceFront] = useState<FieldState>({
    file: null,
    status: "idle",
  });
  const [insuranceBack, setInsuranceBack] = useState<FieldState>({
    file: null,
    status: "idle",
  });
  const [medicare, setMedicare] = useState<FieldState>({
    file: null,
    status: "idle",
  });
  const [medicalRecords, setMedicalRecords] = useState<File[]>([]);

  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);

  const formRef = useRef<HTMLFormElement>(null);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function scanLicense(file: File) {
    setLicenseField({ file, status: "analyzing" });
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/ocr/id", { method: "POST", body: fd });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.success) {
        setLicenseField({ file, status: "failed" });
        return;
      }
      const fields = data.fields || {};
      setForm((f) => ({
        ...f,
        firstName: f.firstName || fields.firstName || "",
        lastName: f.lastName || fields.lastName || "",
        dob: f.dob || fields.dob || "",
        address1: f.address1 || fields.address || "",
        city: f.city || fields.city || "",
        state: f.state || fields.state || "",
        postalCode: f.postalCode || fields.postalCode || "",
      }));
      setLicenseField({ file, status: "success" });
    } catch {
      setLicenseField({ file, status: "failed" });
    }
  }

  async function scanInsurance(
    file: File,
    setter: (v: FieldState) => void,
    isFront: boolean
  ) {
    setter({ file, status: "analyzing" });
    if (!isFront) {
      // Back of card rarely has OCR value; skip to save an API call
      setter({ file, status: "success" });
      return;
    }
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/ocr/insurance", {
        method: "POST",
        body: fd,
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.success) {
        setter({ file, status: "failed" });
        return;
      }
      setter({ file, status: "success" });
    } catch {
      setter({ file, status: "failed" });
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitError(null);

    if (!form.firstName.trim() || !form.lastName.trim()) {
      setSubmitError(l.error);
      setSubmitStatus("error");
      return;
    }
    if (!EMAIL_RE.test(form.email)) {
      setSubmitError(l.error);
      setSubmitStatus("error");
      return;
    }
    if (!licenseField.file) {
      setSubmitError(l.error);
      setSubmitStatus("error");
      return;
    }

    setSubmitStatus("submitting");

    const fd = new FormData();
    fd.append("firstName", form.firstName);
    fd.append("lastName", form.lastName);
    fd.append("email", form.email);
    fd.append("phone", form.phone);
    fd.append("dob", form.dob);
    fd.append("address1", form.address1);
    fd.append("city", form.city);
    fd.append("state", form.state);
    fd.append("postalCode", form.postalCode);
    fd.append("reason", form.reason);
    fd.append("locale", locale);
    fd.append("website", ""); // honeypot
    if (licenseField.file) fd.append("license", licenseField.file);
    if (insuranceFront.file) fd.append("insuranceFront", insuranceFront.file);
    if (insuranceBack.file) fd.append("insuranceBack", insuranceBack.file);
    if (medicare.file) fd.append("medicare", medicare.file);
    for (const m of medicalRecords) fd.append("medicalRecords", m);

    try {
      const res = await fetch("/api/intake", { method: "POST", body: fd });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.success) {
        setSubmitError(data?.error || l.error);
        setSubmitStatus("error");
        return;
      }
      setSubmitStatus("success");
      formRef.current?.reset();
      setForm(EMPTY_FORM);
      setLicenseField({ file: null, status: "idle" });
      setInsuranceFront({ file: null, status: "idle" });
      setInsuranceBack({ file: null, status: "idle" });
      setMedicare({ file: null, status: "idle" });
      setMedicalRecords([]);
    } catch {
      setSubmitError(l.error);
      setSubmitStatus("error");
    }
  }

  const containerClass = useMemo(
    () =>
      variant === "hero"
        ? "bg-white border border-cream-400 rounded-card-lg shadow-card p-5 sm:p-6"
        : "bg-white border border-cream-400 rounded-card-lg shadow-card p-6 sm:p-8 lg:p-10",
    [variant]
  );

  if (submitStatus === "success") {
    return (
      <div className={containerClass} role="status">
        <div className="text-center py-4">
          <div className="w-14 h-14 mx-auto bg-success/10 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-7 h-7 text-success"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="font-display text-brown-900 text-xl lg:text-2xl font-semibold mb-2">
            {l.success}
          </h3>
          <p className="text-brown-400 text-sm lg:text-base leading-relaxed max-w-md mx-auto">
            {l.successDetail}
          </p>
        </div>
      </div>
    );
  }

  const inputCls =
    "w-full px-3 py-2.5 bg-white border border-cream-400 rounded-card text-brown-900 placeholder:text-brown-300 focus:outline-none focus:ring-2 focus:ring-copper focus:border-copper transition-colors text-sm";

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className={containerClass}
      noValidate
    >
      <div className="mb-5">
        <p className="text-[11px] font-semibold tracking-[2.5px] uppercase text-copper mb-2">
          {l.eyebrow}
        </p>
        <h2 className="font-display text-brown-900 text-xl lg:text-2xl font-semibold leading-tight">
          {l.title}
        </h2>
        <p className="text-brown-400 text-sm mt-2 leading-relaxed">
          {l.subtitle}
        </p>
      </div>

      {/* Honeypot */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", top: "-9999px" }}
      >
        <label htmlFor="website-hp">Website</label>
        <input
          id="website-hp"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* File: Driver's License (required, triggers OCR that fills fields) */}
      <FileField
        label={`${l.license} *`}
        hint={l.licenseHint}
        state={licenseField}
        onFile={(f) => scanLicense(f)}
        onClear={() =>
          setLicenseField({ file: null, status: "idle" })
        }
        scanLabels={{
          analyzing: l.analyzing,
          success: l.scanSuccess,
          failed: l.scanFailed,
          dropOrClick: l.dropOrClick,
          replaceFile: l.replaceFile,
        }}
      />

      {/* Personal details */}
      <div className="grid sm:grid-cols-2 gap-3 mt-5">
        <Field label={`${l.firstName} *`}>
          <input
            className={inputCls}
            value={form.firstName}
            onChange={(e) => update("firstName", e.target.value)}
            required
            maxLength={60}
            autoComplete="given-name"
          />
        </Field>
        <Field label={`${l.lastName} *`}>
          <input
            className={inputCls}
            value={form.lastName}
            onChange={(e) => update("lastName", e.target.value)}
            required
            maxLength={60}
            autoComplete="family-name"
          />
        </Field>
        <Field label={`${l.email} *`}>
          <input
            className={inputCls}
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            required
            maxLength={254}
            autoComplete="email"
          />
        </Field>
        <Field label={l.phone}>
          <input
            className={inputCls}
            type="tel"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            maxLength={32}
            autoComplete="tel"
          />
        </Field>
        <Field label={l.dob}>
          <input
            className={inputCls}
            type="text"
            placeholder="MM/DD/YYYY"
            value={form.dob}
            onChange={(e) => update("dob", e.target.value)}
            maxLength={20}
            autoComplete="bday"
          />
        </Field>
        <Field label={l.postalCode}>
          <input
            className={inputCls}
            value={form.postalCode}
            onChange={(e) => update("postalCode", e.target.value)}
            maxLength={10}
            autoComplete="postal-code"
          />
        </Field>
        <div className="sm:col-span-2">
          <Field label={l.address}>
            <input
              className={inputCls}
              value={form.address1}
              onChange={(e) => update("address1", e.target.value)}
              maxLength={120}
              autoComplete="address-line1"
            />
          </Field>
        </div>
        <Field label={l.city}>
          <input
            className={inputCls}
            value={form.city}
            onChange={(e) => update("city", e.target.value)}
            maxLength={60}
            autoComplete="address-level2"
          />
        </Field>
        <Field label={l.state}>
          <input
            className={inputCls}
            value={form.state}
            onChange={(e) => update("state", e.target.value.toUpperCase())}
            maxLength={4}
            autoComplete="address-level1"
          />
        </Field>
      </div>

      {/* Insurance + Medicare + Medical records */}
      <div className="mt-5 grid gap-3">
        <FileField
          label={l.insuranceFront}
          hint={l.insuranceFrontHint}
          state={insuranceFront}
          onFile={(f) => scanInsurance(f, setInsuranceFront, true)}
          onClear={() => setInsuranceFront({ file: null, status: "idle" })}
          scanLabels={{
            analyzing: l.analyzing,
            success: l.scanSuccess,
            failed: l.scanFailed,
            dropOrClick: l.dropOrClick,
            replaceFile: l.replaceFile,
          }}
        />
        <FileField
          label={l.insuranceBack}
          hint={l.insuranceBackHint}
          state={insuranceBack}
          onFile={(f) => scanInsurance(f, setInsuranceBack, false)}
          onClear={() => setInsuranceBack({ file: null, status: "idle" })}
          scanLabels={{
            analyzing: l.analyzing,
            success: l.scanSuccess,
            failed: l.scanFailed,
            dropOrClick: l.dropOrClick,
            replaceFile: l.replaceFile,
          }}
        />
        <FileField
          label={l.medicare}
          hint={l.medicareHint}
          state={medicare}
          onFile={(f) => scanInsurance(f, setMedicare, true)}
          onClear={() => setMedicare({ file: null, status: "idle" })}
          scanLabels={{
            analyzing: l.analyzing,
            success: l.scanSuccess,
            failed: l.scanFailed,
            dropOrClick: l.dropOrClick,
            replaceFile: l.replaceFile,
          }}
        />

        <MultiFileField
          label={l.medical}
          hint={l.medicalHint}
          files={medicalRecords}
          onFilesAdded={(list) =>
            setMedicalRecords((prev) => [...prev, ...list])
          }
          onRemove={(idx) =>
            setMedicalRecords((prev) => prev.filter((_, i) => i !== idx))
          }
          dropOrClickLabel={l.dropOrClick}
        />
      </div>

      <Field label={l.reason}>
        <textarea
          className={inputCls + " min-h-[88px] resize-y"}
          value={form.reason}
          onChange={(e) => update("reason", e.target.value)}
          maxLength={4000}
        />
      </Field>

      <p className="text-[11px] text-brown-300 mt-3 leading-relaxed">
        {l.consent}
      </p>

      <button
        type="submit"
        disabled={submitStatus === "submitting"}
        className="mt-4 w-full inline-flex items-center justify-center font-semibold rounded-button px-6 py-3.5 bg-brown-900 text-cream-100 hover:bg-brown-800 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitStatus === "submitting" ? l.submitting : l.submit}
      </button>

      {submitStatus === "error" && submitError && (
        <p
          role="alert"
          className="mt-3 text-red-700 bg-red-50 border border-red-200 rounded-card p-3 text-sm text-center"
        >
          {submitError}
        </p>
      )}
    </form>
  );
}

// -----------------------------------------------------------------------------
// Sub-components
// -----------------------------------------------------------------------------

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold text-brown-900 mb-1.5">
        {label}
      </span>
      {children}
    </label>
  );
}

function FileField({
  label,
  hint,
  state,
  onFile,
  onClear,
  scanLabels,
}: {
  label: string;
  hint: string;
  state: FieldState;
  onFile: (f: File) => void;
  onClear: () => void;
  scanLabels: {
    analyzing: string;
    success: string;
    failed: string;
    dropOrClick: string;
    replaceFile: string;
  };
}) {
  const inputId = useMemo(
    () => `ff-${label.replace(/\s+/g, "-").toLowerCase()}-${Math.random().toString(36).slice(2, 7)}`,
    [label]
  );

  const [dragging, setDragging] = useState(false);

  function handleFiles(files: FileList | null) {
    if (!files || !files.length) return;
    onFile(files[0]);
  }

  return (
    <div>
      <label
        htmlFor={inputId}
        className="block text-xs font-semibold text-brown-900 mb-1.5"
      >
        {label}
      </label>
      <div
        className={[
          "relative border-2 border-dashed rounded-card transition-colors text-center cursor-pointer px-4 py-4",
          dragging
            ? "border-copper bg-copper/5"
            : state.status === "success"
            ? "border-success/40 bg-success/5"
            : state.status === "failed"
            ? "border-red-300 bg-red-50"
            : "border-cream-400 bg-cream-50 hover:border-copper/60 hover:bg-copper/5",
        ].join(" ")}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
        onClick={() => {
          const el = document.getElementById(inputId) as HTMLInputElement | null;
          el?.click();
        }}
      >
        <input
          id={inputId}
          type="file"
          accept="image/*,application/pdf,.heic,.heif"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />

        {state.status === "analyzing" ? (
          <div className="flex items-center justify-center gap-2 text-brown-500 text-sm py-2">
            <svg
              className="w-4 h-4 animate-spin text-copper"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            {scanLabels.analyzing}
          </div>
        ) : state.file ? (
          <div className="flex items-center justify-between gap-3 text-left">
            <div className="flex items-center gap-2 min-w-0">
              <svg
                className={[
                  "w-5 h-5 flex-shrink-0",
                  state.status === "success" ? "text-success" : "text-brown-500",
                ].join(" ")}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <div className="min-w-0">
                <p className="truncate text-sm text-brown-900">
                  {state.file.name}
                </p>
                <p className="text-[11px] text-brown-400">
                  {state.status === "success"
                    ? scanLabels.success
                    : state.status === "failed"
                    ? scanLabels.failed
                    : ""}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onClear();
              }}
              className="text-xs font-semibold text-copper hover:text-copper-dark"
            >
              {scanLabels.replaceFile}
            </button>
          </div>
        ) : (
          <div className="py-1">
            <svg
              className="w-6 h-6 mx-auto text-brown-400 mb-1.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>
            <p className="text-sm text-brown-500">{scanLabels.dropOrClick}</p>
            <p className="text-[11px] text-brown-400 mt-1">{hint}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function MultiFileField({
  label,
  hint,
  files,
  onFilesAdded,
  onRemove,
  dropOrClickLabel,
}: {
  label: string;
  hint: string;
  files: File[];
  onFilesAdded: (list: File[]) => void;
  onRemove: (idx: number) => void;
  dropOrClickLabel: string;
}) {
  const inputId = useMemo(
    () => `mf-${Math.random().toString(36).slice(2, 7)}`,
    []
  );
  const [dragging, setDragging] = useState(false);

  function handleFiles(list: FileList | null) {
    if (!list) return;
    onFilesAdded(Array.from(list));
  }

  return (
    <div>
      <label
        htmlFor={inputId}
        className="block text-xs font-semibold text-brown-900 mb-1.5"
      >
        {label}
      </label>
      <div
        className={[
          "relative border-2 border-dashed rounded-card transition-colors text-center cursor-pointer px-4 py-4",
          dragging
            ? "border-copper bg-copper/5"
            : "border-cream-400 bg-cream-50 hover:border-copper/60 hover:bg-copper/5",
        ].join(" ")}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
        onClick={() => {
          const el = document.getElementById(inputId) as HTMLInputElement | null;
          el?.click();
        }}
      >
        <input
          id={inputId}
          type="file"
          multiple
          accept="image/*,application/pdf,.heic,.heif,.doc,.docx"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        <p className="text-sm text-brown-500">{dropOrClickLabel}</p>
        <p className="text-[11px] text-brown-400 mt-1">{hint}</p>
      </div>
      {files.length > 0 && (
        <ul className="mt-2 space-y-1">
          {files.map((f, i) => (
            <li
              key={`${f.name}-${i}`}
              className="flex items-center justify-between gap-3 bg-cream-50 border border-cream-300 rounded-card px-3 py-2 text-sm text-brown-900"
            >
              <span className="truncate">{f.name}</span>
              <button
                type="button"
                onClick={() => onRemove(i)}
                className="text-[11px] font-semibold text-copper hover:text-copper-dark"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
