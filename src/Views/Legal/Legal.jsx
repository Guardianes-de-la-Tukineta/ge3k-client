import React from "react";
import { Container } from "react-bootstrap";
import "./Legal.css"; // Importa tu archivo de estilos personalizados
import { Link } from "react-router-dom";

function Legal() {
  return (
    <Container fluid className="legal-container">
      <Link to="/">
        <p>BACK TO HOME</p>
      </Link>
      <h1>Legal Information</h1>
      <h2>Terms and Conditions</h2>
      <section>
        <h2>1. Use of the Website</h2>
        <p>
          <strong>1.1. Access and Registration:</strong> To use certain features
          of our Website, you may need to register and create an account. You
          are responsible for providing accurate and up-to-date information
          during the registration process and for maintaining the
          confidentiality of your password.
        </p>
        <p>
          <strong>1.2. Proper Use:</strong> You agree to use our Website
          appropriately and in accordance with all applicable laws and
          regulations. You must not use our Website for unlawful or unauthorized
          purposes please.
        </p>
      </section>
      <section>
        <h2>2. Intellectual Property</h2>
        <p>
          <strong>2.1. Copyright:</strong> All content and materials available
          on our Website, including but not limited to text, graphics, logos,
          images, videos, and software, are protected by copyright and other
          intellectual property laws.
        </p>
        <p>
          <strong>2.2. Limited License:</strong> We grant you a limited,
          non-exclusive, non-transferable license to access and use our Website
          for personal, non-commercial purposes. You are not permitted to
          download, copy, or modify our content without our prior written
          consent.
        </p>
      </section>
      <section>
        <h2>3. Privacy Policy</h2>
        <p>
          Your use of our Website is also subject to our Privacy Policy, which
          describes how we collect, use, and share your personal data. By using
          our Website, you agree to our privacy practices as described in our
          Privacy Policy.
        </p>
      </section>
      <section>
        <h2>4. Changes to the Terms</h2>
        <p>
          We reserve the right to modify these Terms at any time. Changes will
          become effective by posting the revised version on our Website. We
          recommend reviewing these Terms periodically to stay informed of
          updates.
        </p>
      </section>
      <section>
        <h2>5. Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by applicable law, we disclaim any
          liability for direct, indirect, incidental, consequential, or special
          damages that may arise from your use of our Website.
        </p>
      </section>
      <section>
        <h2>6. Contact</h2>
        <p>
          If you have any questions or comments about these Terms, please
          contact us at{" "}
          <a href="mailto:contact.tukineta@gmail.com">
            contact.tukineta@gmail.com
          </a>
        </p>
      </section>
      <footer>
        <p>
          These Terms and Conditions of Use are effective as of [effective
          date].
        </p>
      </footer>
      <Link to="/">
        <p>BACK TO HOME</p>
      </Link>
    </Container>
  );
}

export default Legal;
