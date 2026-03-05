"use client";

import { useState, useRef, useEffect, useCallback } from "react";

const MODELS = [
  { value: "AceStep_1_5_Turbo", label: "AceStep Turbo (Fast)", defaultSteps: 8 },
  { value: "AceStep_1_5_Base", label: "AceStep Base (Quality)", defaultSteps: 32 },
];

const FORMATS = ["flac", "mp3", "wav"];

const TIME_SIGNATURES = [
  { value: "", label: "Auto" },
  { value: "2", label: "2/4" },
  { value: "3", label: "3/4" },
  { value: "4", label: "4/4" },
  { value: "6", label: "6/8" },
];

type Status = "idle" | "submitting" | "polling" | "completed" | "failed";

interface HistoryItem {
  caption: string;
  resultUrl: string;
  cost: number | null;
  model: string;
  duration: number;
  timestamp: string;
}

export default function Home() {
  // API key
  const [apiKey, setApiKey] = useState("");
  const [showSettings, setShowSettings] = useState(false);

  // Form fields
  const [caption, setCaption] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [model, setModel] = useState("AceStep_1_5_Turbo");
  const [duration, setDuration] = useState(30);
  const [bpm, setBpm] = useState("");
  const [keyscale, setKeyscale] = useState("");
  const [timesignature, setTimesignature] = useState("");
  const [vocalLanguage, setVocalLanguage] = useState("en");
  const [inferenceSteps, setInferenceSteps] = useState(8);
  const [guidanceScale, setGuidanceScale] = useState(7.0);
  const [seed, setSeed] = useState("");
  const [format, setFormat] = useState("flac");
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Generation state
  const [status, setStatus] = useState<Status>("idle");
  const [progress, setProgress] = useState(0);
  const [resultUrl, setResultUrl] = useState("");
  const [error, setError] = useState("");
  const [costCredits, setCostCredits] = useState<number | null>(null);
  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // History (session only)
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // Load API key from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("deapi-music-key");
    if (saved) {
      setApiKey(saved);
    } else {
      setShowSettings(true);
    }
  }, []);

  const saveApiKey = (key: string) => {
    setApiKey(key);
    localStorage.setItem("deapi-music-key", key);
  };

  // Auto-update inference steps when model changes
  const handleModelChange = (newModel: string) => {
    setModel(newModel);
    const m = MODELS.find((x) => x.value === newModel);
    if (m) setInferenceSteps(m.defaultSteps);
  };

  // Cleanup polling on unmount
  useEffect(() => {
    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current);
    };
  }, []);

  const stopPolling = useCallback(() => {
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
  }, []);

  // Poll job status
  const startPolling = useCallback(
    (requestId: string) => {
      setStatus("polling");
      setProgress(0);
      let attempts = 0;
      const maxAttempts = 200;

      pollingRef.current = setInterval(async () => {
        attempts++;
        if (attempts > maxAttempts) {
          stopPolling();
          setError("Generation timed out. Check your deAPI dashboard.");
          setStatus("failed");
          return;
        }

        try {
          const res = await fetch(`/api/status/${requestId}`, {
            headers: { "x-api-key": apiKey },
          });
          const json = await res.json();
          const data = json.data || json;

          if (data.progress != null) setProgress(data.progress);
          if (data.cost_credits != null) setCostCredits(data.cost_credits);

          if (data.status === "done") {
            stopPolling();
            setResultUrl(data.result_url);
            setStatus("completed");
            setHistory((prev) => [
              {
                caption,
                resultUrl: data.result_url,
                cost: data.cost_credits ?? costCredits,
                model,
                duration,
                timestamp: new Date().toLocaleTimeString(),
              },
              ...prev,
            ]);
          } else if (data.status === "error") {
            stopPolling();
            setError(data.error || "Generation failed");
            setStatus("failed");
          }
        } catch {
          stopPolling();
          setError("Failed to check generation status");
          setStatus("failed");
        }
      }, 3000);
    },
    [apiKey, caption, model, duration, costCredits, stopPolling]
  );

  // Submit generation request
  const handleGenerate = async () => {
    if (!apiKey.trim()) {
      setError("Please enter your API key first");
      setShowSettings(true);
      return;
    }
    if (!caption.trim()) {
      setError("Caption is required");
      return;
    }

    stopPolling();
    setStatus("submitting");
    setError("");
    setResultUrl("");
    setCostCredits(null);
    setProgress(0);

    const body: Record<string, unknown> = {
      caption: caption.trim(),
      model,
      duration,
      inference_steps: inferenceSteps,
      guidance_scale: guidanceScale,
      format,
    };

    if (lyrics.trim()) body.lyrics = lyrics.trim();
    if (bpm) body.bpm = Number(bpm);
    if (keyscale.trim()) body.keyscale = keyscale.trim();
    if (timesignature) body.timesignature = Number(timesignature);
    if (vocalLanguage.trim()) body.vocal_language = vocalLanguage.trim();
    if (seed) body.seed = Number(seed);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
        body: JSON.stringify(body),
      });

      const json = await res.json();

      if (!res.ok) {
        const msg =
          json.error ||
          json.detail ||
          json.message ||
          `API error ${res.status}`;
        setError(typeof msg === "string" ? msg : JSON.stringify(msg));
        setStatus("failed");
        return;
      }

      const requestId = json.data?.request_id;
      if (!requestId) {
        setError("No request ID returned from API");
        setStatus("failed");
        return;
      }

      if (json.data?.cost_credits) setCostCredits(json.data.cost_credits);
      startPolling(requestId);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Request failed");
      setStatus("failed");
    }
  };

  const isGenerating = status === "submitting" || status === "polling";

  const handleCancel = () => {
    stopPolling();
    setStatus("idle");
    setError("");
    setProgress(0);
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Header */}
      <header className="border-b border-zinc-800/60 bg-zinc-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-zinc-100 flex items-center gap-2">
            <span className="text-2xl">&#9835;</span> Music Generator
          </h1>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors px-3 py-1 rounded hover:bg-zinc-800"
          >
            {showSettings ? "Hide Key" : "API Key"}
          </button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-4">
        {/* API Key Settings */}
        {showSettings && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 animate-in">
            <label className="text-xs font-medium text-zinc-400 block mb-1.5">
              deAPI Key
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => saveApiKey(e.target.value)}
              placeholder="sk-..."
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-colors"
            />
            <p className="text-xs text-zinc-500 mt-1.5">
              Stored locally in your browser. Get your key at{" "}
              <a
                href="https://deapi.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 hover:text-indigo-300"
              >
                deapi.ai
              </a>
            </p>
          </div>
        )}

        {/* Main Form */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-4">
          {/* Caption */}
          <div>
            <label className="text-xs font-medium text-zinc-400 block mb-1.5">
              Caption <span className="text-red-400">*</span>
            </label>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Describe the style and mood: upbeat electronic dance music with energetic synths and punchy drums..."
              rows={3}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-colors resize-y"
            />
          </div>

          {/* Lyrics */}
          <div>
            <label className="text-xs font-medium text-zinc-400 block mb-1.5">
              Lyrics{" "}
              <span className="text-zinc-500 font-normal">
                (leave empty for instrumental)
              </span>
            </label>
            <textarea
              value={lyrics}
              onChange={(e) => setLyrics(e.target.value)}
              placeholder="[Verse 1]&#10;Write your lyrics here...&#10;&#10;[Chorus]&#10;..."
              rows={3}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-colors resize-y"
            />
          </div>

          {/* Row 1: Model, Duration, Format */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-medium text-zinc-400 block mb-1.5">
                Model
              </label>
              <select
                value={model}
                onChange={(e) => handleModelChange(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-colors"
              >
                {MODELS.map((m) => (
                  <option key={m.value} value={m.value}>
                    {m.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-zinc-400 block mb-1.5">
                Duration (sec)
              </label>
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                min={10}
                max={600}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-colors"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-zinc-400 block mb-1.5">
                Format
              </label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-colors"
              >
                {FORMATS.map((f) => (
                  <option key={f} value={f}>
                    {f.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 2: BPM, Key, Time Signature */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-medium text-zinc-400 block mb-1.5">
                BPM
              </label>
              <input
                type="number"
                value={bpm}
                onChange={(e) => setBpm(e.target.value)}
                min={30}
                max={300}
                placeholder="Auto"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-colors"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-zinc-400 block mb-1.5">
                Key / Scale
              </label>
              <input
                type="text"
                value={keyscale}
                onChange={(e) => setKeyscale(e.target.value)}
                placeholder="e.g. C major"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-colors"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-zinc-400 block mb-1.5">
                Time Signature
              </label>
              <select
                value={timesignature}
                onChange={(e) => setTimesignature(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-colors"
              >
                {TIME_SIGNATURES.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Advanced Settings */}
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1"
          >
            <span
              className="inline-block transition-transform"
              style={{
                transform: showAdvanced ? "rotate(90deg)" : "rotate(0deg)",
              }}
            >
              &#9654;
            </span>
            Advanced Settings
          </button>

          {showAdvanced && (
            <div className="grid grid-cols-4 gap-3">
              <div>
                <label className="text-xs font-medium text-zinc-400 block mb-1.5">
                  Steps
                </label>
                <input
                  type="number"
                  value={inferenceSteps}
                  onChange={(e) => setInferenceSteps(Number(e.target.value))}
                  min={1}
                  max={100}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-colors"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-zinc-400 block mb-1.5">
                  Guidance
                </label>
                <input
                  type="number"
                  value={guidanceScale}
                  onChange={(e) => setGuidanceScale(Number(e.target.value))}
                  min={0}
                  max={20}
                  step={0.5}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-colors"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-zinc-400 block mb-1.5">
                  Seed
                </label>
                <input
                  type="number"
                  value={seed}
                  onChange={(e) => setSeed(e.target.value)}
                  placeholder="Random"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-colors"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-zinc-400 block mb-1.5">
                  Vocal Lang
                </label>
                <input
                  type="text"
                  value={vocalLanguage}
                  onChange={(e) => setVocalLanguage(e.target.value)}
                  placeholder="en"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-colors"
                />
              </div>
            </div>
          )}

          {/* Generate / Cancel Buttons */}
          <div className="flex gap-3 pt-1">
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-zinc-700 disabled:text-zinc-500 rounded-lg font-medium text-sm transition-colors cursor-pointer disabled:cursor-not-allowed"
            >
              {status === "submitting"
                ? "Sending..."
                : status === "polling"
                  ? `Generating... ${progress}%`
                  : "Generate Music"}
            </button>
            {isGenerating && (
              <button
                onClick={handleCancel}
                className="px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-lg text-sm text-zinc-300 transition-colors cursor-pointer"
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        {status === "polling" && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
            <div className="flex justify-between text-xs text-zinc-400 mb-2">
              <span className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
                Generating your track...
              </span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-indigo-500 h-full rounded-full transition-all duration-700 ease-out"
                style={{ width: `${Math.max(progress, 2)}%` }}
              />
            </div>
            {costCredits != null && (
              <div className="text-xs text-zinc-500 mt-2">
                Cost: {costCredits} credits
              </div>
            )}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-950/40 border border-red-900/50 rounded-xl p-4 flex items-start gap-3">
            <span className="text-red-400 mt-0.5 shrink-0">&#10006;</span>
            <div>
              <p className="text-sm text-red-300">{error}</p>
              <button
                onClick={() => setError("")}
                className="text-xs text-red-400/60 hover:text-red-300 mt-1 transition-colors"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        {/* Current Result */}
        {status === "completed" && resultUrl && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-medium text-zinc-100 flex items-center gap-2">
                <span className="text-green-400">&#10003;</span> Generation
                Complete
              </h2>
              {costCredits != null && (
                <span className="text-xs text-zinc-400 bg-zinc-800 px-2 py-1 rounded">
                  {costCredits} credits
                </span>
              )}
            </div>
            <audio src={resultUrl} controls className="w-full" />
            <div className="flex gap-3">
              <a
                href={resultUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                Open in new tab
              </a>
              <a
                href={resultUrl}
                download
                className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                Download
              </a>
            </div>
          </div>
        )}

        {/* Session History */}
        {history.length > 1 && (
          <div className="space-y-3">
            <h3 className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
              Previous Generations
            </h3>
            {history.slice(1).map((item, i) => (
              <div
                key={i}
                className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-4 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm text-zinc-300 truncate max-w-md">
                    {item.caption}
                  </p>
                  <span className="text-xs text-zinc-500 shrink-0 ml-2">
                    {item.timestamp}
                  </span>
                </div>
                <audio src={item.resultUrl} controls className="w-full" />
                <div className="flex gap-4 text-xs text-zinc-500">
                  <span>
                    {MODELS.find((m) => m.value === item.model)?.label ??
                      item.model}
                  </span>
                  <span>{item.duration}s</span>
                  {item.cost != null && <span>{item.cost} credits</span>}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
