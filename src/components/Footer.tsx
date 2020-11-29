
const Footer = () => {
  return(
    <footer id="contact" className="contact-section">
      <div className="contact-section-header">
        <h2>Let's work together...</h2>
      </div>

      <div className="contact-links">
        <a
          href="https://www.linkedin.com/in/leonardo-muros/"
          target="_blank"
          className="btn contact-details"
          ><i className="fab fa-facebook-square"></i> Linkedin</a
        >
        <a
          id="profile-link"
          href="https://github.com/LeonardoPerson?tab=repositories"
          target="_blank"
          className="btn contact-details"
          ><i className="fab fa-github"></i> GitHub</a
        >
      </div>
    </footer>
  )
}
export default Footer