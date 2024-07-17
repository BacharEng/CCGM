import { useState } from "react";
import { Button, Form, Container } from "react-bootstrap";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please fill in all fields");
      return;
    }
    try {
      await resetPassword(email);
      toast.success("Password reset email sent successfully");
    } catch (error) {
      toast.error("Failed to send password reset email");
    }
  };
  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default ResetPassword;
