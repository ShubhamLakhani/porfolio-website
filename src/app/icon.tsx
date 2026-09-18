import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#F5F2EA",
          color: "#202421",
          fontSize: 18,
          fontWeight: 700,
          letterSpacing: "-0.12em",
          fontFamily: "Georgia, serif",
        }}
      >
        sl.
      </div>
    ),
    size,
  );
}
