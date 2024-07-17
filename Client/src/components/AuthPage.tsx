import React, { useState } from "react";
import { Button, Form, Container } from "react-bootstrap";
import { toast } from "react-toastify";
import useUserStore from "../store/useUserStore";

const AuthPage: React.FC = () => {
  const login = useUserStore((state) => state.login);
  const token = useUserStore((state) => state.token);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localToken, setLocalToken] = useState(token);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      await login(email, password);
      // Redirect or show success message
      // console.log(localToken);
      toast.success("Logged in successfully");
    } catch (error) {
      // Show error message
      toast.error("Failed to log in");
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
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default AuthPage;
