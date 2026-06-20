import { useEffect, useState } from "react";
import { getHelp } from "../services/api";
import "./Help.css";

function Help() {
  const [helpData, setHelpData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHelp = async () => {
      try {
        const response = await getHelp();
        setHelpData(response.data);
      } catch (err) {
        console.error("Failed to load help content:", err);
        setError(
          "Unable to load help information right now. Please try again later."
        );
      }
    };

    fetchHelp();
  }, []);

  const faqItems = helpData?.faq || [];

  return (
    <main className="help-page">
      <section className="help-card">
        <h1>{helpData?.projectName || "Help & Support"}</h1>

        {error ? (
          <p className="help-error">{error}</p>
        ) : (
          <>
            <p className="help-intro">
              {helpData?.description ||
                "Campus Connect helps students discover clubs, events, recruitments, applications, and announcements in one place."}
            </p>

            <div className="help-summary">
              <div>
                <strong>College:</strong>
                <span>{helpData?.college || "Gayatri Vidya Parishad College of Engineering"}</span>
              </div>
              <div>
                <strong>Support Email:</strong>
                {helpData?.supportEmail ? (
                  <a href={`mailto:${helpData.supportEmail}`}>
                    {helpData.supportEmail}
                  </a>
                ) : (
                  <span>support@campusconnect.example</span>
                )}
              </div>
            </div>

            <div className="faq-section">
              <h2>Frequently Asked Questions</h2>
              {faqItems.length > 0 ? (
                faqItems.map((item, index) => (
                  <article className="faq-item" key={index}>
                    <h3>{item.question}</h3>
                    <p>{item.answer}</p>
                  </article>
                ))
              ) : (
                <p>
                  No FAQ content is available right now. Please contact support if you need assistance.
                </p>
              )}
            </div>
          </>
        )}
      </section>
    </main>
  );
}

export default Help;
