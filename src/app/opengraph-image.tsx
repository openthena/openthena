import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "OpenThena — the open-source, privacy-first AI assistant.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
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
          background:
            "radial-gradient(120% 120% at 50% 0%, #0b2846 0%, #04101f 60%)",
          color: "#f5f6f6",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            marginBottom: 40,
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 18,
              background: "linear-gradient(135deg, #38e1d6, #3b82f6)",
            }}
          />
          <div style={{ fontSize: 40, fontWeight: 700, letterSpacing: -1 }}>
            OpenThena
          </div>
        </div>
        <div
          style={{
            fontSize: 78,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: -2,
            maxWidth: 900,
          }}
        >
          AI that answers you,
          <br />
          <span style={{ color: "#38e1d6" }}>not about you.</span>
        </div>
        <div
          style={{
            marginTop: 36,
            fontSize: 30,
            color: "rgba(245,246,246,0.6)",
            maxWidth: 860,
          }}
        >
          Open-source · Privacy-first · No accounts, no tracking, no stored chats.
        </div>
      </div>
    ),
    { ...size },
  );
}
