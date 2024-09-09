const Footer = () => {
    const year = new Date().getFullYear();
    return (
      <div className="footer">
        Created By
        <i className="fa-solid fa-heart"></i>
        <a href="" target="_blank" title="Chetan Nada's Linkedin Profile">
          Nishant Kumar Yadav
        </a>
        <i className="fa-solid fa-copyright"></i>
        {year}
        <a href="" target="_blank" title="Food Fire Github Repository">
          <strong>
            Food<span> Villa</span>
          </strong>
        </a>
      </div>
    );
  };
  export default Footer;