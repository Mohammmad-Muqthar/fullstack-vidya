import { useState } from "react";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";

import "./FAQ.css";


/* =========================================================
   FAQ DATA
========================================================= */

const faqs = [
  {
    question: "What programmes does Vidya Academy offer?",
    answer:
      "For details about the academic programmes currently offered at Vidya Academy, please contact our admissions team. They can help you understand the learning pathways available for your child.",
  },

  {
    question: "What grades and age groups can apply?",
    answer:
      "Admission eligibility may vary by programme and grade. Please share your child's age and the grade you are interested in, and our admissions team can guide you through the available options.",
  },

  {
    question: "How can I apply for admission?",
    answer:
      "You can begin by submitting the enquiry form on this page. Our admissions team can then share the current application process, required documents, and next steps.",
  },

  {
    question: "Can parents visit the campus?",
    answer:
      "You can contact our admissions team to enquire about arranging a campus visit. They can share available dates and explain what to expect during your visit.",
  },

  {
    question: "What is the approach to teaching and learning?",
    answer:
      "At Vidya Academy, we aim to encourage curiosity, participation, and meaningful learning experiences that help students build knowledge, confidence, and independent thinking.",
  },

  {
    question: "How does the school support different learning needs?",
    answer:
      "Every child has individual strengths and learning needs. We encourage parents to discuss their child's requirements with the admissions team so the available support can be explained.",
  },

  {
    question: "What activities are available beyond academics?",
    answer:
      "School life can include opportunities for sports, creativity, collaboration, and other activities beyond classroom learning. Contact the school for details of the activities currently available.",
  },

  {
    question: "What facilities are available on campus?",
    answer:
      "Our admissions team can provide information about Vidya Academy's current classrooms, learning spaces, activity areas, and other campus facilities.",
  },

  {
    question: "Does the school provide transportation?",
    answer:
      "Please contact the admissions team for current information about school transport, available routes, and pickup or drop-off arrangements.",
  },

  {
    question: "What are the school timings?",
    answer:
      "School timings may differ by grade or programme. Please contact our team for the current schedule and academic calendar.",
  },

  {
    question: "What are the admission fees?",
    answer:
      "Our admissions team can share the current fee structure for the programme or grade you are interested in, along with any applicable payment details.",
  },

  {
    question: "Which documents are required for admission?",
    answer:
      "Document requirements may vary by grade and admission stage. Our team can provide the current checklist after learning more about your application.",
  },

  {
    question: "How can I get in touch with the admissions team?",
    answer:
      "Complete the enquiry form on this page with your contact details and the grade you are interested in. Once the form is connected to the school's enquiry system, the admissions team can use those details to contact you.",
  },
];


/* =========================================================
   COUNTRY CODES
========================================================= */

const COUNTRY_CODES = [
  { code: "+91", label: "India" },
  { code: "+1", label: "USA / Canada" },
  { code: "+44", label: "United Kingdom" },
  { code: "+971", label: "UAE" },
  { code: "+61", label: "Australia" },
  { code: "+65", label: "Singapore" },
  { code: "+974", label: "Qatar" },
  { code: "+966", label: "Saudi Arabia" },
];


/* =========================================================
   GRADES
========================================================= */

const GRADES = [
  "Pre-K",
  "Nursery",
  "LKG",
  "UKG",

  ...Array.from(
    { length: 12 },
    (_, index) => `Grade ${index + 1}`
  ),
];


/* =========================================================
   ARROW ICON
========================================================= */

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 12H19M13 6L19 12L13 18"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}


/* =========================================================
   PLUS ICON
========================================================= */

function PlusIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 5V19M5 12H19"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}


/* =========================================================
   ENQUIRY FORM
========================================================= */

