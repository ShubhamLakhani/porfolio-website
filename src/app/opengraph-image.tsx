import { ImageResponse } from "next/og";

export const alt = "Shubham Lakhani | Senior Full-Stack Engineer";
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
          justifyContent: "space-between",
          background: "#F5F2EA",
          color: "#202421",
          padding: "72px 80px",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 28,
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: 700,
            letterSpacing: "-0.08em",
          }}
        >
          <div style={{ display: "flex" }}>sl.</div>
          <div
            style={{
              display: "flex",
              fontWeight: 500,
              letterSpacing: "0.02em",
              color: "#60645D",
              fontSize: 22,
            }}
          >
            Senior Full-Stack Engineer
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 42,
              fontFamily: "Helvetica, Arial, sans-serif",
              fontWeight: 600,
              letterSpacing: "-0.03em",
            }}
          >
            Shubham Lakhani
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "baseline",
              fontSize: 72,
              lineHeight: 1.05,
              letterSpacing: "-0.04em",
              fontWeight: 500,
              fontFamily: "Helvetica, Arial, sans-serif",
            }}
          >
            <div style={{ display: "flex" }}>From idea to&nbsp;</div>
            <div
              style={{
                display: "flex",
                color: "#B94322",
                fontStyle: "italic",
                fontFamily: "Georgia, serif",
              }}
            >
              production.
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
