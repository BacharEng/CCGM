import React, { useState } from "react";
import { Button, Form, Container } from "react-bootstrap";
import { toast } from "react-toastify";
import useUserStore from "../store/useUserStore";
import { sanitizeInput } from "../utils/sanitizeInput"; 

const AuthPage = () => {
  const login = useUserStore((state) => state.login);
  const token = useUserStore((state) => state.token);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [localToken, setLocalToken] = useState(token);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
  
    try {
      await login(email, password);
      const newToken = useUserStore.getState().token;
      setLocalToken(newToken);
      if (import.meta.env.DEV) {
        console.log("Token after login:", newToken);
      }
      toast.success("Logged in successfully");
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error("Login error:", error);
      }
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
            onChange={(e) => setEmail(sanitizeInput(e.target.value))}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(sanitizeInput(e.target.value))} 
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default AuthPage;