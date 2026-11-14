import { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import {
  Award,
  Upload,
  Trash2,
  ImageIcon,
  Plus,
} from "lucide-react";

const Card = ({ children, className = "" }) => (
  <div className={`relative group ${className}`}>
    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-2xl blur opacity-10 group-hover:opacity-25 transition duration-500" />

    <div className="relative bg-white/5 backdrop-blur-xl border border-white/12 rounded-2xl h-full">
      {children}
    </div>
  </div>
);

const SkeletonCard = () => (
  <div className="relative">
    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-2xl blur opacity-10" />

    <div className="relative bg-white/5 border border-white/12 rounded-2xl overflow-hidden">
      <div className="w-full aspect-[16/11.5] bg-white/5 animate-pulse" />
    </div>
  </div>
);

const CertCard = ({ cert, onDelete }) => {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-2xl blur opacity-10 group-hover:opacity-30 transition duration-500" />

      <div className="relative bg-white/5 border border-white/12 rounded-2xl overflow-hidden">
        {!imgLoaded && (
          <div className="w-full aspect-[16/11.5] bg-white/5 animate-pulse" />
        )}

        <img
          src={cert.Img}
          alt={cert.title || "Certificate"}
          onLoad={() => setImgLoaded(true)}
          className={`w-full aspect-[16/11.5] object-cover group-hover:scale-105 transition-transform duration-500 ${
            imgLoaded ? "block" : "hidden"
          }`}
        />

        {imgLoaded && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
            <button
              onClick={() => onDelete(cert.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/20 border border-red-500/30 text-red-300 text-xs w-full justify-center hover:bg-red-500/30 transition-colors"
            >
              <Trash2 className="w-3 h-3" />
              Delete
            </button>
          </div>
        )}
      </div>

      {/* Certificate Information */}
      <div className="pt-3 px-1">
        <h3 className="text-sm font-semibold text-white line-clamp-2">
          {cert.title || "Certificate"}
        </h3>

        {cert.issuer && (
          <p className="text-xs text-gray-400 mt-1 line-clamp-1">
            {cert.issuer}
          </p>
        )}

        {cert.year && (
          <p className="text-xs text-indigo-400 mt-1">
            {cert.year}
          </p>
        )}
      </div>
    </div>
  );
};

export default function Certificates() {
  const [certs, setCerts] = useState([]);

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const [title, setTitle] = useState("");
  const [issuer, setIssuer] = useState("");
  const [year, setYear] = useState("");

  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchCerts = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("certificates")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Certificate fetch error:", error);
    }

    setCerts(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchCerts();
  }, []);

  const handleFile = (f) => {
    if (!f) return;

    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const clearForm = () => {
    setFile(null);
    setPreview(null);
    setTitle("");
    setIssuer("");
    setYear("");
  };

  const uploadImage = async () => {
    if (!file) {
      alert("Please select a certificate image.");
      return;
    }

    if (!title.trim()) {
      alert("Please enter the certificate name.");
      return;
    }

    if (!issuer.trim()) {
      alert("Please enter the issuing organization.");
      return;
    }

    if (!year) {
      alert("Please enter the certificate year.");
      return;
    }

    setUploading(true);

    try {
      const fileName = `cert-${Date.now()}-${file.name}`;

      const { error: uploadError } = await supabase.storage
        .from("certificate-images")
        .upload(fileName, file);

      if (uploadError) {
        console.error("Image upload error:", uploadError);
        alert("Image upload failed.");
        return;
      }

      const { data: publicData } = supabase.storage
        .from("certificate-images")
        .getPublicUrl(fileName);

      const { error: insertError } = await supabase
        .from("certificates")
        .insert({
          Img: publicData.publicUrl,
          title: title.trim(),
          issuer: issuer.trim(),
          year: Number(year),
        });

      if (insertError) {
        console.error("Certificate insert error:", insertError);
        alert("Certificate information could not be saved.");
        return;
      }

      clearForm();
      await fetchCerts();
    } catch (error) {
      console.error("Unexpected certificate error:", error);
      alert("Something went wrong while uploading.");
    } finally {
      setUploading(false);
    }
  };

  const deleteCert = async (id) => {
    if (!confirm("Delete this certificate?")) return;

    const { error } = await supabase
      .from("certificates")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Delete certificate error:", error);
      alert("Could not delete certificate.");
      return;
    }

    fetchCerts();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-xl blur opacity-50" />

          <div className="relative w-9 h-9 bg-[#030014] rounded-xl border border-white/15 flex items-center justify-center">
            <Award className="w-4 h-4 text-indigo-400" />
          </div>
        </div>

        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white">
            Certificates
          </h1>

          <p className="text-gray-500 text-xs">
            {loading
              ? "Loading..."
              : `${certs.length} certificates total`}
          </p>
        </div>
      </div>

      {/* Upload Card */}
      <Card>
        <div className="p-5 sm:p-6 space-y-5">
          <h2 className="text-sm font-semibold text-white flex items-center gap-2">
            <Plus className="w-4 h-4 text-indigo-400" />
            Upload Certificate
          </h2>

          {/* Certificate Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-400 mb-1.5">
                Certificate Name
              </label>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Bloomberg Finance Fundamentals"
                className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-gray-600 outline-none focus:border-indigo-500/50 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-1.5">
                Issuing Organization
              </label>

              <input
                type="text"
                value={issuer}
                onChange={(e) => setIssuer(e.target.value)}
                placeholder="e.g. Bloomberg for Education"
                className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-gray-600 outline-none focus:border-indigo-500/50 transition-colors"
              />
            </div>

            <div className="sm:w-40">
              <label className="block text-xs text-gray-400 mb-1.5">
                Year
              </label>

              <input
                type="number"
                min="2000"
                max="2100"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="2026"
                className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-gray-600 outline-none focus:border-indigo-500/50 transition-colors"
              />
            </div>
          </div>

          {/* Image Upload */}
          <label
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              handleFile(e.dataTransfer.files[0]);
            }}
            className={`flex flex-col items-center justify-center w-full min-h-[160px] rounded-xl border-2 border-dashed cursor-pointer transition-all duration-300 ${
              dragOver
                ? "border-indigo-400/60 bg-indigo-500/10"
                : "border-white/12 bg-white/4 hover:border-indigo-500/35 hover:bg-white/7"
            }`}
          >
            {preview ? (
              <img
                src={preview}
                alt="preview"
                className="max-h-40 object-contain rounded-lg p-2"
              />
            ) : (
              <div className="text-center space-y-2 p-6">
                <div className="w-11 h-11 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto">
                  <ImageIcon className="w-5 h-5 text-indigo-400" />
                </div>

                <p className="text-sm text-gray-300">
                  Drag & drop or click to upload
                </p>

                <p className="text-xs text-gray-600">
                  PNG, JPG, WEBP supported
                </p>
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFile(e.target.files[0])}
              className="hidden"
            />
          </label>

          {/* Selected File */}
          {file && (
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <p className="text-xs text-gray-400 truncate flex-1">
                {file.name}
              </p>

              <div className="flex gap-2 shrink-0">
                <button
                  onClick={clearForm}
                  className="px-3 py-1.5 rounded-xl border border-white/10 text-gray-500 hover:text-white text-xs transition-colors"
                >
                  Clear
                </button>

                <button
                  onClick={uploadImage}
                  disabled={uploading}
                  className="relative group/u"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#4f52c9] to-[#8644c5] rounded-xl opacity-60 blur group-hover/u:opacity-100 transition duration-300" />

                  <div className="relative flex items-center gap-2 px-4 py-1.5 bg-[#030014] rounded-xl border border-white/10">
                    {uploading ? (
                      <div className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    ) : (
                      <Upload className="w-3.5 h-3.5 text-indigo-400" />
                    )}

                    <span className="text-xs text-gray-200">
                      {uploading ? "Uploading..." : "Upload"}
                    </span>
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Certificate Grid */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : certs.length === 0 ? (
        <Card>
          <div className="p-16 text-center">
            <Award className="w-10 h-10 text-gray-700 mx-auto mb-3" />

            <p className="text-gray-500 text-sm">
              No certificates yet.
            </p>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
          {certs.map((cert) => (
            <CertCard
              key={cert.id}
              cert={cert}
              onDelete={deleteCert}
            />
          ))}
        </div>
      )}
    </div>
  );
}