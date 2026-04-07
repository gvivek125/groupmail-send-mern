import React, { useState } from "react";
import axios from "axios";

function App() {
  const [emails, setEmails] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const sendEmails = async () => {
    const emailList = emails.split(",").map(email => email.trim());

    try {
      await axios.post("http://localhost:5000/send-mails", {
        emails: emailList,
        subject,
        message,
      });
      alert("Emails sent and saved successfully ✅");
      setEmails("");
      setSubject("");
      setMessage("");
    } catch (err) {
      console.error(err);
      alert("Error sending emails ❌");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>📧 Bulk Mail Sender</h1>

        <label style={styles.label}>Recipients (comma separated)</label>
        <textarea
          style={styles.textarea}
          placeholder="example1@gmail.com, example2@gmail.com"
          value={emails}
          onChange={(e) => setEmails(e.target.value)}
        />

        <label style={styles.label}>Subject</label>
        <input
          type="text"
          style={styles.input}
          placeholder="Enter email subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        <label style={styles.label}>Message</label>
        <textarea
          style={styles.textarea}
          placeholder="Enter your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button style={styles.button} onClick={sendEmails}>
          Send Emails
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f0f2f5",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  card: {
    backgroundColor: "#fff",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    width: "400px",
  },
  title: {
    marginBottom: "30px",
    color: "#333",
    textAlign: "center",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    color: "#555",
    fontWeight: "600",
    fontSize: "14px",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "20px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  textarea: {
    width: "100%",
    padding: "12px",
    marginBottom: "20px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
    minHeight: "80px",
    resize: "vertical",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
    transition: "0.3s",
  },
};

export default App;