function FAQAdmissionForm() {
  const [formData, setFormData] = useState({
    studentName: "",
    parentName: "",
    countryCode: "+91",
    phone: "",
    email: "",
    grade: "",
  });

  const [message, setMessage] = useState("");


  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,

      [name]:
        name === "phone"
          ? value
              .replace(/\D/g, "")
              .slice(0, 15)
          : value,
    }));

    setMessage("");
  }


  function handleSubmit(event) {
    event.preventDefault();

    if (formData.phone.length < 7) {
      setMessage(
        "Please enter a valid mobile number."
      );

      return;
    }

    // Connect admissions API here.

    setMessage(
      "Form preview completed. No enquiry has been sent yet."
    );
  }


  return (
    <aside
      className="vidya-faq-enquiry"
      aria-labelledby="vidya-faq-form-heading"
    >
      <div className="vidya-faq-enquiry-intro">

        <span className="vidya-faq-enquiry-label">
          Admissions enquiry
        </span>

        <h3 id="vidya-faq-form-heading">
          Your child’s next chapter starts with a conversation.
        </h3>

        <p>
          Tell us a little about your child and the grade
          you’re interested in.
        </p>

      </div>


      <form
        className="vidya-faq-form"
        onSubmit={handleSubmit}
      >
        <div className="vidya-faq-form-grid">

          <div className="vidya-faq-field">
            <label htmlFor="faq-student-name">
              Student name
              <span>*</span>
            </label>

            <input
              id="faq-student-name"
              name="studentName"
              type="text"
              placeholder="Enter student name"
              value={formData.studentName}
              onChange={handleChange}
              required
            />
          </div>


          <div className="vidya-faq-field">
            <label htmlFor="faq-parent-name">
              Parent / guardian
              <span>*</span>
            </label>

            <input
              id="faq-parent-name"
              name="parentName"
              type="text"
              placeholder="Enter your name"
              value={formData.parentName}
              onChange={handleChange}
              autoComplete="name"
              required
            />
          </div>


          <div className="vidya-faq-field vidya-faq-field-full">
            <label htmlFor="faq-phone">
              Mobile number
              <span>*</span>
            </label>

            <div className="vidya-faq-phone-group">

              <select
                name="countryCode"
                value={formData.countryCode}
                onChange={handleChange}
                aria-label="Country calling code"
              >
                {COUNTRY_CODES.map(
                  ({ code, label }) => (
                    <option
                      key={`${code}-${label}`}
                      value={code}
                    >
                      {code} — {label}
                    </option>
                  )
                )}
              </select>


              <input
                id="faq-phone"
                name="phone"
                type="tel"
                inputMode="numeric"
                placeholder="Mobile number"
                value={formData.phone}
                onChange={handleChange}
                autoComplete="tel-national"
                minLength={7}
                maxLength={15}
                required
              />

            </div>
          </div>


          <div className="vidya-faq-field">
            <label htmlFor="faq-email">
              Email address
              <span>*</span>
            </label>

            <input
              id="faq-email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />
          </div>


          <div className="vidya-faq-field">
            <label htmlFor="faq-grade">
              Admission for grade
              <span>*</span>
            </label>

            <select
              id="faq-grade"
              name="grade"
              value={formData.grade}
              onChange={handleChange}
              required
            >
              <option
                value=""
                disabled
              >
                Select grade
              </option>

              {GRADES.map((grade) => (
                <option
                  key={grade}
                  value={grade}
                >
                  {grade}
                </option>
              ))}
            </select>
          </div>

        </div>


        <button
          className="vidya-faq-submit"
          type="submit"
        >
          <span>
            Submit enquiry
          </span>

          <ArrowIcon />
        </button>


        <p className="vidya-faq-form-note">
          Form preview only. Connect your admissions system
          to receive enquiries.
        </p>


        {message && (
          <p
            className="vidya-faq-form-status"
            role="status"
          >
            {message}
          </p>
        )}

      </form>
    </aside>
  );
}


/* =========================================================
   MAIN FAQ
========================================================= */

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const reducedMotion =
    useReducedMotion();


  function toggleQuestion(index) {
    setOpenIndex((current) =>
      current === index
        ? null
        : index
    );
  }


  return (
    <section
      className="vidya-faq"
      id="faq"
      aria-labelledby="vidya-faq-heading"
    >

      <div className="vidya-faq-container">

        {/* ===================================================
            ONLY HEADING
            RIGHT-SIDE TEXT REMOVED
        ==================================================== */}

        <div className="vidya-faq-intro">
          <h2 id="vidya-faq-heading">
            Frequently asked
            <br />
            questions
          </h2>
        </div>


        <div className="vidya-faq-layout">

          <div className="vidya-faq-questions">

            <div className="vidya-faq-list">

              {faqs.map((faq, index) => {
                const isOpen =
                  openIndex === index;

                return (
                  <article
                    className={[
                      "vidya-faq-item",
                      isOpen
                        ? "is-open"
                        : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    key={faq.question}
                  >

                    <h3 className="vidya-faq-question-heading">

                      <button
                        className="vidya-faq-question"
                        type="button"
                        id={`faq-question-${index}`}
                        aria-expanded={isOpen}
                        aria-controls={`faq-answer-${index}`}
                        onClick={() =>
                          toggleQuestion(index)
                        }
                      >

                        <span className="vidya-faq-question-number">
                          {String(index + 1).padStart(
                            2,
                            "0"
                          )}
                        </span>


                        <span className="vidya-faq-question-text">
                          {faq.question}
                        </span>


                        <span
                          className="vidya-faq-question-icon"
                          aria-hidden="true"
                        >
                          <PlusIcon />
                        </span>

                      </button>

                    </h3>


                    <AnimatePresence initial={false}>

                      {isOpen && (
                        <motion.div
                          className="vidya-faq-answer"
                          id={`faq-answer-${index}`}
                          role="region"
                          aria-labelledby={`faq-question-${index}`}
                          initial={
                            reducedMotion
                              ? false
                              : {
                                  height: 0,
                                  opacity: 0,
                                }
                          }
                          animate={{
                            height: "auto",
                            opacity: 1,
                          }}
                          exit={{
                            height: 0,
                            opacity: 0,
                          }}
                          transition={{
                            duration:
                              reducedMotion
                                ? 0
                                : 0.4,

                            ease: [
                              0.22,
                              1,
                              0.36,
                              1,
                            ],
                          }}
                        >
                          <div className="vidya-faq-answer-inner">
                            <p>
                              {faq.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}

                    </AnimatePresence>

                  </article>
                );
              })}

            </div>

          </div>


          <div className="vidya-faq-form-column">
            <FAQAdmissionForm />
          </div>

        </div>

      </div>

    </section>
  );
}