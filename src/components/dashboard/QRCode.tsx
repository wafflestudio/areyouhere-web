import QRCodeStyling from "qr-code-styling";
import { useEffect, useRef } from "react";
import styled, { useTheme } from "styled-components";

function QRCodeGenerator({ passcode }: { passcode: string | undefined }) {
  const qrCodeRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const baseUrl = "https://areyouhere.today";
  const qrUrl = `${baseUrl}?code=${passcode}`;

  useEffect(() => {
    if (qrCodeRef.current) {
      // Clear previous QR code
      qrCodeRef.current.innerHTML = "";

      const qrCode = new QRCodeStyling({
        width: 256,
        height: 256,
        data: qrUrl,
        dotsOptions: {
          color: theme.colors.primary[500],
          type: "dots",
        },

        cornersDotOptions: {
          type: "extra-rounded",
        },
        cornersSquareOptions: {
          type: "extra-rounded",
        },
        backgroundOptions: {
          color: theme.colors.white,
        },
      });
      qrCode.append(qrCodeRef.current);
    }
  }, [qrUrl, theme]);

  return <Container ref={qrCodeRef} />;
}

const Container = styled.div`
  > canvas {
    width: 100%;
    height: 100%;
  }
`;

export default QRCodeGenerator;
