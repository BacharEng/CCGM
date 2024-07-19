import React, { useState, ChangeEvent, FormEvent } from "react";
import { Button, Form, Container } from "react-bootstrap";
import useUserStore from "../store/useUserStore";
import { toast } from "react-toastify";

interface NewUserFormProps {
  onRegistrationSuccess: (isSuccess: boolean) => void;
}
const NewUserForm = ({ onRegistrationSuccess }: NewUserFormProps) => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [birthDate, setBirthDate] = useState<string>("");

  const createUser = useUserStore((state) => state.createUser);

  // Adjusted to correctly type the event parameter
  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
    };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createUser(
        firstName,
        lastName,
        phoneNumber,
        email,
        password,
        birthDate
      );
      toast.success("Registration successful!");
      onRegistrationSuccess(true);
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error("Registration failed. Please try again.");
      onRegistrationSuccess(false);
    }
  };

  return (
    <Container className="mt-5">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter first name"
            value={firstName}
            onChange={handleInputChange(setFirstName)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter last name"
            value={lastName}
            onChange={handleInputChange(setLastName)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="tel"
            placeholder="Enter phone number"
            value={phoneNumber}
            onChange={handleInputChange(setPhoneNumber)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={handleInputChange(setEmail)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={handleInputChange(setPassword)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Birthdate</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter birthdate dd/mm/yyyy"
            value={birthDate}
            onChange={handleInputChange(setBirthDate)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default NewUserForm;
