import React from "react";

class AuditLogger extends React.Component {
  constructor(props) {
    super(props);
    this.state = { logs: [], toast: "" };
    this.timerId = null;
    this.handleKey = this.handleKey.bind(this);
    this.clearLogs = this.clearLogs.bind(this);
  }

  componentDidMount() {
    const saved = localStorage.getItem("auditLogs");
    if (saved) {
      this.setState({ logs: JSON.parse(saved) });
    }
    window.addEventListener("keydown", this.handleKey);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.event && this.props.event !== prevProps.event) {
      const entry = {
        id: this.props.event.id,
        message: this.props.event.message,
        time: new Date().toLocaleTimeString(),
      };
      this.setState((state) => ({
        logs: [entry, ...state.logs].slice(0, 20),
        toast: entry.message,
      }));
      clearTimeout(this.timerId);
      this.timerId = setTimeout(() => {
        this.setState({ toast: "" });
      }, 3000);
    }
    if (prevState.logs !== this.state.logs) {
      localStorage.setItem("auditLogs", JSON.stringify(this.state.logs));
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timerId);
    window.removeEventListener("keydown", this.handleKey);
  }

  handleKey(e) {
    if (e.key === "Escape") {
      this.setState({ toast: "" });
    }
  }

  clearLogs() {
    this.setState({ logs: [] });
  }

  render() {
    const { logs, toast } = this.state;
    return (
      <section style={{ border: "1px solid gray", borderRadius: "8px", padding: "15px", margin: "10px" }}>
        <h2>Audit Log</h2>
        <button onClick={this.clearLogs}>Clear Logs</button>
        {logs.length === 0 ? (
          <p>No activity yet.</p>
        ) : (
          <ul>
            {logs.map((log) => (
              <li key={log.id}>
                {log.time} - {log.message}
              </li>
            ))}
          </ul>
        )}
        {toast && (
          <div style={{ position: "fixed", bottom: "20px", right: "20px", background: "#333", color: "white", padding: "10px 15px", borderRadius: "6px" }}>
            {toast}
          </div>
        )}
      </section>
    );
  }
}

export default AuditLogger;
