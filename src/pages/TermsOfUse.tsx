import styled from "styled-components";

function TermsOfUse() {
  return (
    <Container>
      <section>
        <h1>Terms of Use</h1>
        <p>
          Welcome to areyouhere! These terms and conditions outline the rules
          and regulations for the use of areyouhere's Website, located at
          areyouhere.today.
        </p>
        <p>
          By accessing this website, we assume you accept these terms and
          conditions. Do not continue to use areyouhere if you do not agree to
          take all of the terms and conditions stated on this page.
        </p>
      </section>
      <section>
        <h2>License</h2>
        <p>
          Unless otherwise stated, areyouhere and/or its licensors own the
          intellectual property rights for all material on areyouhere. All
          intellectual property rights are reserved. You may access this from
          areyouhere for your own personal use subjected to restrictions set in
          these terms and conditions.
        </p>
        <p>You must not:</p>
        <ul>
          <li>Republish material from areyouhere</li>
          <li>Sell, rent, or sub-license material from areyouhere</li>
          <li>Reproduce, duplicate, or copy material from areyouhere</li>
          <li>Redistribute content from areyouhere</li>
        </ul>
        <p>This Agreement shall begin on the date hereof.</p>
      </section>
      <section>
        <h2>Content Liability</h2>
        <p>
          We shall not be held responsible for any content that appears on your
          Website. You agree to protect and defend us against all claims that
          are rising on your Website. No link(s) should appear on any Website
          that may be interpreted as libelous, obscene, or criminal, or which
          infringes, otherwise violates, or advocates the infringement or other
          violation of, any third-party rights.
        </p>
      </section>
      <section>
        <h2>Your Privacy</h2>
        <p>Please read our Privacy Policy.</p>
      </section>
    </Container>
  );
}

const Container = styled.div`
  padding: 1rem;
  font-size: 1.5rem;

  section {
    margin-bottom: 3rem;

    h1 {
      font-size: 3rem;
      margin-bottom: 2rem;
    }

    h2 {
      font-size: 2rem;
      margin-bottom: 1rem;
    }

    p {
      margin-bottom: 1rem;
      margin-left: 1rem;
    }

    ul {
      list-style-type: disc;
      margin-bottom: 1rem;
    }

    li {
      margin-left: 2rem;
    }
  }
`;

export default TermsOfUse;
