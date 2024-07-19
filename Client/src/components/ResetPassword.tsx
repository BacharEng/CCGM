import { useState } from "react";
import { Button, Form, Container, Alert } from "react-bootstrap";
import { toast } from "react-toastify";
import useUserStore from "../store/useUserStore";

interface ResetPasswordProps {
  onPasswordResetSuccess: (isSuccess: boolean) => void;
}

const ResetPassword = ({ onPasswordResetSuccess }: ResetPasswordProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState<string | null>(null);
  const [inputCode, setInputCode] = useState(""); // State to hold the input code from the user
  const [isVerified, setIsVerified] = useState(false);

  const { requestResetPassword, resetPassword, verifyResetCode } = useUserStore(
    (state) => ({
      requestResetPassword: state.requestResetPassword,
      resetPassword: state.resetPassword,
      verifyResetCode: state.verifyResetCode,
    })
  );

  const handleVerificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const isCodeVerified = await verifyResetCode(email, inputCode);
      if (isCodeVerified) {
        setIsVerified(true);
        toast.success("Code verified successfully");
      } else {
        toast.error("Invalid code");
      }
    } catch (error) {
      toast.error("Failed to verify code");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please fill in all fields");
      return;
    }

    if (isVerified) {
      try {
        await resetPassword(email, password);
        toast.success("Password has been reset successfully");
        onPasswordResetSuccess(true);
      } catch (error) {
        toast.error("Failed to reset password");
        onPasswordResetSuccess(false);
      }
    } else {
      if (!code) {
        try {
          const response = await requestResetPassword(email);
          setCode(response.data);
          if (response.data) {
            console.log("Verification code: " + response.data);
            toast.success("Password reset email sent successfully");
          } else {
            toast.error("Failed to send password reset email");
          }
        } catch (error) {
          setCode(null);
          toast.error("Failed to send password reset email");
        }
      }
    }
  };

  return (
    <Container>
      <Form
        onSubmit={code && !isVerified ? handleVerificationSubmit : handleSubmit}
      >
        <Form.Group>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isVerified || code !== null}
          />
          <Button variant="primary" type="submit" className="mt-3">
            Check Email
          </Button>
        </Form.Group>
        {code && !isVerified && (
          <>
            <Alert variant="info">Verification code: {code}</Alert>
            <Form.Group>
              <Form.Label>Verification Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter verification code"
                onChange={(e) => setInputCode(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              Send Verification Code
            </Button>
          </>
        )}
        {isVerified && (
          <>
            <Form.Group>
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter new password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              Reset Password
            </Button>
          </>
        )}
      </Form>
    </Container>
  );
};

export default ResetPassword;
