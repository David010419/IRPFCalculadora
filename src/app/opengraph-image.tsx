import { ImageResponse } from "next/og";

export const alt = "Calculadora de IRPF 2025";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #1d4ed8 0%, #1e293b 100%)",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 96,
            height: 96,
            borderRadius: 24,
            background: "rgba(255,255,255,0.15)",
            color: "#ffffff",
            fontSize: 52,
            fontWeight: 700,
            marginBottom: 40,
          }}
        >
          €
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 64,
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.15,
          }}
        >
          Calculadora de IRPF 2025
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 30,
            color: "#dbeafe",
            maxWidth: 900,
          }}
        >
          Calcula tu IRPF y retenciones de forma rápida y precisa para España
        </div>
      </div>
    ),
    { ...size }
  );
}
