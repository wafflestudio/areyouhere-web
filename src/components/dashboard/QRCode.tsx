import { QRCodeCanvas } from "qrcode.react";
import styled from "styled-components";

function QRCodeGenerator({ passcode }: { passcode: string | undefined }) {
  const baseUrl = "https://areyouhere.today";
  const qrUrl = `${baseUrl}?code=${passcode}`;

  return (
    <Container>
      <QRCodeCanvas value={qrUrl} size={256} />
      <p>Scan this QR code for attendance</p>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  p {
    font-size: 1.7rem;
    color: ${({ theme }) => theme.colors.darkGrey};
    font-weight: 500;
  }
`;

export default QRCodeGenerator;
